"use client";

import { LogOut } from "lucide-react";
import { Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { data: session } = useSession();

  async function handlelogout() {
    await signOut();
  }

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6  z-10 fixed top-0 right-0 left-[2px]">
        <div className="flex max-w-5xl mx-auto relative">
          <Search className="absolute top-1/2 left-3 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search your projects and canva's "
            className="pl-10 py-2 border  border-gray-200 bg-gray-50 focus-visible:ring-purple-500 rounded-lg  focus:ring-2 focus:outline-none text-base w-full"
          />
        </div>
        <div className="flex items-center gap-5 ml-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger aschild>
                <button className="flex items-center space-x-2 focus:outline-none ">
                  <Avatar>
                    <AvatarFallback>
                      {session?.user?.name?.[0] || "u"}
                    </AvatarFallback>
                    <AvatarImage
                      src={session?.user?.image || "https://lh3.googleusercontent.com/a/ACg8ocIcakLnVogfIilCb20UkyR2uV2Wm_tmFmYrB2BCJo6ypL4fLwm1=s96-c"}
                    />
                  </Avatar>
                  <span className="text-sm font-medium hidden lg:block">
                    {session?.user?.name || "user"}
                  </span>
                </button>
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
        </div>
      </header>
    </>
  );
};

export default Header;
