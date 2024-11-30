"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Grid,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/navigation";  

interface Receipt {
  _id: string;
  fileName: string;
  uploadedAt: string;
  autoSync: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      default: "#f9f9fb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const Home: React.FC = () => {
  const router = useRouter();  // Initialize the useRouter hook
  const [fileName, setFileName] = useState<string>("");
  const [fileData, setFileData] = useState<string>("");
  const [tags, setTags] = useState<string>(""); // Added state for tags
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const response = await axios.get("/api/getreceipt");
      setReceipts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch receipts.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => setFileData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!fileName || !fileData) {
      setError("Please select a file to upload.");
      return;
    }

    const parsedTags = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);

    setLoading(true);
    try {
      await axios.post("/api/upload", {
        fileName,
        fileData,
        userId: "6432f1e2a97d1b0012a45678",
        autoSync: false,
        tags: parsedTags, // Include parsed tags in the request
      });
      setSuccess(true);
      setFileName("");
      setFileData("");
      setTags(""); // Clear the tags field
      fetchReceipts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload receipt.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoSync = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(`/api/getreceipt/${id}`, { autoSync: !currentStatus });
      fetchReceipts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update auto-sync.");
    }
  };

  const handleDashboardRedirect = () => {
    router.push("/dashboard");  // Navigate to the dashboard
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Add Dashboard Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDashboardRedirect}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            mb: 4,
            alignSelf: "flex-start",
            ":hover": { backgroundColor: "#574fd6" },
          }}
        >
          Go to Dashboard
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
                boxShadow: 3,
                color:'black',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Upload Receipt
              </Typography>
              <TextField
                type="file"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleFileChange}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Tags (comma-separated)"
                variant="outlined"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpload}
                disabled={loading || !fileName}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#574fd6" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
                boxShadow: 3,
                color:'black'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Auto-Sync Control
              </Typography>
              {receipts.length > 0 ? (
                <Switch
                  checked={receipts[0].autoSync}
                  onChange={() => toggleAutoSync(receipts[0]._id, receipts[0].autoSync)}
                  color="primary"
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No receipts available.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ marginTop: "30px", textAlign: "center", color: "black" }}>
          Uploaded Receipts
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "50vh",
            boxShadow: 2,
            borderRadius: "12px",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>File Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Upload Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Auto-Sync</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt._id}>
                  <TableCell>{receipt.fileName}</TableCell>
                  <TableCell>{new Date(receipt.uploadedAt).toLocaleDateString()}</TableCell>

                  <TableCell>
                    <Switch
                      checked={receipt.autoSync}
                      onChange={() => toggleAutoSync(receipt._id, receipt.autoSync)}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Receipt uploaded successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
