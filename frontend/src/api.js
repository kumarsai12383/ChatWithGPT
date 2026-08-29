async function fetchChatResponse(question, model) {
  try {
    const response = await fetch(`https://chatwithgpt-backend-cshegwhtd9b4hbcb.centralindia-01.azurewebsites.net/api/chat`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, model })
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`${data.message}`);
    }
    return data.message;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return `Error fetching chat response: ${error.message}`;
  }
}

        
export { fetchChatResponse};