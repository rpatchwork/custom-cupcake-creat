import { toast } from "sonner";

export const useJsonDownload = () => {
  /**
   * Download data as a JSON file
   * @param data The data to download as JSON
   * @param fileName The name of the file to download
   */
  const downloadJson = (data: any, fileName: string = "data.json") => {
    try {
      // Create a formatted JSON string
      const jsonString = JSON.stringify(data, null, 2);
      
      // Create a blob with the JSON data
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary download link
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("JSON file downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download JSON file");
      console.error("Error downloading JSON:", error);
    }
  };

  /**
   * Copy JSON data to clipboard
   * @param data The data to copy as JSON
   */
  const copyJsonToClipboard = (data: any) => {
    try {
      // Create a formatted JSON string
      const jsonString = JSON.stringify(data, null, 2);
      
      // Copy to clipboard
      navigator.clipboard.writeText(jsonString);
      toast.success("JSON copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy JSON to clipboard");
      console.error("Error copying JSON:", error);
    }
  };

  return { downloadJson, copyJsonToClipboard };
};