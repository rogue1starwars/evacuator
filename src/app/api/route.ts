// Create a file: src/app/api/proxy/disaster-prompt/route.ts
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // Get the token from the HTTPOnly cookie (server-side only)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    console.error("Token not found in cookies");
    return new Response("Token not found in cookies", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Get the request body
  const formData = await request.formData();

  try {
    // Make the API request
    const response = await fetch("http://35.190.225.106:8000/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"prompt": "Attention. A strong earthquake has occurred nearby. You are in a high-risk zone. Because of your limited mobility and heart condition, do not attempt to evacuate on your own. Stay away from windows and heavy furniture. If possible, move under a sturdy table or brace yourself against an interior wall. Help is on the way. Please remain calm and wait for emergency responders to arrive. This is a life-threatening situation. Stay alert and follow safety instructions"}',
    });

    // Check if the response is OK
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return new Response(`API error: ${response.status}`, {
        status: response.status,
      });
    }

    // Parse the JSON response
    const jsonResponse = await response.json();
    console.log("API response:", jsonResponse);

    // Extract the ai_response field
    const aiResponse = jsonResponse.ai_response;

    // Return just the AI response text
    return new Response(aiResponse, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Error processing request", {
      status: 500,
    });
  }
}
