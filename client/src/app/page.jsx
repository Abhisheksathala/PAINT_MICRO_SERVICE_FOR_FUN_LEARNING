import React from "react";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import Sidebar from "../components/home/sidebar";
import DesignType from "@/components/home/DesignType";
import AiFeatures from "@/components/home/AiFeatures";
import RecentDesigns from "@/components/home/RecentDesigns";

const Home = () => {
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
    </div>
  );
};

export default Home;
