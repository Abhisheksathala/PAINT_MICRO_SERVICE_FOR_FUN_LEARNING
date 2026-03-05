"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Home } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SaveDesign } from "@/services/DesignService";

const Sidebar = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateNewDesign = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const initialDesignData = {
        name: "untitled - yt tumbnail",
        canvasData: null,
        width: 825,
        height: 465,
        category: "youtube",
      };
      const newDesign = await SaveDesign(initialDesignData);

      if (newDesign?.success) {
        router.push(`/edit/${newDesign?.data?._id}`);
        setLoading(false);
      } else {
        throw new Error("error at creating desgin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="min-w-18 bg-[#f8f8fc] border-r border-gray-200 flex flex-col items-center py-4 fixed left-0 top-0 z-20 h-full">
      <div className="flex flex-col items-center cursor-pointer">
        <button
          onClick={handleCreateNewDesign}
          className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 
        transition-colors pointer-coarse:transition-colors  cursor-pointer "
        >
          <Plus className="w-6 h-6" />
        </button>
        <div className="text-xs font-medium text-center mt-11 text-gray-700">
          Create
        </div>
      </div>
      <nav className="mt-8 flex flex-col items-center space-y-6 w-full">
        {[
          {
            icon: <Home className="w-6 h-6" />,
            lable: "Home",
            active: true,
          },
          {
            icon: <FolderOpen className="w-6 h-6" />,
            lable: "Projects",
            active: false,
          },
          {
            icon: <CreditCard className="w-6 h-6" />,
            lable: "Billing",
            active: false,
          },
        ].map((Menuitems, index) => {
          return (
            <div key={index} className="flex flex-col items-center w-full">
              <Link
                href={"#"}
                className="w-full flex flex-col items-center py-2 text-gray-600 hover:text-purple-600"
              >
                <div className="relative">{Menuitems.icon}</div>
                <span>{Menuitems.lable}</span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
