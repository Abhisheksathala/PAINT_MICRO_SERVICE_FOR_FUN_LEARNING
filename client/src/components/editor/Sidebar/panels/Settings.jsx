"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorPresets } from "@/config";
import { Check } from "lucide-react";
import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

const Settingspannel = () => {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const handleColorChange = (e) => {
    const { value } = e.target;
    setBackgroundColor(value);
  };

  const handlcolorPreset = (value) => {
    setBackgroundColor(value);
  };

  const handlApplyeChngae = ()=>{}



  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Choose Background Color</h3>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2 mb-3">
          {colorPresets.map((color, index) => {
            return (
              <TooltipProvider key={color}>
                <Tooltip>
                  <TooltipTrigger asChild="true">
                    <button
                      className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${color === backgroundColor ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                      style={{
                        backgroundColor: color,
                      }}
                      onClick={()=>handlcolorPreset(color)}
                    >
                      {color === backgroundColor && (
                        <Check className="w-4 h-4 text-white mx-auto drop-shadow-2xl" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        <div className="flex mt-3 space-x-3">
          <div className="relative">
            <Input
              id="color"
              name="color"
              type="color"
              value={backgroundColor}
              onChange={handleColorChange}
              className={"w-12 h-10 p-1 cursor-pointer"}
            />
          </div>
          <Input
            id="text"
            name="text"
            type={"text"}
            placeholder="#FFFFF"
            onChange={handleColorChange}
            value={backgroundColor}
            className={"flex-1"}
          />
        </div>
        <Separator className={'my-4'} />
        <button className="w-full" onClick={handlApplyeChngae}>
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default Settingspannel;
