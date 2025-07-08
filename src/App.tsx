import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useKV } from '@github/spark/hooks';
import { CupcakeVisualization } from "@/components/CupcakeVisualization";
import { CupcakeSelector } from "@/components/CupcakeSelector";
import { CupcakeJson } from "@/components/CupcakeJson";
import { OrderForm } from "@/components/OrderForm";
import { OrderHistory } from "@/components/OrderHistory";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowClockwise } from "@phosphor-icons/react";
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

  // UI state
  const [activeTab, setActiveTab] = useState<string>("design");
  
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
  
  // Handle order submission
  const handleOrderSubmit = () => {
    // Reset the form and move back to design tab
    setActiveTab("design");
    
    // Optionally reset the cupcake design
    toast.success("Order submitted! Create a new cupcake design?", {
      action: {
        label: "Reset Design",
        onClick: () => {
          setCupcake({
            base: baseFlavors[0],
            filling: null,
            frosting: frostingOptions[0],
            toppings: [],
          });
        }
      }
    });
  };

  // Reset the cupcake design
  const handleReset = () => {
    setCupcake({
      base: baseFlavors[0],
      filling: null,
      frosting: frostingOptions[0],
      toppings: [],
    });
    toast.info("Cupcake design has been reset");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center font-['Nunito']">
      <div className="container px-4 py-10 max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold font-['Poppins'] text-primary">Yomco Custom Cupcake Creator</h1>
          </div>
          <p className="text-lg text-muted-foreground">Design your perfect cupcake and submit your order</p>
          <div className="flex justify-center mt-4 gap-2">
            <OrderHistory />
            <Button variant="outline" className="flex items-center gap-2" onClick={handleReset}>
              <ArrowClockwise size={18} />
              Reset Design
            </Button>
          </div>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="design">Design Cupcake</TabsTrigger>
            <TabsTrigger value="order">Submit Order</TabsTrigger>
          </TabsList>
          
          <TabsContent value="design" className="mt-0">
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
                
                <div className="w-full mt-6">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setActiveTab("order")}
                  >
                    Continue to Order
                  </Button>
                </div>
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
          </TabsContent>
          
          <TabsContent value="order" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="bg-card shadow-lg rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 font-['Poppins']">Order Summary</h2>
                  <div className="mb-6">
                    <div className="h-[200px] w-[200px] mx-auto">
                      <CupcakeVisualization cupcake={cupcake} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Base</p>
                        <p className="font-medium">{cupcake.base.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Filling</p>
                        <p className="font-medium">{cupcake.filling?.name || "None"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Frosting</p>
                        <p className="font-medium">{cupcake.frosting.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toppings</p>
                        <p className="font-medium">
                          {cupcake.toppings.length > 0 
                            ? cupcake.toppings.map(t => t.name).join(", ")
                            : "None"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("design")}
                    >
                      Back to Design
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <OrderForm cupcake={cupcake} onOrderSubmit={handleOrderSubmit} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="mt-auto py-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Yomco. All rights reserved.</p>
      </footer>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;