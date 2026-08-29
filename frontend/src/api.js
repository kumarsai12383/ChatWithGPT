async function fetchChatResponse(question, model) {
  try {
    const response = await fetch(`https://chatwithgpt-i82p.onrender.com/api/chat`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, model })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    return `Error fetching chat response: ${error.message}`;
  }
}

        
export { fetchChatResponse};