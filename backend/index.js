const express = require("express");
const dotenv = require("dotenv");
const { main } = require("./chat");
const cors = require("cors");
const app = express();
dotenv.config();
const allowedOrigins = [
  "https://chat-with-gpt-lyart.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    } ,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
//middlewares
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  console.log("1️⃣ Request received");
  try {
    const start = Date.now();
    const selectedModel = req.body.model || "gemini-3.5-flash-lite";
    const question = req.body.question;
    console.log("2️⃣ Question received:", question);
    console.log("2️⃣ Selected model:", selectedModel);
    console.log("2️⃣ Calling Gemini...");
    const response = await main(question, selectedModel);
    console.log("3️⃣ Gemini finished:", Date.now() - start, "ms");
    res.status(200).json({ message: response });
    console.log("4️⃣ Response sent");
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ message: "Error processing request, please try again later" });
  }
});
app.get("/api/health", (req, res) => {
  res.send("Server is healthy and running!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
  console.log("Hello this is Gemini, How can I help you?");
});
