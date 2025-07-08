import { Cupcake, baseFlavors, fillingOptions, frostingOptions, toppingOptions } from "@/types/cupcake";
import { toast } from "sonner";

/**
 * Generate a shareable URL for a cupcake design
 * @param cupcake The cupcake design to share
 * @returns A URL that can be shared with others
 */
export const generateShareableUrl = (cupcake: Cupcake): string => {
  try {
    // Convert cupcake to minimal JSON representation
    const shareData = {
      b: cupcake.base.id, // base
      fl: cupcake.filling?.id || null, // filling
      fr: cupcake.frosting.id, // frosting
      t: cupcake.toppings.map(t => t.id) // toppings
    };
    
    // Convert to base64
    const encoded = btoa(JSON.stringify(shareData));
    
    // Create URL with query parameter
    const url = new URL(window.location.href);
    url.searchParams.set("design", encoded);
    
    return url.toString();
  } catch (error) {
    console.error("Error generating shareable URL:", error);
    return window.location.href;
  }
};

/**
 * Copy a shareable URL to the clipboard
 * @param cupcake The cupcake design to share
 */
export const copyShareableUrl = (cupcake: Cupcake): void => {
  try {
    const url = generateShareableUrl(cupcake);
    navigator.clipboard.writeText(url);
    toast.success("Shareable URL copied to clipboard!");
  } catch (error) {
    toast.error("Failed to copy shareable URL");
    console.error("Error copying shareable URL:", error);
  }
};

/**
 * Parse a cupcake design from URL parameters
 * @returns A cupcake object if the URL contains a valid design, null otherwise
 */
export const parseCupcakeFromUrl = (): Cupcake | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const designParam = urlParams.get("design");
    
    if (!designParam) return null;
    
    // Decode from base64
    const decoded = JSON.parse(atob(designParam));
    
    // Find the components based on IDs
    const base = baseFlavors.find(b => b.id === decoded.b);
    const filling = decoded.fl ? fillingOptions.find(f => f.id === decoded.fl) : null;
    const frosting = frostingOptions.find(f => f.id === decoded.fr);
    const toppings = decoded.t.map(id => toppingOptions.find(t => t.id === id)).filter(Boolean);
    
    if (!base || !frosting) return null;
    
    // Construct and return the cupcake
    return {
      base,
      filling,
      frosting,
      toppings
    };
  } catch (error) {
    console.error("Error parsing cupcake from URL:", error);
    return null;
  }
};