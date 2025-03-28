import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton } from "@mui/material";
import { Mic, MicOff, ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const EFpage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      alert("Voice recognition is not supported in this browser.");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://xjnwl62k-4000.asse.devtunnels.ms/api/prompt-post", { prompt: input });
      const botMessage = { role: "assistant", content: response.data.response || "🤖 No response received." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error: Unable to fetch response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: "flex", flexDirection: "column", height: "90vh" }}>
      <Card sx={{ flex: 1, width: "100%", maxWidth: "900px", p: 2, borderRadius: 3, boxShadow: 5, bgcolor: "rgb(206, 206, 206)" }}>
        <CardContent>
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "rgb(44, 226, 62)" }}>
            Car Care Pro
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
            Your Virtual Assistant
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 400, overflowY: "auto", p: 1 }}>
            {messages.map((msg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Typography
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.role === "user" ? "#55abb9" : "rgb(255, 255, 255)",
                    color: "#000000",
                    maxWidth: "80%",
                  }}
                >
                  <strong>{msg.role === "user" ? "You" : "Car Care Pro"}:</strong>{" "}
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </Typography>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Typography sx={{ color: "gray", alignSelf: "flex-start" }}>🤖 Car Care is typing...</Typography>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", width: "100%", maxWidth: 600, mt: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type or speak..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <IconButton sx={{ ml: 1, bgcolor: listening ? "red" : "#55abb9", color: "#000000" }} onClick={startListening}>
          {listening ? <MicOff /> : <Mic />}
        </IconButton>
        <Button variant="contained" sx={{ ml: 1, bgcolor: "#55abb9", color: "#000000" }} onClick={sendMessage} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
        </Button>
      </Box>

      {/* Back to Home Button at Bottom */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: "auto", pb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          sx={{ bgcolor: " #55abb9", color: "#000000" }}
          onClick={() => navigate("/")}
          variant="contained"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default EFpage;
