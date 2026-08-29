async function fetchChatResponse(question) {
  try {
    const response = await fetch(`http://localhost:5000/api/chat`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
}

        
export { fetchChatResponse};