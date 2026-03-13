"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brushSizes, drawingPanelColorPresets } from "@/config";
import { useEditorStore } from "@/store/store";
import { Droplet } from "lucide-react";
import { Eraser } from "lucide-react";
import { Palette } from "lucide-react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Paintbrush } from "lucide-react";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

const Drawpannel = () => {
  const { canvas } = useEditorStore();
  const [isdrwaing, setIsdrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [drewingColor, setDrewingColor] = useState("#000000");
  const [brushwidth, setBrushwidth] = useState(5);
  const [drawingOpacity, setDrawingOpacity] = useState(100);
  const [Activetab, setActivetab] = useState("colors");

  const handletoggleDrawing = () => {
    const newMode = !isdrwaing;
    setIsdrawing(newMode);
    if (newMode && isErasing) {
      setIsErasing(false);
    }
  };

  const handlebrrushwithchnage = (width) => {
    setBrushwidth(width);
  };

  const handleopacity = (e) => {
    setDrawingOpacity(e);
  };

  const handleToggelerasing = () => {
    const newMode = !isErasing;
    setIsErasing(newMode);
  };

  return (
    <div className="p-4">
      <div className="space-y-5">
        <Button
          variant={isdrwaing ? "default" : "outline"}
          className={"w-full py-6 group transition-all "}
          size="lg"
          onClick={() => {
            handletoggleDrawing();
          }}
        >
          <PencilIcon
            className={`mr-2 h- w-5 ${isdrwaing ? "animate-bounce" : "hover:animate-bounce"}`}
          />
          <span className="font-medium">
            {isdrwaing ? "exit drawing mode" : "enter drawing Mode"}
          </span>
        </Button>
        {isdrwaing && (
          <>
            <Tabs
              defaultvalue="colors"
              className={"w-full"}
              onValueChange={setActivetab}
            >
              <TabsList className={"grid grid-cols-3 mb-4"}>
                <TabsTrigger value="colors">
                  <Palette className="mr-2 h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="brush">
                  <Paintbrush className="mr-2 h-4 w-4" />
                  Brush
                </TabsTrigger>
                <TabsTrigger value="tools">
                  {" "}
                  <Eraser className="mr-2 h-4 w-4" /> Tools
                </TabsTrigger>
              </TabsList>
              <TabsContent value="colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Color palette</Label>
                    <div
                      className="w-8 h-8 rounded-full border shadow-sm"
                      style={{ backgroundColor: drewingColor }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {drawingPanelColorPresets.map((colors) => (
                      <>
                        <div className="" key={colors}>
                          <button
                            className={`w-10 h-10 rounded-full border transition-transform hover:scale-110 ${colors === drewingColor ? "ring-1 ring-offset-2 ring-primary" : ""}`}
                            style={{
                              backgroundColor: colors,
                            }}
                          ></button>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="flex mt-5 space-x-2">
                    <div className="relative">
                      <input
                        type="color"
                        className="w-12 h-10 p-1 cursor-pointer border border-gray-300 rounded-md"
                        disabled={isErasing}
                        value={drewingColor}
                        onChange={(e) => setDrewingColor(e.target.value)}
                      />
                    </div>
                    <input
                      type="text"
                      className="w-32 h-10 p-1 cursor-pointer border border-gray-300 rounded-md"
                      disabled={isErasing}
                      value={drewingColor}
                      onChange={(e) => setDrewingColor(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="brush" className={"space-y-4"}>
                <div className="space-y-3">
                  <Label className={"block text-sm font-semibold"}>
                    Brush Size
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Minus
                      onClick={() => setBrushwidth((prev) => prev - 1)}
                      className="h-4 w-4 text-gray-500 cursor-pointer"
                    />
                    <Slider
                      value={[brushwidth]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(val) => setBrushwidth(val[0])}
                      className={"flex-1"}
                    />
                    <Plus
                      onClick={() => setBrushwidth((prev) => prev + 1)}
                      className="h-4 w-4 text-gray-500 cursor-pointer"
                    />
                    <p>{brushwidth}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {brushSizes.map((size) => (
                      <Button
                        variant={
                          size.value === brushwidth ? "default" : "outline"
                        }
                        className={"px-2 py-1 h-auto"}
                        key={size}
                        onClick={() => handlebrrushwithchnage(size.value)}
                      >
                        {size.label}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <Label className="font-medium">
                        <Droplet className="mr-2 h-4 w-4" />
                        Opacity
                      </Label>
                      <span className="text-sm font-medium">
                        {drawingOpacity}%
                      </span>
                    </div>
                    <Slider
                      value={[drawingOpacity]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(val) => handleopacity(val[0])}
                      className={"flex-1"}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tools">
                <Button
                  onClick={handleToggelerasing}
                  variant={isErasing ? "destructive" : "outline"}
                  className={"w-full py-6"}
                >
                  {isErasing ? "stop erasing" : "Eraser Mode"}
                </Button>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawpannel;
