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
        <main className="flex-1 p-6 overflow-y-auto pt-20 flex flex-col min-h-screen">
          <div className="flex-1 space-y-8">
            <Banner />
            <DesignType />
            <AiFeatures />
            <RecentDesigns />
          </div>

          {/* Assignment Footer */}
          <footer className="mt-12 py-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-semibold text-gray-700">Developed by Abhishek Sathala</p>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com/Abhisheksathala/PAINT_MICRO_SERVICE_FOR_FUN_LEARNING" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  <span>GitHub</span>
                </a>
                <span className="text-gray-300">|</span>
                <a 
                  href="https://www.linkedin.com/in/abhishek-sathala/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-2">House of Edtech Fullstack Developer Assignment</p>
            </div>
          </footer>
        </main>
      </div>
      <SubscriptionModal isopen={showPremiumModel} onClose={()=>setShowPremiumModel(false)} />
    </div>
  );
};

export default Home;
