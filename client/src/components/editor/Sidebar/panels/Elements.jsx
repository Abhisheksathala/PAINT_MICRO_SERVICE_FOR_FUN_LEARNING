"use client";

import { addShapToCanvas } from "@/fabric/Fabricutiles";
import { shapeDefinations, shapeTypes } from "@/fabric/Shaps";
import { useEditorStore } from "@/store/store";
import { useEffect, useRef, useState } from "react";

const ElementsPanels = () => {
  const { canvas } = useEditorStore();

  const minicanvasRef = useRef({});
  const canvasElementRef = useRef({});

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;
    const timer = setTimeout(async () => {
      try {
        const fabric = await import("fabric");
        for (const shapeType of shapeTypes) {
          const canvasElement = canvasElementRef.current[shapeType];
          if (!canvasElement) continue;
          const canvasId = `mini-canvas-${shapeType}-${Date.now()}`;
          canvasElement.id = canvasId;
          try {
            const definition = shapeDefinations[shapeType];
            const minicanvas = new fabric.StaticCanvas(canvasElement, {
              width: 100,
              height: 100,
              backgroundColor: "transparent",
              renderOnAddRemove: true,
            });
            minicanvasRef.current[shapeType] = minicanvas;
            definition.thumbnail(fabric, minicanvas);
            minicanvas.renderAll();
          } catch (error) {
            console.log("error while creating definition", error);
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.log(error);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      Object.values(minicanvasRef.current).forEach((miniCanvas) => {
        if (miniCanvas && typeof miniCanvas.dispose === "function") {
          miniCanvas.dispose();
        }
      });
      minicanvasRef.current = {};
      setIsInitialized(false);
    };
  }, []);

  const setCanvasRef = (getCurrentElement, shapeType) => {
    if (getCurrentElement) {
      canvasElementRef.current[shapeType] = getCurrentElement;
    }
  };

  const handlesaveclick = async (type) => {
    addShapToCanvas(canvas, type);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {shapeTypes.map((shapsType, index) => {
            return (
              <>
                <div
                  style={{
                    height: "90px",
                  }}
                  className="cursor-pointer flex flex-col items-center justify-center"
                  key={shapsType || index}
                  onClick={() => handlesaveclick(shapsType)}
                >
                  <canvas
                    width={"100"}
                    height={"100"}
                    ref={(el) => setCanvasRef(el, shapsType)}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElementsPanels;
