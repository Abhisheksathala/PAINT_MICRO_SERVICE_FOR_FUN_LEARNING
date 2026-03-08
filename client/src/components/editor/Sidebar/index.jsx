"use client";
import { Grid } from "lucide-react";
import React, { useState } from "react";
import ElementsPanels from "./panels/Elements";
import { Type } from "lucide-react";

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
      panel: () => ElementsPanels,
    },
  ];

  return (
    <div className="flex h-full">
      <div className="sidebar"></div>
    </div>
  );
};

export default Sidebar;
