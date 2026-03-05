"use client";

import { designTypes } from "@/config";

function DesignType() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 py-8">
      {designTypes.map((type, index) => {
        return(
          <div key={index} className="flex flex-col items-center cursor-pointer">
          <div
            className={`${type.bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-2`}
          >
            {type.icon}
          </div>
          <span className="text-xs text-center">{type.label}</span>
        </div>
        )
      })}
    </div>
  );
}

export default DesignType
