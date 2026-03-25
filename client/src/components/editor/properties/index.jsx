"use client";

import { useEditorStore } from "@/store/store";
import React from "react";

const Properties = () => {
    const {  canvas } = useEditorStore();
  return (
    <div className="fixed flex right-0 top-[56px] bottom-[0px] w-[280px] bg-white border-1 border-gray-200 z-10">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <span className="font-medium">Properties</span>
        </div>
      </div>
    </div>
  );
};

export default Properties;
