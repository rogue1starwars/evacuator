export default function Setup() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const rawData = {
      name: formData.get("name"),
      age: formData.get("age"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      bloodType: formData.get("bloodType"),
      allergies: formData.get("allergies"),
      emergencyContacts: formData.get("emergencyContacts"),
    };
    fetch("/api/setup", {
      method: "POST",
      body: JSON.stringify(rawData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Setup</h1>
      <p className="mb-6">Setup your device for the evacuation</p>
      <form
        action={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow"
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
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            className="w-full border rounded px-3 py-2"
            required
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
          <label className="block mb-1 font-medium">Allergies</label>
          <input
            type="text"
            name="allergies"
            className="w-full border rounded px-3 py-2"
            placeholder="List allergies separated by commas"
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
