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
  try {
    const question = req.body.question;
    const response = await main(question);

    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
  console.log(
    "Hello this is Gemini, How can I help you?",
  );
});
