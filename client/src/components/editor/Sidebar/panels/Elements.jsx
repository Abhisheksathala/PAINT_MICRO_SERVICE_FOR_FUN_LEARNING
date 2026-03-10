"use client";

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
            const minicanvas = new fabric.StaticCanvas({
              width: 100,
              height: 100,
              backgroundColor: "trnasparent",
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
        console.log(object);
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
    };
  });

  return <div>Elements</div>;
};

export default ElementsPanels;
