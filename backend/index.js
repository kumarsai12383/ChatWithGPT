const express = require("express");
const dotenv = require("dotenv");
const { main } = require("./chat");
const cors = require("cors");
const app = express();
dotenv.config();
//middlewares
app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
  console.log("1️⃣ Request received");
  try {
    const start = Date.now();
    const question = req.body.question;
    console.log("2️⃣ Question received:", question);
    console.log("2️⃣ Calling Gemini...");
    const response = await main(question);
    console.log("3️⃣ Gemini finished:", Date.now() - start, "ms");
    res.status(200).json({ message: response });
     console.log("4️⃣ Response sent");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
  console.log("Hello this is Gemini, How can I help you?");
});
