"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <h1 className="font-semibold text-[#5D5D5D] text-[20px] mt-[56px] mb-[12px]">
        Sign up to continue
      </h1>
      <div className="w-full h-px bg-[#CCC] mb-8"></div>

      <div className="w-full bg-gray-100 mx-[24px] p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <Image
              src="/user_placeholder.png"
              alt="User"
              width={40}
              height={40}
            />
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="w-full flex items-center justify-center mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          <Image
            src="/google_logo.png"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </button>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-blue-500" />
            <span>Stay signed in</span>
          </label>
          <Link href="#" className="text-blue-600 hover:underline">
            Need help?
          </Link>
        </div>
      </div>

      <Link href="setup" className="mt-6 text-blue-600 text-sm hover:underline">
        Create an account
      </Link>
    </main>
  );
}
