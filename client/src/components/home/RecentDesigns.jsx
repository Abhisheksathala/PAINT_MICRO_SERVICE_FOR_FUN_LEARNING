"use client";

import React from "react";
import Image from "next/image";
import { getuserDesigns } from "@/services/DesignService";
import { useRouter } from "next/navigation";
function RecentDesigns() {
  const [userDesigns, setUserDesigns] = React.useState([]);

    const router = useRouter();
  // const designs = Array(6)
  //   .fill(null)
  //   .map((_, i) => ({
  //     id: i,
  //     title: `Design ${i + 1}`,
  //     image: `https://picsum.photos/400/300?random=${i}`,
  //   }));

  async function FeatchuserDesigns() {
    const results = await getuserDesigns();
    setUserDesigns(results.data);
  }

  React.useEffect(() => {
    FeatchuserDesigns();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div
        className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-4 "
      >
        {userDesigns && userDesigns.length > 0 ? (
          userDesigns.map((design) => (
            <div onClick={()=>router.push(`/edit/${design?._id}`)} key={design.id}>
              <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md cursor-pointer">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-full object-cover"
                />
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
