// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserData {

    // Define struct to store user details
    struct User {
        string username;
        bytes32 passwordHash;  // Store hashed password instead of plain text
        uint256 cardId;
    }

    mapping(address => User) public users;  // Store user data associated with their address

    // Event to notify successful user sign-up
    event UserSignedUp(address userAddress);

    // Function to sign up a new user
    function signUp(string memory _username, string memory _password, uint256 _cardId) public {
        // Ensure the user is not already registered
        require(bytes(users[msg.sender].username).length == 0, "User already signed up");

        // Hash the password before storing it
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));

        // Store the user details
        users[msg.sender] = User(_username, passwordHash, _cardId);

        // Emit an event for successful sign-up
        emit UserSignedUp(msg.sender);
    }

    // Function for user authentication (login)
    function authenticate(string memory _username, string memory _password, uint256 _cardId) public view returns (bool) {
        // Retrieve the stored user data
        User memory user = users[msg.sender];

        // Check if the provided details match the stored user details
        if (keccak256(abi.encodePacked(user.username)) == keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(user.passwordHash)) == keccak256(abi.encodePacked(_password)) &&
            user.cardId == _cardId) {
            return true;
        } else {
            return false;
        }
    }
}
