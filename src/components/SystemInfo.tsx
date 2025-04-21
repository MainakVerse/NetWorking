"use client";

import React, { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

const SystemInfo = () => {
  const [connectionType, setConnectionType] = useState<string>("Detecting...");
  const [osInfo, setOsInfo] = useState<string>("Detecting...");
  const [browserInfo, setBrowserInfo] = useState<string>("Detecting...");

  useEffect(() => {
    // Detect Connection Type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection?.effectiveType) {
      setConnectionType(connection.effectiveType);
    } else {
      setConnectionType("Not supported by this browser");
    }

    // Detect OS & Browser
    const parser = new UAParser();
    const result = parser.getResult();
    console.log("UAParser result:", result);

    const os = `${result.os.name ?? "Unknown OS"} ${result.os.version ?? ""}`;
    const browser = `${result.browser.name ?? "Unknown Browser"} ${result.browser.version ?? ""}`;
    setOsInfo(os);
    setBrowserInfo(browser);
  }, []);

  return (
    <div className="p-4 text-green-300 rounded shadow">
      <h2 className="text-lg font-bold mb-2">System Info</h2>
      <p><strong>Connection Type:</strong> {connectionType}</p>
      <p><strong>Operating System:</strong> {osInfo}</p>
      <p><strong>Browser:</strong> {browserInfo}</p>
    </div>
  );
};

export default SystemInfo;
