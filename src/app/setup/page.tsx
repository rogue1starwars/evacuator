"use client";
import { handleRegister } from "@/utils/actions";
import { useActionState } from "react";

export default function Setup() {
  const [state, formAction, pending] = useActionState(handleRegister, {
    message: "",
  });
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {state.message && (
        <div className="text-red-500 mb-4">{state.message}</div>
      )}
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 p-6 rounded shadow"
      >
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
          disabled={pending}
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </main>
  );
}
