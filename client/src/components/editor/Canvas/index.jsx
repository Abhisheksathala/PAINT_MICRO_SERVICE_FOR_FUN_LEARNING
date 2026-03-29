"use client";
import { initializeFabric } from "@/fabric/Fabricutiles";
import { useEditorStore } from "@/store/store";
import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const fabriccanvasRef = useRef(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas, markAsModified } = useEditorStore();

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabriccanvasRef.current) {
        try {
          fabriccanvasRef.current.off();
          fabriccanvasRef.current.off("object:added");
          fabriccanvasRef.current.off("object:modified");
          fabriccanvasRef.current.off("object:removed");
          fabriccanvasRef.current.off("path:created");
        } catch (error) {
          console.log("eerror removeing event listeners");
        }
        try {
          fabriccanvasRef.current.dispose();
        } catch (error) {
          console.error("error disposing canvas", error);
        }
        fabriccanvasRef.current = null;
        setCanvas(null);
      }
    };
    cleanUpCanvas();
    // rese init flag
    initAttemptedRef.current = false;

    // init our canvas

    const initcanavs = async () => {
      if (
        typeof window === "undefined" ||
        !canvasRef.current ||
        initAttemptedRef.current
      ) {
        return;
      }

      initAttemptedRef.current = true;

      try {
        const fabricCanavs = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current,
        );
        if (!fabricCanavs) {
          console.error("Failed to initialize Fabric.js canvas");
          return;
        }
        fabriccanvasRef.current = fabricCanavs;
        // set canavs in the store
        setCanvas(fabricCanavs);
        console.log("Canvas init is done and set in store");

        const handleCanvasChange = () => {
          // TODO: implement auto save
          // COMPLETED:
          markAsModified();
          console.log("Canvase images");
        };

        //TODO:apply custome style for the controllers
        fabricCanavs.on("object:added", handleCanvasChange);
        fabricCanavs.on("object:modified", handleCanvasChange);
        fabricCanavs.on("object:removed", handleCanvasChange);
        fabricCanavs.on("path:created", handleCanvasChange);
      } catch (error) {
        console.error("failed to load canvas js", error);
      }
    };

    const timer = setTimeout(() => {
      initcanavs();
      cleanUpCanvas();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [setCanvas]);

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden"
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
