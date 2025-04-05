require('dotenv').config();
const { ethers } = require('ethers');
const cors = require('cors');  // Correct import of CORS middleware
const express = require('express');
const app = express();

// Environment variables
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Provider and signer setup for Ethereum interaction
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/UserData.sol/UserData.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

// Middleware setup
app.use(express.json());  // To parse JSON request bodies
app.use(cors());  // Apply CORS middleware for cross-origin requests

// POST request to signup a user (stores user data)
app.post('/signup', async (req, res) => {
    try {
        const { username, password, cardId } = req.body;
        console.log({ username, password, cardId })
        // Check if all fields are provided
        if (!username || !password || !cardId) {
            return res.status(400).json({ error: "All fields (username, password, cardId) are required." });
        }

        // Call the signUp function from the smart contract
        const tx = await contractInstance.signUp(username, password, cardId);
        await tx.wait();
        res.json({ success: true, message: "User signed up successfully!" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST request to login a user (validate user data)
app.post('/login', async (req, res) => {
    try {
        const { username, password, cardId } = req.body;

        // Check if all fields are provided
        if (!username || !password || !cardId) {
            return res.status(400).json({ error: "All fields (username, password, cardId) are required." });
        }

        // Call the logIn function from the smart contract
        const isValid = await contractInstance.authenticate(username, password, cardId);

        if (isValid) {
            res.json({ success: true, message: "Login successful!" });
        } else {
            res.status(401).json({ error: "Invalid credentials. Please check your username, password, or card ID." });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`API server is listening on port ${port}`);
});
