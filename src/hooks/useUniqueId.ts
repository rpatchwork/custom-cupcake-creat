import { useState } from "react";

/**
 * Hook to generate a unique ID
 * @param prefix Optional prefix for the ID
 * @returns A function that generates a unique ID string
 */
export const useUniqueId = (prefix: string = "id") => {
  const generateId = () => {
    const randomPart = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString(36);
    return `${prefix}-${timestamp}-${randomPart}`;
  };
  
  // Generate the initial ID
  const [initialId] = useState(generateId);
  
  // Return both the initial ID and the generator function
  return (generateNew?: boolean) => {
    return generateNew ? generateId() : initialId;
  };
};