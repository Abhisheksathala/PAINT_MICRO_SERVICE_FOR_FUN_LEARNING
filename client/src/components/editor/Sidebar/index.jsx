"use client";
import { Grid } from "lucide-react";
import React, { useState } from "react";
import ElementsPanels from "./panels/Elements";
import { Type } from "lucide-react";
import Textpannel from "./panels/Text";

const Sidebar = () => {
  const [isPanelCollapsed, setIspannelcollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const sidebarItems = [
    {
      id: "elements",
      icons: Grid,
      labal: "Elements",
      panel: () => ElementsPanels,
    },
    {
      id: "text",
      icons: Type,
      labal: "Text",
      panel: () => Textpannel,
    },

  ];

  return (
    <div className="flex h-full">
      <div className="sidebar">
        {
          sidebarItems.map((items,index)=>{
            return(
              <>
              <div className="" key={index}></div>
              </>
            )
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;
