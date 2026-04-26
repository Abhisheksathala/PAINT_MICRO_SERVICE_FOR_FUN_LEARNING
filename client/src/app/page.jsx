'use client'

import { useEffect } from "react";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import Sidebar from "../components/home/sidebar";
import DesignType from "@/components/home/DesignType";
import AiFeatures from "@/components/home/AiFeatures";
import RecentDesigns from "@/components/home/RecentDesigns";
import { useEditorStore } from "@/store/store";
import { getSubscription } from "@/services/Subscribtionservice";
import { getuserDesigns } from "@/services/DesignService";
import SubscriptionModal from "@/components/subscribtion/Premium-model";
const Home = () => {

  const {setUserSubscription,setUserDesigns,showPremiumModel,setShowPremiumModel} = useEditorStore()

  
  const featchsubscription=async()=>{
   const response  = await getSubscription()
   console.log("subscription response",response);
   if (response?.success){
    setUserSubscription(response?.data)
   }
  }

 async function FeatchuserDesigns() {
    const results = await getuserDesigns();
    setUserDesigns(results.data);
  }

  useEffect(() => {
    FeatchuserDesigns();
    featchsubscription();
  }, []);
  

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-18">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />
          <DesignType />
          <AiFeatures />
          <RecentDesigns />
        </main>
      </div>
      <SubscriptionModal isopen={showPremiumModel} onClose={()=>setShowPremiumModel(false)} />
    </div>
  );
};

export default Home;
