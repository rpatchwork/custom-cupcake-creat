import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";
import { 
  CupcakeBase, 
  CupcakeFilling, 
  CupcakeFrosting, 
  CupcakeTopping,
  baseFlavors,
  fillingOptions,
  frostingOptions,
  toppingOptions
} from "@/types/cupcake";

interface CupcakeSelectorProps {
  selectedBase: CupcakeBase;
  selectedFilling: CupcakeFilling | null;
  selectedFrosting: CupcakeFrosting;
  selectedToppings: CupcakeTopping[];
  onSelectBase: (base: CupcakeBase) => void;
  onSelectFilling: (filling: CupcakeFilling | null) => void;
  onSelectFrosting: (frosting: CupcakeFrosting) => void;
  onAddTopping: (topping: CupcakeTopping) => void;
  onRemoveTopping: (toppingId: string) => void;
}

export function CupcakeSelector({
  selectedBase,
  selectedFilling,
  selectedFrosting,
  selectedToppings,
  onSelectBase,
  onSelectFilling,
  onSelectFrosting,
  onAddTopping,
  onRemoveTopping
}: CupcakeSelectorProps) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center font-['Poppins']">Customize Your Cupcake</CardTitle>
        <CardDescription className="text-center font-['Nunito']">Select each component to create your perfect cupcake</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="base">Base</TabsTrigger>
            <TabsTrigger value="filling">Filling</TabsTrigger>
            <TabsTrigger value="frosting">Frosting</TabsTrigger>
            <TabsTrigger value="toppings">Toppings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="base" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose a base flavor</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseFlavors.map((base) => (
                <Button
                  key={base.id}
                  variant={selectedBase.id === base.id ? "default" : "outline"}
                  className="h-auto py-2 justify-start flex-col items-start text-left"
                  onClick={() => onSelectBase(base)}
                >
                  <div className="w-full flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: base.color }}
                    />
                    <span>{base.name}</span>
                    {selectedBase.id === base.id && (
                      <Check className="ml-auto" size={16} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-normal">
                    {base.description}
                  </p>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="filling" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose an optional filling</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fillingOptions.map((filling) => (
                <Button
                  key={filling.id}
                  variant={(selectedFilling && selectedFilling.id === filling.id) ? "default" : "outline"}
                  className="h-auto py-2 justify-start flex-col items-start text-left"
                  onClick={() => onSelectFilling(filling.id === 'none' ? null : filling)}
                >
                  <div className="w-full flex items-center">
                    {filling.id !== 'none' && (
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: filling.color }}
                      />
                    )}
                    <span>{filling.name}</span>
                    {(selectedFilling && selectedFilling.id === filling.id) || 
                     (!selectedFilling && filling.id === 'none') ? (
                      <Check className="ml-auto" size={16} />
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-normal">
                    {filling.description}
                  </p>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frosting" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose a frosting style</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {frostingOptions.map((frosting) => (
                <Button
                  key={frosting.id}
                  variant={selectedFrosting.id === frosting.id ? "default" : "outline"}
                  className="h-auto py-2 justify-start flex-col items-start text-left"
                  onClick={() => onSelectFrosting(frosting)}
                >
                  <div className="w-full flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: frosting.color }}
                    />
                    <span>{frosting.name}</span>
                    {selectedFrosting.id === frosting.id && (
                      <Check className="ml-auto" size={16} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-normal">
                    {frosting.description} ({frosting.style} style)
                  </p>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="toppings" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Add toppings (up to 3)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {toppingOptions.map((topping) => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                const isDisabled = selectedToppings.length >= 3 && !isSelected;
                
                return (
                  <Button
                    key={topping.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto py-2 justify-start flex-col items-start text-left ${isDisabled ? 'opacity-50' : ''}`}
                    onClick={() => isSelected ? onRemoveTopping(topping.id) : !isDisabled && onAddTopping(topping)}
                    disabled={isDisabled}
                  >
                    <div className="w-full flex items-center">
                      {topping.id !== 'sprinkles' ? (
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: topping.color === '#MULTIPLE' ? 'linear-gradient(to right, #FF5A60, #4A5AAD, #FDE151, #CCFFE5)' : topping.color }}
                        />
                      ) : (
                        <div className="w-4 h-4 mr-2 flex">
                          <div className="w-1 h-4 bg-[#FF5A60]"></div>
                          <div className="w-1 h-4 bg-[#4A5AAD]"></div>
                          <div className="w-1 h-4 bg-[#FDE151]"></div>
                          <div className="w-1 h-4 bg-[#CCFFE5]"></div>
                        </div>
                      )}
                      <span>{topping.name}</span>
                      {isSelected && (
                        <Check className="ml-auto" size={16} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-normal">
                      {topping.description}
                    </p>
                  </Button>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-2">
              {selectedToppings.length} of 3 toppings selected
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}