"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import axios from "axios";
import React, { useState } from "react";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
    const {user} = useAuth();
  // Generate API Key function
  const generateApiKey = async () => {
    setLoading(true);
    setMessage("");
    if(!user){
        setMessage("User not authenticated. Please log in.");
        setLoading(false);
        return;
    }
            try {
                console.log("Generating API Key for user:", user?.name,user?.email);
            const res = await axios.post("/api/FreeApi", {
                name: user?.name ,
                email: user?.email ,
            });

      const data = res.data;

      if (data.success) {
        setApiKey(data.apiKey);
        console.log("Generated API Key:", data.apiKey);
        setMessage("API Key generated successfully!");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err.response.data.error || err.message);
      setMessage(err.response.data.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setMessage("API Key copied to clipboard!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-semibold mb-4">Your API Key</h2>

      {apiKey ? (
        <div className="mb-4">
          <input
            type="text"
            value={apiKey}
            readOnly
            className="w-full p-2 border rounded"
          />
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Copy API Key
          </button>
        </div>
      ) : (
        <p className="mb-4 text-gray-600">
          Click the button below to generate your API Key.
        </p>
      )}

      <button
        onClick={generateApiKey}
        disabled={loading}
        className={`px-6 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate API Key"}
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <div className="mt-6 p-4 border rounded bg-gray-50 text-gray-700">
        <h3 className="font-semibold mb-2">How to use your API Key:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Copy your API Key using the button above.</li>
          <li>
            Use it in your requests in the header as: <code>x-api-key: YOUR_KEY</code>
          </li>
          <li>Call the endpoint: <code>/api/text or /api/image</code> with your media file.</li>
          <li>Your free credits will be automatically deducted.</li>
        </ol>
      </div>
    </div>
  );
}
