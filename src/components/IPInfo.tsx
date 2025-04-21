'use client';

import React, { useEffect, useState } from 'react';

interface IpInfo {
  ip: string;
  type: string;
  timezone: string;
  isp: string;
  isVpn: boolean;
  browser: string;
  packetInfo: {
    downlink: number;
    effectiveType: string;
    rtt: number;
  };
}

const getBrowserInfo = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Google Chrome";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edg")) return "Microsoft Edge";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
};

const getPacketTransferInfo = () => {
  const connection = (navigator as any).connection || {};
  return {
    downlink: connection.downlink || 0,
    effectiveType: connection.effectiveType || 'unknown',
    rtt: connection.rtt || 0,
  };
};

const IpInfoComponent: React.FC = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('https://api.ipregistry.co/?key=tryout');
        const data = await res.json();

        const ip = data.ip;
        const type = data.version === '6' ? 'IPv6' : 'IPv4';
        const timezone = data.time_zone?.id || 'Unknown';
        const isp = data.connection?.organization || 'Unknown';
        const isVpn = data.security?.is_vpn || false;
        const browser = getBrowserInfo();
        const packetInfo = getPacketTransferInfo();

        setIpInfo({ ip, type, timezone, isp, isVpn, browser, packetInfo });
      } catch (err) {
        console.error('Failed to fetch IP info:', err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="p-4 rounded text-green-300 shadow-md gap-4">
      {ipInfo ? (
        <>
          <p><strong>Public IP:</strong> {ipInfo.ip}</p>
          <p><strong>IP Type:</strong> {ipInfo.type}</p>
          <p><strong>Timezone:</strong> {ipInfo.timezone}</p>
          <p><strong>ISP:</strong> {ipInfo.isp}</p>
          <p><strong>VPN Detected:</strong> {ipInfo.isVpn ? 'Yes' : 'No'}</p>
          <p><strong>Web Browser:</strong> {ipInfo.browser}</p>
          <hr className="my-2 border-green-400" />
          <p><strong>Packet Transfer Info:</strong></p>
          <p>- Average Speed: {ipInfo.packetInfo.downlink} Mbps</p>
          <p>- Effective Connection Type: {ipInfo.packetInfo.effectiveType}</p>
          <p>- Round Trip Time: {ipInfo.packetInfo.rtt} ms</p>
        </>
      ) : (
        <p>Fetching IP info...</p>
      )}
    </div>
  );
};

export default IpInfoComponent;
