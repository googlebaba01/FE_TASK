"use client";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; pinned: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Send a new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user", pinned: false },
    ]);
    setInput("");

    // Simulate a bot response
    setLoading(true);
    const botReply =
      "I can help you with that, but it is important to note that I am still under development and may not be able to solve all math problems perfectly. If you have any specific math homework problems, feel free to ask!";

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot", pinned: false },
      ]);
      setLoading(false);
    }, 1000);
  };

  // Delete a message
  const handleDelete = (index: number) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  // Pin or unpin a message
  const handlePinMessage = (index: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, pinned: !msg.pinned } : msg
      )
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f4f6f9",
        borderRadius: "10px",
      }}
    >
      {/* Chat Window Header */}
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ color: "#333" }}>
          Chat Window
        </Typography>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          height: "400px",
          overflowY: "auto",
          marginBottom: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {messages
          .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
          .map((msg, index) => {
            const swipeHandlers = useSwipeable({
              onSwipedLeft: () => handleDelete(index),
            });

            return (
              <Box
                key={index}
                {...swipeHandlers}
                sx={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  marginBottom: "10px",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  position: "relative",
                }}
              >
                <Paper
                  sx={{
                    padding: "10px",
                    maxWidth: "70%",
                    backgroundColor: msg.sender === "user" ? "#4CAF50" : "#f1f1f1",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    borderRadius: "10px",
                    border: msg.pinned ? "2px solid #FFC107" : "none",
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "5px",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => handlePinMessage(index)}
                      size="small"
                      sx={{ color: "#FFC107" }}
                    >
                      <PushPinIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      size="small"
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        {/* Loading spinner */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {/* Input Field and Send Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Type your question..."
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            marginRight: "10px",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{ height: "100%", backgroundColor: "#4CAF50" }}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
