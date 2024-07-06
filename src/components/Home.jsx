import React from 'react';
import Header from './Header/Header';
import SideMenu from "./SideMenu/SideMenu"
import Videos from './Videos/Videos';
import { useState } from 'react';
import VideoPage from './Videos/VideoPage';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu isOpen={sidebarOpen} />
        <main className="flex-1 bg-black p-4 relative z-0">
          <Videos/>
        </main>
      </div>
    </div>
  );
};

export default Home;
