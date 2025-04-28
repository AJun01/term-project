export async function fetchApiResponse(
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