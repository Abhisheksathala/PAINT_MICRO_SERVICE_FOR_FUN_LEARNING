"use client";

import { Button } from "@/components/ui/button";
import { addImageTocanavs } from "@/fabric/Fabricutiles";
import { GenrateimageWithAi } from "@/services/UploadService";
import { useEditorStore } from "@/store/store";
import { Loader } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Wand2 } from "lucide-react";
import { useState } from "react";

const Aipannel = () => {
  const { canvas } = useEditorStore();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [genratedContent, setGenratedContent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [UploadSuccess, setUploadSuccess] = useState(false);

  const handlePrmptChnage = (event) => {
    setPrompt(event.target.value);
  };
  const handleGenrate = async () => {
    setLoading(true);
    setGenratedContent(null);
    setUploadSuccess(false);
    try {
      await GenrateImageFunction(prompt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GenrateImageFunction = async (prompt) => {
    try {
      const response = await GenrateimageWithAi(prompt);
      // console.log(response);

      if (response && response?.data?.url) {
        setGenratedContent(response?.data?.url);
      }
    } catch (error) {
      console.log(error);
      throw new Error("NO Image URL");
    }
  };

  const handleimageTocanvas = () => {
    if (!canvas && !genratedContent) return;
    addImageTocanavs(canvas, genratedContent);
  };

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
          <Button
            onClick={handleGenrate}
            disable={!prompt.trim() || loading}
            className={"w-full"}
            size="lg"
          >
            {loading ? (
              <p>genrating...</p>
            ) : (
              <>
                <Sparkles />
                Genrate-Image
              </>
            )}
          </Button>
        </div>
      </div>
      {loading && (
        <div className="border rounded-md bg-gray-50 p-6 flex-col items-center justify-center">
          <Loader className="w-5 h-5 text-purple-600" />
          <p className="text-sm text-center text-gray-300">
            Creating Your Image
          </p>
        </div>
      )}
      {genratedContent && !loading && (
        <>
          <div className="space-y-2">
            <div className="border rounded-md overflow-hidden">
              <img src={genratedContent} alt="img" className="w-full h-auto" />
            </div>
          </div>
          <div>
            <Button
              onClick={handleimageTocanvas}
              className={"flex-1"}
              variant={UploadSuccess ? "outline" : "default"}
            >
              Add To Canvas
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Aipannel;
