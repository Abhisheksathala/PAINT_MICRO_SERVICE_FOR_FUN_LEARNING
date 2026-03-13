"use client";

import { useEditorStore } from "@/store/store";
import { Type } from "lucide-react";

const Textpannel = () => {
  const { canvas } = useEditorStore();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer">
          <Type className="mr-2 -5 w-5" />
          <span className="font-medium">Add a Text Box</span>
        </button>
      </div>
    </div>
  );
};

export default Textpannel;
