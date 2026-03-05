"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/store/store";

const MainEditor = () => {
  const params = useParams();
  const router = useRouter();
  const designId = params?.slug;

  const [loading, setLoading] = useState(!!designId);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const { Canvas, setDesignId } = useEditorStore();

  useEffect(() => {}, []);

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
