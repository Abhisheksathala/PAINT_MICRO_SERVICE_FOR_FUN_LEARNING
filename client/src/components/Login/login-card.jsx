"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8  mx-4 transation-all duration-500 ease-in-out px-12">
      <div className="space-y-8 ">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">JUMP BACK</h3>
          <p className="text-gray-600 mt-2"> sign in to canvas</p>
          <Button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            variant="outline"
            className={`w-full items-center gap-3 py-6 justify-center text-gray-700 board-gray-300 hover:border-[#8b3dff] trasnsation-all duration-300 group transform hover:scale-[1.01] active:scale-[0.99] mt-6`}
          >
            <div className="b-white rounded-full p-1 fle items-center justify-center group-hover:bg-[#8b3dff] transition-colors duration-300">
              <LogIn className="w-5 group-hover:text-[#8b3dff] transition-colors duration-300" />
            </div>
            <span className="font-bold">Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
