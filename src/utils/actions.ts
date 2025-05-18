"use server";
import { redirect } from "next/navigation";

export async function handleRegister(prev: any, formData: FormData) {
  // Convert formData values to strings to avoid null values
  const rawData = {
    name: String(formData.get("name") || ""),
    id: String(formData.get("id") || ""),
    password: String(formData.get("password") || ""),
  };

  console.log("Form data:", rawData);

  const baseUrl = process.env.URL;
  const endpoint = new URL("api/auth/register", baseUrl);
  console.log(endpoint.toString());
  try {
    const response = await fetch(endpoint.toString(), {
      method: "POST",
      body: JSON.stringify(rawData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    // Get the actual error message from the response
    const responseBody = await response.text();
    console.log("Response body:", responseBody);

    if (response.ok) {
      console.log("Setup successful");
      redirect("/setup/medicals");
    } else {
      console.error(`Setup failed: ${response.status} - ${responseBody}`);
      return {
        message: `Setup failed: ${response.status} - ${responseBody}`,
      };
      // throw new Error(`${response.status} - ${responseBody}`);
    }
  } catch (error) {
    console.error("Request error:", error);
    return {
      message: `Request error: ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    };
    // throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}
