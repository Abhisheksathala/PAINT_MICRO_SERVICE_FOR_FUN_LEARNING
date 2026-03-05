"use client";
import { initializeFabric } from "@/fabric/Fabricutiles";
import { useEditorStore } from "@/store/store";
import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const fabriccanvasRef = useRef(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas } = useEditorStore();

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabriccanvasRef.current) {
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
        typeof window === undefined ||
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
          console.error("failed to load canvas js");
          return;
        }
        fabriccanvasRef.current = fabricCanavs;
        // set canavs in the store
        setCanvas(fabricCanavs);
        console.log("canvas init is done and set in store");

        //TODO:apply custome style for the controllers
      } catch (error) {
        console.error("failed to load canvas js", error);
      }
    };

    let timer = setTimeout(() => {
      initcanavs();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
