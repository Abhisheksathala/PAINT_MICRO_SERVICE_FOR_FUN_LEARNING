"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/store";
import { Save } from "lucide-react";
import { LogOut } from "lucide-react";
import { Star } from "lucide-react";
import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ExportModal from "../Exports/Exports";
import { Download } from "lucide-react";

const Header = () => {
  const { isEditing, setIsEditing, name, setName, canvas } = useEditorStore();
  const { data: session } = useSession();
  const [showExportModal,setShowExportModal] = useState(false)

  async function handlelogout() {
    await signOut();
  }

  useEffect(() => {
    if (!canvas) return;
    // eslint-disable-next-line react-hooks/immutability
    canvas.selection = isEditing;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = isEditing;
      obj.evented = isEditing;
    });
  }, [isEditing]);

  return (
    <header className="header-gradient header flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild="true">
            <button className="header-button flex items-center text-white">
              <span>{isEditing ? "editing" : "viewing"}</span>
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editing</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Viewing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="header-button relative">
          <Save className="w-5 h-5" />
        </button>
        <button className="header-button relative">
          <Download className="w-5 h-5" onClick={()=>setShowExportModal(true)}/>
        </button>
      </div>

      <div className="flex-1 flex border justify-center max-w-md rounded-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-2 py-1"
        />
      </div>
      <div className="flex items-center space-x-3">
        <button className="upgrade-button flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-9 px-3">
          <Star className="mr-1 h-4 w-4 text-yellow-400" />
          <span>Upgrade Your plane</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger aschild>
            <Button className="flex items-center space-x-2 focus:outline-none ">
              <Avatar>
                <AvatarFallback>
                  {session?.user?.name?.[0] || "u"}
                </AvatarFallback>
                <AvatarImage
                  src={
                    session?.user?.image ||
                    "https://lh3.googleusercontent.com/a/ACg8ocIcakLnVogfIilCb20UkyR2uV2Wm_tmFmYrB2BCJo6ypL4fLwm1=s96-c"
                  }
                />
              </Avatar>
              {/* <span className="text-sm font-medium hidden lg:block">
                {session?.user?.name || "user"}
              </span> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={"w-56"}>
            <DropdownMenuItem
              onClick={handlelogout}
              className={"cursor-pointer"}
            >
              <LogOut className="mr-2 w-4 h-4" />
              <span className="font-bold">Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ExportModal isOpen={showExportModal} onClose={setShowExportModal} />
    </header>
  );
};

export default Header;
