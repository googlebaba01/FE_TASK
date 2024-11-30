"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";

interface Receipt {
  _id: string;
  fileName: string;
  createdAt: string;
  autoSync: boolean;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle message sending
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Display user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);
    setInput(""); // Clear the input field

    // Simulate a bot response
    setLoading(true);
    const botReply =
      "I can help you with that, but it is important to note that I am still under development and may not be able to solve all math problems perfectly. If you have any specific math homework problems, feel free to ask!";
    
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: "20px", backgroundColor: "#f4f6f9" }}>
      {/* Chat Window Header */}
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ color: "#333" }}>Math Homework Helper</Typography>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ height: "400px", overflowY: "auto", marginBottom: "20px", backgroundColor: "#fff", borderRadius: "10px", padding: "10px" }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              marginBottom: "10px",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              sx={{
                padding: "10px",
                maxWidth: "70%",
                backgroundColor: msg.sender === "user" ? "#4CAF50" : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#000",
                borderRadius: "10px",
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
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
          sx={{ marginRight: "10px", backgroundColor: "#fff" }}
        />
        <Button variant="contained" onClick={sendMessage} sx={{ height: "100%" }} disabled={loading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
