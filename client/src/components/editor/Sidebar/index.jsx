"use client";
import { Grid } from "lucide-react";
import React, { useState } from "react";
import ElementsPanels from "./panels/Elements";
import { Type } from "lucide-react";
import Textpannel from "./panels/Text";
import Drawpannel from "./panels/Draw";
import Settingspannel from "./panels/Settings";
import Aipannel from "./panels/Ai";
import { Pencil } from "lucide-react";
import { Settings } from "lucide-react";
import { Sparkle } from "lucide-react";
import { Upload } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { ChevronsLeft } from "lucide-react";
import Uploadpannel from "./panels/Upload";

const Sidebar = () => {
  const [isPanelCollapsed, setIspannelcollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const handleItemClick = (id) => {
    if (id === activeSidebar && !isPanelCollapsed) return;
    setActiveSidebar(id);
    setIspannelcollapsed(false);
  };

  const closeSecondaryPanel = (e) => {
    setActiveSidebar(null);
  };

  const togglepanelCollapse = (e) => {
    e.stopPropagation();
    setIspannelcollapsed(!isPanelCollapsed);
  };

  const sidebarItems = [
    {
      id: "elements",
      icons: Grid,
      labal: "Elements",
      panel: () => <ElementsPanels/>,
    },
    {
      id: "text",
      icons: Type,
      labal: "Text",
      panel: () => <Textpannel/>,
    },
    {
      id: "Uploads",
      icons: Upload,
      labal: "Upload",
      panel: () => <Uploadpannel/>,
    },
    {
      id: "Draw",
      icons: Pencil,
      labal: "Draw",
      panel: () => <Drawpannel/>,
    },
    {
      id: "settings",
      icons: Settings,
      labal: "settings",
      panel: () => <Settingspannel/>,
    },
    {
      id: "Ai",
      icons: Sparkle,
      labal: "Ai",
      panel: () => <Aipannel/>,
    },
  ];

  const activeItem = sidebarItems.find((items) => items.id === activeSidebar);

  return (
    <div className="flex h-full">
      <aside className="sidebar">
        {sidebarItems.map((items, index) => {
          const { id, labal, panel } = items;
          return (
            <div
              onClick={() => {
                handleItemClick(id);
              }}
              className={`sidebar-item ${activeSidebar === id ? "active" : ""}`}
              key={index || id}
            >
              <items.icons className="h-5 w-5 sidebar-item-icon" />
              <span className="sidebaritem-lable">{labal}</span>
            </div>
          );
        })}
      </aside>

      {activeSidebar && (
        <div
          className={`secondary-panel ${isPanelCollapsed ? "collapse" : ""}`}

          style={{
            width:`${isPanelCollapsed ? '0' : '350px'}`,
            opacity:`${isPanelCollapsed ? 0 : 1}`,
            overflow:`${isPanelCollapsed ? 'hidden' : 'visible'}`
          }}
        >
          <div className="panel-header">
            <button className="back-button" onClick={closeSecondaryPanel}>
              <ArrowLeft />
            </button>
            <span className="panel-title">{activeItem.labal}</span>
          </div>
          <div className="panel-content">
            {activeItem.panel()}
            </div>
          <button className="collapse-button" onClick={togglepanelCollapse}>
            <ChevronsLeft className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
