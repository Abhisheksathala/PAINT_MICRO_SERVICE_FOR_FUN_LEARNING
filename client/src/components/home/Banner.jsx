"use client";

import { Crown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SaveDesign } from "@/services/DesignService";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { getSubscription } from "@/services/Subscribtionservice";
import { useEditorStore } from "@/store/store";
import { toast } from "sonner";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const {setUserSubscription,userSubscription,userDesigns} = useEditorStore()

  const router = useRouter();

  const handleCreateNewDesign = async () => {
    if(userDesigns?.length >= 5 && !userSubscription.isPremium){
      toast.error('Upgrade to premium to create more designs',{
        description:"you have reached the maximum number of designs.Please upgrade to a premium plan to create more designs.",
        action:(
          <Button onClick={()=>router.push('/subscription')} className="bg-green-600 hover:bg-green-700 text-white">
            Upgrade to premium
          </Button>
        ),
        duration: 5000,
      })
      return 
    }
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
        setLoading(false)
      }else{
        throw new Error("error at creating desgin")
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const featchsubscription=async()=>{
     const response  = await getSubscription() 
     if (response?.success){
      setUserSubscription(response?.data)
     }
    }
    useEffect(()=>{
      featchsubscription();
    },[])


  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-8 md:p-8 text-center">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2 sm:mb-4">
        <Crown className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 text-yellow-300 leading-tight" />
        <span className="sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
          Create Innovative Designs
        </span>
      </div>
      <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto">
        Design eye-catching Designs thumbnails that more views
      </h2>
      <Button
        onClick={handleCreateNewDesign}
        className={
          "text-[#8b3dff] bg-white hover:bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5"
        }
      >
        {
          loading ? <Loader /> : ""
        }
        Start Desiging
      </Button>
    </div>
  );
};

export default Banner;
