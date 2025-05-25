"use client";
import React, { useRef, useState } from "react";

// Hugging Face API details
const API_URL = "https://ararsen/dr-fish-aadhyanta.hf.space/predict";
const API_DOC = "https://huggingface.co/spaces/ararsen/dr-fish-aadhyanta";

// Helper to call the Hugging Face endpoint
async function predictDisease(imageFile: File): Promise<any> {
  // Convert file to blob
  const imgBlob = await imageFile.arrayBuffer();
  // Use fetch to POST the image as form-data
  const formData = new FormData();
  formData.append(
    "img",
    new Blob([imgBlob], { type: imageFile.type }),
    imageFile.name
  );

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to get prediction");
  return res.json();
}

export default function DiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(null);
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictDisease(selectedFile);
      // You may need to adjust this based on your API's response structure
      setResult(
        typeof response === "string"
          ? response
          : response?.data
          ? JSON.stringify(response.data)
          : "No result"
      );
    } catch (err) {
      setError("Failed to detect disease. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-[#181f27] to-[#232b36]">
      <h1 className="text-2xl font-bold text-[#ffb43a] mb-2 text-center">
        Fish Disease Detection
      </h1>
      <p className="text-gray-400 text-center mb-6">
        Upload a clear image of your fish to detect if it is healthy or
        diseased.
        <br />
        <a
          href={API_DOC}
          className="text-blue-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Model API Docs
        </a>
      </p>
      <div className="bg-[#1e2630] rounded-2xl p-6 flex flex-col items-center shadow mb-6">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-xl mb-4 w-48 h-48 object-cover border border-[#232b36] shadow"
          />
        ) : (
          <div className="w-48 h-48 mb-4 flex items-center justify-center rounded-xl bg-[#232b36] text-gray-500 border border-dashed border-[#232b36]">
            No image selected
          </div>
        )}
        <button
          className="px-5 py-2 bg-[#ffb43a] text-[#181f27] font-semibold rounded-lg shadow hover:bg-[#ffd580] transition mb-2"
          onClick={() => inputRef.current?.click()}
        >
          Choose Image
        </button>
        <button
          className="px-5 py-2 bg-[#22d37b] text-white font-semibold rounded-lg shadow hover:bg-[#1ebc6b] transition disabled:opacity-40"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? "Analyzing..." : "Detect Disease"}
        </button>
      </div>
      {error && (
        <div className="bg-red-900/30 text-red-400 rounded-xl p-4 mb-4 text-center">
          {error}
        </div>
      )}
      {result && (
        <div className="bg-[#232b36] rounded-xl p-4 text-center shadow">
          <span className="text-lg font-semibold text-[#ffb43a]">Result:</span>
          <div className="text-white mt-2">{result}</div>
        </div>
      )}
    </div>
  );
}
