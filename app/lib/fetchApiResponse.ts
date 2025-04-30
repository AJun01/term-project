/*
Daryl Young

this file is used to grab the server side response from the OpenAI API and then send it to the client side.

*/

export async function fetchApiResponse(
  // the request is made to the server and if there are no issues it adds the messages to the body of the request.
    messages: { role: string; content: string }[]
  ): Promise<string> {
    try {
      const res = await fetch("/api/ai-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
  
      if (!res.ok) {
        throw new Error(`AI API error: ${res.status}`);
      }
  
      const { reply } = await res.json();
      return reply;
    } catch (err) {
      console.error("Error fetching AI response:", err);
      return "";
    }
  }