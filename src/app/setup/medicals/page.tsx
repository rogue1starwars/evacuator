import { redirect } from "next/navigation";

export default function Medicals() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const rawData = {
      name: formData.get("name"),
      dateOfBirth: formData.get("dateOfBirth"),
      language: formData.get("language"),
      medications: formData.get("medications"),
      allergies: formData.get("allergies"),
      conditions: formData.get("conditions"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      bloodType: formData.get("bloodType"),
      emergencyContacts: formData.get("emergencyContacts"),
    };
    console.log("Form data:", rawData);
    if (!process.env.URL) {
      console.error("URL is not defined");
      return;
    }
    const response = await fetch(
      `http://34.146.150.72:8081/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(rawData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log("Setup successful:", data);
      redirect("/setup/finish");
    } else {
      console.error("Setup failed:", response.statusText);
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Add Information</h1>
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
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            name="daeOfBirth"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Primary Language</label>
          <input
            type="text"
            name="language"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Medications</label>
          <textarea
            name="medications"
            className="w-full border rounded px-3 py-2"
            placeholder="Medication name and dosage"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Allergies</label>
          <textarea
            name="allergies"
            className="w-full border rounded px-3 py-2"
            placeholder="Allergy name and reaction"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Conditions</label>
          <textarea
            name="conditions"
            className="w-full border rounded px-3 py-2"
            placeholder="Condition name and details"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. O+, A-, etc."
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Emergency Contacts</label>
          <textarea
            name="emergencyContacts"
            className="w-full border rounded px-3 py-2"
            placeholder="Name and phone number(s)"
            rows={3}
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
