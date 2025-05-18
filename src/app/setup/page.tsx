import { redirect } from "next/navigation";

export default function Setup() {
  async function handleSubmit(formData: FormData) {
    "use server";

    // Convert formData values to strings to avoid null values
    const rawData = {
      name: String(formData.get("name") || ""),
      id: String(formData.get("id") || ""),
      password: String(formData.get("password") || ""),
    };

    console.log("Form data:", rawData);

    try {
      const response = await fetch(
        "http://34.146.150.72:8081/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(rawData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      // Get the actual error message from the response
      const responseBody = await response.text();
      console.log("Response body:", responseBody);

      if (response.ok) {
        console.log("Setup successful");
        redirect("/setup/medicals");
      } else {
        console.error(`Setup failed: ${response.status} - ${responseBody}`);
        // throw new Error(`${response.status} - ${responseBody}`);
      }
    } catch (error) {
      console.error("Request error:", error);
      // throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form
        action={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 rounded shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">ID</label>
          <input
            type="text"
            name="id"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </main>
  );
}
