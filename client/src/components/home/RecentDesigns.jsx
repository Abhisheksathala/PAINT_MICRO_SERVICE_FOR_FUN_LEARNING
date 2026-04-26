"use client";

import React from "react";
import Image from "next/image";
import { getuserDesigns } from "@/services/DesignService";
import { useRouter } from "next/navigation";
import DesignPreview from "./design-preview";
import { useEditorStore } from "@/store/store";
function RecentDesigns() {
 

  const {userDesigns} = useEditorStore()

  const router = useRouter();
  // const designs = Array(6)
  //   .fill(null)
  //   .map((_, i) => ({
  //     id: i,
  //     title: `Design ${i + 1}`,
  //     image: `https://picsum.photos/400/300?random=${i}`,
  //   }));



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
              key={design.id}
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md cursor-pointer">
                <div className="w-[300px] h-[400px] rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md cursor-pointer">
                  {design?.canvasData && (
                    <DesignPreview
                      data={design?.canvasData}
                      key={design._id}
                      design={design}
                    />
                  )}
                </div>
              </div>
              <p className="font-bold text-sm">{design.name}</p>
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
