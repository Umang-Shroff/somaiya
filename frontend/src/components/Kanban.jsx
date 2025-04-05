import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// Utility function to determine the color based on the due date
const getDueDateColor = (dueDate) => {
  const currentDate = new Date();
  const dateDiff = new Date(dueDate) - currentDate;
  const daysRemaining = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) return "bg-red-500/60"; // Overdue - red
  if (daysRemaining <= 2) return "bg-yellow-500/60"; // Near deadline - yellow
  return "bg-green-500/60"; // On time - green
};

const Kanban = () => {
  // Initial columns with some sample cards
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: "1",
          content: "Design Homepage UI",
          description:
            "Create the initial design for the homepage, ensuring mobile responsiveness and a modern look.",
          assignee: "Alice Smith",
          priority: "High",
          deadline: "2025-04-10",
        },
        {
          id: "2",
          content: "Set Up Database Schema",
          description:
            "Design and implement the initial database schema for the user management system.",
          assignee: "Bob Johnson",
          priority: "Medium",
          deadline: "2025-04-12",
        },
        {
          id: "3",
          content: "Conduct Market Research",
          description:
            "Research competitors and gather customer feedback to better define the product.",
          assignee: "Charlie Davis",
          priority: "Low",
          deadline: "2025-04-15",
        },
        {
          id: "4",
          content: "Develop API Endpoints",
          description:
            "Create the initial set of RESTful API endpoints for user authentication and data retrieval.",
          assignee: "David Lee",
          priority: "High",
          deadline: "2025-04-11",
        },
      ],
    },
    {
      id: "inProgress",
      title: "In Progress",
      cards: [
        {
          id: "5",
          content: "Implement Payment Gateway",
          description:
            "Integrate Stripe API for handling payments and subscriptions.",
          assignee: "Eva Williams",
          priority: "High",
          deadline: "2025-04-18",
        },
        {
          id: "6",
          content: "Write API Documentation",
          description:
            "Document the API endpoints, usage examples, and error handling mechanisms.",
          assignee: "Frank Martinez",
          priority: "Medium",
          deadline: "2025-04-20",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: "7",
          content: "Create User Registration Flow",
          description:
            "Develop the user registration form with validation and email verification.",
          assignee: "Grace Taylor",
          priority: "High",
          deadline: "2025-04-05",
        },
        {
          id: "8",
          content: "Write Unit Tests for Authentication Module",
          description:
            "Write unit tests for the authentication module, covering all edge cases.",
          assignee: "Henry Clark",
          priority: "Medium",
          deadline: "2025-04-03",
        },
        {
          id: "9",
          content: "Setup Continuous Integration",
          description:
            "Configure CircleCI for automated builds and deployments on every push to the repository.",
          assignee: "Ivy Moore",
          priority: "Low",
          deadline: "2025-04-01",
        },
      ],
    },
  ]);

  // Function to handle drag start (set dragging card's id)
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("cardId", cardId); // Store the card ID in the drag event
  };

  // Function to handle card drop (move the card to a new column)
  const handleDrop = (e, targetColumnId) => {
    const cardId = e.dataTransfer.getData("cardId"); // Get the card ID from the drag event
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const targetColumn = columns.find((col) => col.id === targetColumnId);

    // Find the card being dragged
    const cardToMove = sourceColumn.cards.find((card) => card.id === cardId);

    // Remove the card from the source column and add it to the target column
    sourceColumn.cards = sourceColumn.cards.filter(
      (card) => card.id !== cardId
    );
    targetColumn.cards.push(cardToMove);

    // Update the columns state
    setColumns([...columns]);
  };

  // Function to handle drag over event (allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent the default behavior to allow dropping
  };

  // Function to add a new card
  const addCard = (columnId) => {
    const newCardContent = prompt("Enter card content:");
    if (newCardContent) {
      const newCard = {
        id: Date.now().toString(),
        content: newCardContent,
        description: "",
        assignee: "",
        priority: "Medium",
        deadline: "2025-04-01", // Default deadline for new cards
      };

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
        )
      );
    }
  };

  // Function to remove a card
  const removeCard = (cardId, columnId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  return (
    <div className="z-50 bg-transparent text-white p-8 h-[85vh] overflow-y-scroll dark">
      <div className="z-50 flex space-x-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="complex-component z-50 w-72 backdrop-blur-sm border border-gray-400/40 text-white rounded-lg p-4 cursor-pointer"
            onDragOver={handleDragOver} // Enable dropping in this column
            onDrop={(e) => handleDrop(e, column.id)} // Handle drop event
          >
            <h2 className="z-50 text-center text-lg font-bold mb-4">
              {column.title}
            </h2>
            <div className="flex flex-col space-y-4">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className={`z-50 bg-gradient-to-tr from-gray-900/50 to-gray-900 p-4 rounded-3xl shadow-md flex flex-col justify-between cursor-pointer dark:bg-gray-600 relative`} // Add relative positioning here
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("sourceColumnId", column.id); // Store the source column ID
                    handleDragStart(e, card.id); // Start dragging the card
                  }}
                  style={{ minHeight: "120px" }} // Increase the height of each card if needed
                >
                  {/* Deadline on top-left */}
                  <span
                    className={`text-xs px-2 w-20 py-1 mb-2 rounded-full ${getDueDateColor(
                      card.deadline
                    )}`}
                  >
                    {card.deadline}
                  </span>

                  {/* Task content underneath */}
                  <span className="text-md font-semibold mt-1">
                    {card.content}
                  </span>

                  {/* Delete button positioned on top-right */}
                  <button
                    className="z-50 text-red-500 hover:text-red-700 absolute top-2 right-2 cursor-pointer" // Absolute positioning
                    onClick={() => removeCard(card.id, column.id)}
                  >
                    <DeleteOutlinedIcon className="h-6 w-6 opacity-50" /> {/* Icon size */}
                  </button>
                </div>
              ))}

              <button
                className="z-50 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-md mt-4 hover:from-indigo-400 hover:to-purple-500 transition duration-300"
                onClick={() => addCard(column.id)}
              >
                Add Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
