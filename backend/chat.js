const dotenv = require('dotenv');
dotenv.config();
const {GoogleGenAI} = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main(question) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: question,
  });
  return response.text;
  
}

module.exports =  {main} ;