"use client";
import React, { useEffect, useRef, useState } from "react";
const DesignPreview = ({ design }) => {
  const [canvasId] = useState(`canvasId_${design?._id}`);

  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    if (!design.canvasData) return;
    //get the element by id
    const timer = setTimeout(async () => {
      try {
        if (
          fabricCanvasRef.current &&
          fabricCanvasRef.current.dispose === "function"
        ) {
          try {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
          } catch (error) {

            console.error("error while diesposing canvas", error);
          }
        }

        const fabric = await import('fabric')

        const canvaseElement = document.getElementById(canvasId)

        if (!canvaseElement) return;

        const designPreviewCanvas = new fabric.StaticCanvas(canvasId, {
          width: 300,
          height: 300,
          renderOnAddRemove: true
        })

        fabricCanvasRef.current = designPreviewCanvas

        let canvasData;

        try {
          canvasData = typeof design.canvasData === 'string' ? JSON.parse(design.canvasData) : design.canvasData
        } catch (innererror) {
          console.log("error while loading the canavs", innererror)
          return;
        }

        if (canvasData.background) {

          designPreviewCanvas.backgroundColor = canvasData.background
          designPreviewCanvas.requestRenderAll()

        }

        designPreviewCanvas.loadFromJSON(canvasData, () => {
          designPreviewCanvas.requestRenderAll()
        })

      } catch (error) {
        console.log(error);
      }
    }, 100);

    return () => {
      clearTimeout(timer)
      if (fabricCanvasRef.current && typeof fabricCanvasRef.current.dispose === "function") {
        try {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        } catch (error) {
          console.log("Error while disposing canvas in cleanup", error)
        }
      }
    }
  }, [design._id, canvasId]);

  return (

      <canvas id={canvasId} width={300} height={300} className="w-full h-full object-cover" />

  );
};

export default DesignPreview;