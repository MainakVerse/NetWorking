'use client'
import React from 'react';
import IpInfoComponent from './IPInfo';
import SystemInfo from './SystemInfo';
import NetworkSpeedGauge from './NetSpeedShow';
import WebsiteVisitsChart from './WebRTC';

interface BentoGridProps {
  className?: string;
}

const Profile: React.FC<BentoGridProps> = ({ className }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto mt-16 mb-8 p-4 ${className || ''}`}>
      <div className="grid grid-cols-12 gap-4">
        {/* Left section */}
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-4">
          {/* IP Box */}
          <div className="relative border-2 border-gray-300 rounded-md min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] overflow-hidden">
            <h2 className='text-green-400 text-center text-lg pt-4'>Network Information</h2>
            <IpInfoComponent />
          </div>

          {/* System Info Box */}
          <div className="relative border-2 border-gray-300 rounded-md min-h-[8rem] sm:min-h-[10rem] md:min-h-[10rem] overflow-hidden">
          <h2 className='text-green-400 text-center text-lg pt-4'>System Information</h2>
            <SystemInfo />
          </div>
        </div>

        {/* Main content area */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-12 gap-4">
          {/* Net Speed */}
          <div className="relative col-span-12 md:col-span-8 border-2 border-gray-300 rounded-md min-h-[20rem] sm:min-h-[24rem] md:min-h-full overflow-hidden">
          <h2 className='text-green-400 text-center text-lg p-4'>Network Speed Test</h2>
            <NetworkSpeedGauge />
          </div>

          {/* WebRTC Box */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-4">
            <div className="relative border-2 border-gray-300 rounded-md min-h-[6rem] sm:min-h-[8rem] md:min-h-[24rem] overflow-hidden">
            <h2 className='text-green-400 text-center text-lg pt-4'>Most Visited Sites</h2>
              <WebsiteVisitsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
