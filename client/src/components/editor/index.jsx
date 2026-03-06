"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/store/store";
import { getuserDesignByID } from "@/services/DesignService";

const MainEditor = () => {
  const params = useParams();
  const router = useRouter();
  const designId = params?.slug;

  const [loading, setLoading] = useState(!!designId);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const { canvas, setDesignId, resetStore } = useEditorStore();

  useEffect(() => {
    // resetStore();
    if (designId) setDesignId(designId);
    return () => {
      // resetStore();
    };
  }, []);

  useEffect(() => {
    setLoadAttempted(false);
    setError(null);
  }, [designId]);

  useEffect(() => {
    if (canvas) {
      console.log("canavs is now avalable ");
    }
  }, [canvas]);

  useEffect(() => {
    if (loading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (loading) {
          console.log("canvas time out");
          setLoading(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [canvas, loading, designId]);

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;
    try {
      setLoadAttempted(true);
      setLoading(true);

      const res = await getuserDesignByID(designId);
      console.log(res);
      const design = res.data;
      if (design) {
        // update name
        // TODO:

        // setDesignID the design id just incase after getting the data
        setDesignId(designId);

        try {
          if (design.canvasData) {
            canvas.clear();
            if (design.width && design.height) {
              canvas.setDimensions({
                width: design.width,
                height: design.height,
              });
            }
            const canvasData =
              typeof design.canvasData === "string"
                ? JSON.parse(design.canvasData)
                : design.canvasData;

            const hasObjects =
              canvasData &&
              canvasData?.objects &&
              canvasData?.objects?.length > 0;

            if (canvasData.background) {
              canvas?.backgroundColor = canvasData.background;
            } else {
              canvas.backgroundColor = "#ffffff";
            }

            if (!hasObjects) {
              canvas.renderAll();
              return null;
            }
          } else {
            console.log("no canavasData");
            canvas.clear();
            canvas.setWidth(design.width);
            canvas.setHeight(design.height);
            canvas?.backgroundColor = "#000000";
            canvas.renderAll();
          }
        } catch (error) {
          console.log("error loading canvase", error);
          setError("error loading canvase");
        }
      }
    } catch (e) {
      console.error("error", e);
      setError("filed to load ");
      setLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (!designId) {
      router.replace("/");
      return;
    }
    if (canvas && designId && !loadAttempted) {
      loadDesign();
    }

    // else if (!designId) {
    //   router.replace("/");
    // }
  }, [canvas, designId, loadAttempted, router, loadDesign]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
            <Canvas />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainEditor;
// loadDesign
