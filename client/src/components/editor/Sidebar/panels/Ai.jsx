"use client";

import { Wand2 } from "lucide-react";
import { useState } from "react";

const Aipannel = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [genratedContent, setGenratedContent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [UploadSuccess, setUploadSuccess] = useState(false);

  const handlePrmptChnage = () => {};

  return (
    <div className="h-ful overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold">AI Image Genrater</h3>
        </div>
        <div className="space-y-2">
          <textarea
            className=" border-2 border-purple-400/20 rounded-md outline-none resize-none focus:ring-1 ring-purple-500"
            value={prompt}
            rows={4}
            cols={40}
            placeholder="Prompt"
            onChange={handlePrmptChnage}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Aipannel;
