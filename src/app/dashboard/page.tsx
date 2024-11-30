"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  ToggleButton,
  IconButton,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Modal,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"; 
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from 'next/navigation'; 

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [autoSync, setAutoSync] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "assistant"; text: string }[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const router = useRouter();
  

  // State for receipts
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const assistantResponse = `I can help you with that, but it is important to note that I am still under development and may not be able to solve all math problems perfectly. I can also help you understand the concepts behind the problems and show you how to solve them yourself.

If you have any specific math homework problems that you would like help with, please feel free to ask me. I will do my best to help you solve them.

Here are some tips for asking me math homework questions:

* Be as specific as possible in your question. The more information I have, the better I will be able to help you.

* If possible, provide me with the steps that you have already tried to solve the problem. This will help me to identify where you are getting stuck.

* If you are having trouble understanding a particular concept, please ask me to explain it in a different way.

I am here to help you learn and succeed in math.

Please do not hesitate to ask me for help.`;

const handleAutoSyncToggle = () => {
  setAutoSync((prev) => !prev);
  router.push("/home") // Redirect to /home
};

const handleUpdate = () => {
  // Handle the update logic here, such as sending the updated autoSync value to your server
  console.log("Updated Auto Sync:", autoSync);
};

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: assistantResponse },
      ]);
    }, 2000);
  };

  // Fetch receipts when the "receipt" tab is active
  useEffect(() => {
    if (activeTab === "receipt") {
      setLoading(true);
      axios
        .get("/api/getreceipt")
        .then((response) => {
          setReceipts(response.data); // Assume the response contains the receipts array
        })
        .catch((error) => {
          console.error("Error fetching receipts:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeTab]);

   // Filter receipts based on search query
   const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

   // Handle "More Details" button click
   const handleMoreDetails = (receipt: any) => {
    setSelectedReceipt(receipt);
  };

  const handleCloseModal = () => {
    setSelectedReceipt(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid #333",
        }}
      >
        {/* Menu Icon */}
        <IconButton sx={{ color: "#fff" }}>
          <MenuIcon />
        </IconButton>

        {/* Auto-Sync Toggle Button */}
        <ToggleButton
          value="auto-sync"
          selected={autoSync}
          onChange={handleAutoSyncToggle}
          sx={{
            backgroundColor: autoSync ? "blue" : "#333",
            color: "#fff",
            "&:hover": { backgroundColor: autoSync ? "darkblue" : "#444" },
          }}
        >
          Auto-Sync
        </ToggleButton>

        {/* Refresh Button */}
        <IconButton sx={{ color: "#fff" }}>
          <RefreshIcon />
        </IconButton>
      </Box>
<Box
  sx={{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #333",
  }}
>
  {["chat", "receipt", "profile"].map((tab) => (
    <motion.div
      key={tab}
      onClick={() => handleTabChange(tab)}
      style={{
        cursor: "pointer",
        textAlign: "center",
        flex: 1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          color: activeTab === tab ? "#1DB954" : "#fff",
          position: "relative",
        }}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Typography>
      {activeTab === tab && (
        <motion.div
          layoutId="underline"
          style={{
            height: "2px",
            backgroundColor: "#1DB954",
            width: "100%",
            marginTop: "5px",
          }}
        />
      )}
    </motion.div>
  ))}
</Box>


      {/* Active Tab Content */}
      <Box sx={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {activeTab === "chat" && (
          <Box>
            {/* Chat Header */}
            <Typography variant="h4" sx={{ mb: 1 }}>
              Search
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#aaa" }}>
              You can either search a PDF or receipt, or if you want, we can sync them all up automatically for you.
            </Typography>
            {/* Sync Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1DB954",
                color: "#fff",
                "&:hover": { backgroundColor: "#17a345" },
                mb: 2,
              }}
              onClick={() => alert("Syncing receipts manually")}
            >
              Sync Receipts Manually
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "#1DB954",
                cursor: "pointer",
                textDecoration: "underline",
                mb: 3,
              }}
              onClick={() => (window.location.href = "/upload")}
            >
              /upload
            </Typography>

            {/* Chat Interface */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                minHeight: "500px",
                maxHeight: "501px",
                background: "#111",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: msg.sender === "user" ? "#1DB954" : "#333",
                      color: "#fff",
                      padding: "10px 15px",
                      borderRadius: "15px",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </Box>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      color: "#fff",
                      padding: "10px 15px",
                      borderRadius: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                    <Typography variant="body2">Assistant is typing...</Typography>
                  </Box>
                </motion.div>
              )}
            </Box>

            {/* Send Message */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  backgroundColor: "#333",
                  borderRadius: "15px",
                  "& .MuiInputBase-root": {
                    color: "#fff",
                    borderRadius: "15px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1DB954",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#17a345" },
                }}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}
        {activeTab === "receipt" && (
    <Box sx={{ padding: 2 }}>
    {/* Search Bar */}
    <TextField
  label="Search"
  variant="outlined"
  fullWidth
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    mb: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Light background for visibility
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // Border color when not focused
      },
      "&:hover fieldset": {
        borderColor: "lightgray", // Border color when hovered
      },
      "&.Mui-focused fieldset": {
        borderColor: "cyan", // Border color when focused
      },
    },
    "& .MuiInputBase-input": {
      color: "white", // Text color inside the field
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label color
    },
  }}
/>


    {/* Receipt Table */}
    {loading ? (
      <CircularProgress />
    ) : (
      <TableContainer component={Paper} sx={{ maxHeight: "690px", overflowY: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>File Name</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Tags</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Uploaded At</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Auto Sync</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt._id}>
                <TableCell sx={{ color: "black" }}>{receipt.fileName}</TableCell>
                <TableCell sx={{ color: "black" }}>{receipt.tags.join(", ")}</TableCell>
                <TableCell sx={{ color: "black" }}>
                  {new Date(receipt.uploadedAt).toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  {receipt.autoSync ? "Enabled" : "Disabled"}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#1DB954" }}
                    onClick={() => handleMoreDetails(receipt)}
                  >
                    &gt; More Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

    {/* Modal for More Details */}
    <Modal open={Boolean(selectedReceipt)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            width: "60%",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "black" }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
            Receipt Details
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'black' }}>
            <strong>File Name:</strong> {selectedReceipt?.fileName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'black' }}>
            <strong>Tags:</strong> {selectedReceipt?.tags.join(", ")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'black' }}>
            <strong>Uploaded At:</strong> {new Date(selectedReceipt?.uploadedAt).toLocaleString()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'black' }}>
            <strong>Auto Sync:</strong>
            <Switch
              checked={autoSync}
              onChange={handleAutoSyncToggle}
              color="primary"
            />
            {autoSync ? "Enabled" : "Disabled"}
          </Typography>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
  </Box>
)}
{activeTab === "profile" && (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#000",
      padding: { xs: "20px", sm: "40px", md: "60px" }, // Added padding for larger screens
    }}
  >
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: 5,
        borderRadius: 4,
        maxWidth: "600px", // Increased max width for larger screens
        width: "100%",
        boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {/* Profile Information */}
      <Typography variant="h4" sx={{ color: "#fff", mb: 2, textAlign: "center" }}>
        Profile Information
      </Typography>
      <Typography variant="body1" sx={{ color: "#ccc", mb: 2 }}>
        <strong>Username:</strong> John Doe
      </Typography>
      <Typography variant="body1" sx={{ color: "#ccc", mb: 2 }}>
        <strong>Email:</strong> johndoe@example.com
      </Typography>
      <Typography variant="body1" sx={{ color: "#ccc", mb: 3 }}>
        <strong>Member Since:</strong> January 2022
      </Typography>

      {/* Profile Picture Section */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "#ccc", mb: 1 }}>
          Profile Picture
        </Typography>
        <Box
          sx={{
            display: "inline-block",
            borderRadius: "50%",
            overflow: "hidden",
            width: "150px", // Increased size for desktop
            height: "150px", // Increased size for desktop
            backgroundColor: "#333",
          }}
        >
          <Image
            src="/profile.png"
            alt="Profile"
            width={500} // Specify width in pixels
            height={500} // Specify height in pixels
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      {/* Edit Profile Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#1DB954",
          color: "#fff",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#17a345",
          },
        }}
      >
        Edit Profile
      </Button>

      {/* Additional Buttons */}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#f44336",
          color: "#f44336",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#d32f2f",
            color: "#d32f2f",
          },
        }}
      >
        View Features
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#e91e63",
          color: "#e91e63",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#d81b60",
            color: "#d81b60",
          },
        }}
      >
        Delete Profile
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#ff9800",
          color: "#ff9800",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#fb8c00",
            color: "#fb8c00",
          },
        }}
      >
        Logout
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#9c27b0",
          color: "#9c27b0",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#8e24aa",
            color: "#8e24aa",
          },
        }}
      >
        Hashh Labs
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#3f51b5",
          color: "#3f51b5",
          borderRadius: 20,
          mb: 2,
          padding: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: "#303f9f",
            color: "#303f9f",
          },
        }}
      >
        Bugs & Feedback
      </Button>
    </Box>
  </Box>
)}

      </Box>
    </Box>
  );
};

export default Dashboard;
