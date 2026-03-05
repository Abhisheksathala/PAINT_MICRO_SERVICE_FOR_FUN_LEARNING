import { Sparkles } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function AiFeatures() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 mt-12">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
        AI Image Creation
      </h2>
      <p className="text-center mb-4 text-gray-400">
        Create stunning thumbnaisls images for yt videos with AI
      </p>
      {/* button */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="outline"
          className={
            "rounded-full px-5 py-6 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-purple-700 border-purple-200 shadow-sm items-center cursor-pointer"
          }
        >
          Genrate thumbnaisls from Video titles
        </Button>
        <Button
          variant="outline"
          className={
            "rounded-full px-5 py-6 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-pink-100 text-pink-700 border-purple-200 shadow-sm items-center cursor-pointer"
          }
        >
          Genrate Custome thumbnaisl images
        </Button>
      </div>
    </div>
  );
}
export default AiFeatures;
