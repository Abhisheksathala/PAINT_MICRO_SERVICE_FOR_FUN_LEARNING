"use client";

import { textPresets } from "@/config";
import { addTexttocanvas } from "@/fabric/Fabricutiles";
import { useEditorStore } from "@/store/store";
import { Type } from "lucide-react";

const Textpannel = () => {
  const { canvas } = useEditorStore();

  const handlecustomtextbox = () => {
    if (!canvas) return;
    addTexttocanvas(canvas, "Enter the text here", { fontSize: 24 });
  };

  const handletextwithpreset = (preset) => {
    if (!canvas) return;
    addTexttocanvas(canvas, preset.text, {
      fontSize: preset.fontSize,
      fontWeight: preset.fontWeight,
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <button
          onClick={handlecustomtextbox}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <Type className="mr-2 -5 w-5" />
          <span className="font-medium">Add a Text Box</span>
        </button>
        <div className="pt-2">
          <h1 className="text-sm font-medium mb-4 text-gray-800  capitalize">
            Defult text styles
          </h1>
        </div>
        <div className="space-x-2">
          {textPresets.map((prest, index) => (
            <button
              className="w-full text-left bg-white p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              key={index}
              // / 1.8,24
              style={{
                fontSize: `${Math.min(prest.fontSize)}px`,
                fontWeight: prest.fontWeight,
                fontFamily: prest.fontFamily || "normal",
                fontStyle: prest.fontStyle,
              }}
              onClick={() => handletextwithpreset(prest)}
            >
              {prest.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Textpannel;
