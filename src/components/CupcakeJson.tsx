import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowCircleDown, Check, Copy } from "@phosphor-icons/react";
import { Cupcake } from "@/types/cupcake";
import { useJsonDownload } from "@/hooks/useJsonDownload";
import { ShareCupcake } from "./ShareCupcake";

interface CupcakeJsonProps {
  cupcake: Cupcake;
}

export function CupcakeJson({ cupcake }: CupcakeJsonProps) {
  const [showJson, setShowJson] = useState(false);
  const { downloadJson, copyJsonToClipboard } = useJsonDownload();
  
  // Create a clean version of the cupcake data for JSON export
  const exportData = {
    base: {
      flavor: cupcake.base.name,
      color: cupcake.base.color
    },
    filling: cupcake.filling ? {
      type: cupcake.filling.name,
      color: cupcake.filling.color
    } : null,
    frosting: {
      flavor: cupcake.frosting.name,
      style: cupcake.frosting.style,
      color: cupcake.frosting.color
    },
    toppings: cupcake.toppings.map(topping => ({
      type: topping.name,
      color: topping.color
    }))
  };
  
  const jsonString = JSON.stringify(exportData, null, 2);
  
  const copyToClipboard = () => {
    copyJsonToClipboard(exportData);
  };
  
  const handleDownload = () => {
    downloadJson(exportData, "my-custom-cupcake.json");
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-xl font-['Poppins'] flex items-center">
          <span>Cupcake Specification</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto" 
            onClick={() => setShowJson(!showJson)}
          >
            {showJson ? <Check size={20} /> : <ArrowCircleDown size={20} />}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {showJson && (
        <CardContent>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-[300px] font-mono">
            {jsonString}
          </pre>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <ShareCupcake cupcake={cupcake} />
        <Button 
          variant="outline" 
          onClick={copyToClipboard}
          className="flex items-center gap-1"
        >
          <Copy size={18} />
          Copy JSON
        </Button>
        <Button 
          onClick={handleDownload}
          className="flex items-center gap-1"
        >
          <ArrowCircleDown size={18} />
          Download JSON
        </Button>
      </CardFooter>
    </Card>
  );
}