"use client";

import { useState, useEffect } from "react";

export function useNetworkQuality() {
  const [isHighSpeed, setIsHighSpeed] = useState(true); // Default to true for SSR/Safari

  useEffect(() => {
    if (typeof window !== "undefined" && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      
      const updateNetworkStatus = () => {
        // connection.effectiveType can be 'slow-2g', '2g', '3g', or '4g'
        // connection.saveData is a boolean
        if (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
          setIsHighSpeed(false);
        } else {
          setIsHighSpeed(true);
        }
      };

      updateNetworkStatus();
      
      conn.addEventListener('change', updateNetworkStatus);
      return () => conn.removeEventListener('change', updateNetworkStatus);
    }
  }, []);

  return isHighSpeed;
}
