import { useState } from "react";

/**
 * Hook to generate a unique ID
 * @param prefix Optional prefix for the ID
 * @returns A unique ID string
 */
export const useUniqueId = (prefix: string = "id") => {
  const [id] = useState(() => {
    const randomPart = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString(36);
    return `${prefix}-${timestamp}-${randomPart}`;
  });
  
  return id;
};