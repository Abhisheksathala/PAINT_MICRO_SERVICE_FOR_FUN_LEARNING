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
    } catch (e) {
      console.error("error", e);
      setError("filed to load ");
      setLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (loading && designId && !canvas) {
      loadDesign();
    } else if (!designId) {
      router.replace("/");
    }
  }, [canvas, designId, loadAttempted, router]);

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
loadDesign