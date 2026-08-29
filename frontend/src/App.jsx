import { useState, useEffect,useRef } from "react";
import { fetchChatResponse } from "./api";
import { OrbitProgress } from "react-loading-indicators";
import { MoveUp, Square } from "lucide-react";
import Loading from "./Loading";
import "./App.css";
import ReactMarkdown from "react-markdown";
function App() {
  const BottomRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gemini-3.6-flash");
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("chatList");

    if (storedList) {
      return JSON.parse(storedList);
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
      if (ValidateInput) {
        const message = await fetchChatResponse(question, model);
        setLoading(false);
        setList((List) => [...List, { question, response: message }]);

        setQuestion(""); // Clear the question input after sending
      } else {
        setLoading(false);
        alert("Please enter a question before sending.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching chat response:", error);
    }
  };

  useEffect(() => {
    BottomRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatList", JSON.stringify(list));
  }, [list,loading]);
  return (
    <div className="p-5 md:max-w-6xl mx-auto bg-white">
      <h1 className="font-bold items-center mb-10">Chat With GPT</h1>
      <div className="">
        <div className="flex-col justify-between items-center">
          <div className="h-120 overflow-y-auto hide-scrollbar">
            {list.length > 0 && (
              <div className="response-container">
                {list.map((item, index) => (
                  <div key={index}>
                    {item.question.length > 0 && (
                      <div className="flex py-5 justify-end items-center">
                        <p>{item.question}</p>
                      </div>
                    )}

                    <div className="response">
                      <p>
                        <ReactMarkdown>{item.response}</ReactMarkdown>
                      </p>
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

          <div className="px-8 pb-7 w-full fixed bottom-0 md:bottom-0 left-0 right-0 bg-white">
            <select
              name="model"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="md:hidden w-30 text-md  md:w-50 border-none outline-none p-2 rounded-lg mb-2"
            >
              <option value="gemini-3.6-flash" style={{fontSize: "12px"}} className="text-md">
                Gemini 3.6 Flash
              </option>
              <option value="gemini-3.5-flash-lite" style={{fontSize: "12px"}} className="text-md">
                Gemini 3.5 Flash Lite
              </option>
            </select>
             <select
              name="model"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-30 hidden md:block text-md  md:w-50 border-none outline-none p-2 rounded-lg mb-2"
            >
              <option value="gemini-3.6-flash"  className="text-md">
                Gemini 3.6 Flash
              </option>
              <option value="gemini-3.5-flash-lite" className="text-md">
                Gemini 3.5 Flash Lite
              </option>
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
                  className={`bg-gray-900 text-white p-2 rounded ${ValidateInput ? "hover:bg-gray-700 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                  onClick={handleSendQuestion}
                >
                  {loading ? <Square size={20} /> : <MoveUp size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
