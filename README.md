# ChatWithGPT

A full-stack AI chat application built with React, Node.js, Express, and Google Gemini.

ChatWithGPT provides a clean chat interface for interacting with Gemini models, with model selection, Markdown-rendered responses, persistent chat history, loading states, error handling, and a responsive UI.

---

## 🚀 Live Application

**Frontend:** https://chat-with-gpt-lyart.vercel.app

**Backend:** https://chatwithgpt-backend-cshegwhtd9b4hbcb.centralindia-01.azurewebsites.net

---

## ✨ Features

- 🤖 AI-powered conversations using Google Gemini
- 🔄 Multiple Gemini model selection
- 💬 Chat-style conversation interface
- 📝 Markdown rendering for AI responses
- 💾 Chat history persistence using `localStorage`
- ⏳ Loading state while generating responses
- ✅ Input validation
- 🔽 Automatic scrolling to the latest message
- ⚠️ Frontend and backend error handling
- ❤️ Backend health-check endpoint
- 📱 Responsive interface for desktop and smaller screens
- 🔐 Gemini API key kept on the backend
- 🌐 CORS configuration with an allowed-origin list

---

## 🛠️ Tech Stack

### Frontend

- React 19
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- React Markdown
- Ant Design
- Lucide React
- ESLint

### Backend

- Node.js
- Express 5
- Google GenAI SDK
- CORS
- dotenv
- Nodemon

### AI

- Google Gemini API
- `@google/genai`

### Deployment

- Vercel — Frontend
- Azure App Service — Backend

---

## 🏗️ Architecture

```mermaid
flowchart LR
    U[User] --> F[React Frontend]
    F --> B[Express Backend]
    B --> G[Google GenAI SDK]
    G --> M[Gemini Model]
    M --> G
    G --> B
    B --> F
    F --> UI[Rendered AI Response]
