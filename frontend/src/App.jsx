import { useState, useEffect, useRef } from "react";
import { fetchChatResponse } from "./api";

import { MoveUp, Square } from "lucide-react";
import Loading from "./Loading";
import "./App.css";
import ReactMarkdown from "react-markdown";
function App() {
  const BottomRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gemini-3.5-flash-lite");
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("chatList");

    if (storedList) {
      const filtered = JSON.parse(storedList).filter((item) => item.response !== "Error fetching chat response: Error processing request, please try again later");
      return filtered;
    }

    return [
      {
        question: "",
        response: "Hey there!, How can I help you?",
      },
    ];
  });
  localStorage.setItem("chatList", JSON.stringify(list));
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const ValidateInput = question.trim() !== "";
  const handleSendQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
        const message = await fetchChatResponse(question, model);
        setLoading(false);
        setList((List) => [...List, { question, response: message }]);

        setQuestion(""); // Clear the question input after sending
       
    } catch (error) {
      setLoading(false);
      console.error("Error fetching chat response:", error);
    }
  };
const models = [
  {
    name: "Gemini 3.7 Flash",
    id: "gemini-3.7-flash"
  },
  {
    name: "Gemini 3.6 Flash",
    id: "gemini-3.6-flash"
  },
  {
    name: "Gemini 3.5 Flash",
    id: "gemini-3.5-flash"
  },
  {
    name: "Gemini 3.5 Flash Lite",
    id: "gemini-3.5-flash-lite"
  },
  {
    name: "Gemini 3.1 Flash Lite",
    id: "gemini-3.1-flash-lite"
  }
];
  useEffect(() => {
    BottomRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatList", JSON.stringify(list));
  }, [list, loading]);
  return (
    <div className="p-5 max-w-[850px] mx-auto bg-white">
      <h1 className="font-bold items-center mb-10">Chat With GPT</h1>
      <div className="">
        <div className="flex-col justify-between items-center">
          <div className="h-120 overflow-y-auto hide-scrollbar">
            {list.length > 0 && (
              <div className="response-container">
                {list.map((item, index) => (
                  <div key={index}>
                    {item.question.length > 0 && (
                      <div className="flex  py-5 justify-end items-center">
                        <p className="bg-blue-100 rounded-2xl px-3 py-2 ">{item.question}</p>
                      </div>
                    )}

                    <div className="response">
                      <div className="markdown-response">
                        <ReactMarkdown >{item.response}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-center items-center mt-5">
                    <Loading />
                  </div>
                )}
                <div ref={BottomRef}></div>
              </div>
            )}
          </div>
          <div className=" flex justify-center items-center">
            <div className="px-8 pb-7 w-100 md:w-240  fixed bottom-0 md:bottom-0  bg-white">
              <select
                name="model"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="md:hidden w-23 text-md   border outline-blue-400 p-3 rounded-3xl mb-2"
              >
                {models.map((modelOption) => (
                  <option key={modelOption.id} value={modelOption.id} className="text-md">
                    {modelOption.name}
                  </option>
                ))}
              </select>
              <select
                name="model"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className=" hidden md:block text-md  md:w-50 border-none outline-none p-2 rounded-lg mb-2"
              >
                {models.map((modelOption) => (
                  <option key={modelOption.id} value={modelOption.id} className="text-md">
                    {modelOption.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-between border rounded-2xl ">
                <textarea
                  className="w-90 md:w-full border-none outline-none p-2 resize-none"
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Ask me anything..."
                />

                <div className="flex w-20  h-15 rounded-2xl  justify-center items-center ml-1">
                  <button
                    className={`bg-gray-900 text-white p-2 rounded-full ${ValidateInput ? "hover:bg-gray-700 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                    onClick={handleSendQuestion}
                    disabled={!ValidateInput || loading}
                  >
                    {loading ? <Square size={20} /> : <MoveUp size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
