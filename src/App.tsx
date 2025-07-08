import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { useKV } from '@github/spark/hooks';
import { CupcakeVisualization } from "@/components/CupcakeVisualization";
import { CupcakeSelector } from "@/components/CupcakeSelector";
import { CupcakeJson } from "@/components/CupcakeJson";
import { baseFlavors, frostingOptions, Cupcake } from "@/types/cupcake";
import { parseCupcakeFromUrl } from "@/lib/share-utils";

function App() {
  // Persistent cupcake state using useKV
  const [cupcake, setCupcake] = useKV<Cupcake>("custom-cupcake", {
    base: baseFlavors[0],
    filling: null,
    frosting: frostingOptions[0],
    toppings: [],
  });
  
  // Check for shared design in URL on initial load
  useEffect(() => {
    const sharedCupcake = parseCupcakeFromUrl();
    if (sharedCupcake) {
      setCupcake(sharedCupcake);
      // Remove the design parameter from the URL to prevent reapplying on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete("design");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);
  
  // Handle base selection
  const handleBaseSelect = (base) => {
    setCupcake(currentCupcake => ({
      ...currentCupcake,
      base
    }));
  };
  
  // Handle filling selection
  const handleFillingSelect = (filling) => {
    setCupcake(currentCupcake => ({
      ...currentCupcake,
      filling
    }));
  };
  
  // Handle frosting selection
  const handleFrostingSelect = (frosting) => {
    setCupcake(currentCupcake => ({
      ...currentCupcake,
      frosting
    }));
  };
  
  // Handle adding a topping
  const handleAddTopping = (topping) => {
    if (cupcake.toppings.length < 3) {
      setCupcake(currentCupcake => ({
        ...currentCupcake,
        toppings: [...currentCupcake.toppings, topping]
      }));
    }
  };
  
  // Handle removing a topping
  const handleRemoveTopping = (toppingId) => {
    setCupcake(currentCupcake => ({
      ...currentCupcake,
      toppings: currentCupcake.toppings.filter(t => t.id !== toppingId)
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center font-['Nunito']">
      <div className="container px-4 py-10 max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 font-['Poppins'] text-primary">Custom Cupcake Creator</h1>
          <p className="text-lg text-muted-foreground">Design your perfect cupcake and export the recipe as JSON</p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
          {/* Left side: Visualization */}
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="bg-card shadow-lg rounded-lg p-6 mb-6 w-full flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-8 font-['Poppins']">Your Cupcake Creation</h2>
              <div className="h-[250px] w-[250px] flex items-center justify-center">
                <CupcakeVisualization cupcake={cupcake} />
              </div>
            </div>
            
            <CupcakeJson cupcake={cupcake} />
          </div>
          
          {/* Right side: Customization options */}
          <div className="w-full">
            <CupcakeSelector 
              selectedBase={cupcake.base}
              selectedFilling={cupcake.filling}
              selectedFrosting={cupcake.frosting}
              selectedToppings={cupcake.toppings}
              onSelectBase={handleBaseSelect}
              onSelectFilling={handleFillingSelect}
              onSelectFrosting={handleFrostingSelect}
              onAddTopping={handleAddTopping}
              onRemoveTopping={handleRemoveTopping}
            />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;