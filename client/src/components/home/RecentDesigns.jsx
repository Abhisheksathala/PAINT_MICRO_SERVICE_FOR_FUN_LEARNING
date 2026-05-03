"use client";

import React from "react";
import Image from "next/image";
import { getuserDesigns, DeleteDesign } from "@/services/DesignService";
import { useRouter } from "next/navigation";
import DesignPreview from "./design-preview";
import { useEditorStore } from "@/store/store";
import { Trash2 } from "lucide-react";

function RecentDesigns() {
  const { userDesigns, setUserDesigns } = useEditorStore();
  const router = useRouter();

  const handleDelete = async (e, designId) => {
    e.stopPropagation();
    try {
      const res = await DeleteDesign(designId);
      if (res?.success) {
        const results = await getuserDesigns();
        setUserDesigns(results?.data || []);
      }
    } catch (error) {
      console.log("Error deleting design:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div
        className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        gap-4 "
      >
        {userDesigns && userDesigns.length > 0 ? (
          userDesigns.map((design) => (
            <div
              onClick={() => router.push(`/edit/${design?._id}`)}
              key={design._id || design.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-square w-full bg-gray-50/50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="pointer-events-none flex items-center justify-center w-full h-full transform scale-[0.6] sm:scale-75 md:scale-[0.8] origin-center transition-transform group-hover:scale-[0.85]">
                  {design?.canvasData && (
                    <DesignPreview
                      data={design?.canvasData}
                      key={design._id}
                      design={design}
                    />
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(e, design._id)}
                  className="absolute top-3 right-3 p-2 bg-white text-red-500 border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 z-10"
                  title="Delete Design"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-white">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {design.name || "Untitled Design"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Click to edit
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <p className="text-2xl font-semibold text-gray-700">
                No Designs Available
              </p>
              <p className="text-gray-500 mt-2">
                Start creating your first design
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecentDesigns;
