import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
          <TabsList className="w-full grid grid-cols-4 mb-4 overflow-x-auto">
            <TabsTrigger value="base" className="px-2 md:px-4">Base</TabsTrigger>
            <TabsTrigger value="filling" className="px-2 md:px-4">Filling</TabsTrigger>
            <TabsTrigger value="frosting" className="px-2 md:px-4">Frosting</TabsTrigger>
            <TabsTrigger value="toppings" className="px-2 md:px-4">Toppings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="base" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose a base flavor</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseFlavors.map((base) => (
                <Tooltip key={base.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedBase.id === base.id ? "default" : "outline"}
                      className="h-auto py-2 px-3 justify-start items-center text-left w-full truncate"
                      onClick={() => onSelectBase(base)}
                    >
                      <div className="w-full flex items-center gap-2 truncate">
                        <div 
                          className="w-4 h-4 flex-shrink-0 rounded-full" 
                          style={{ backgroundColor: base.color }}
                        />
                        <span className="truncate">{base.name}</span>
                        {selectedBase.id === base.id && (
                          <Check className="ml-auto flex-shrink-0" size={16} />
                        )}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {base.description}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="filling" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose an optional filling</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fillingOptions.map((filling) => (
                <Tooltip key={filling.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={(selectedFilling && selectedFilling.id === filling.id) ? "default" : "outline"}
                      className="h-auto py-2 px-3 justify-start items-center text-left w-full truncate"
                      onClick={() => onSelectFilling(filling.id === 'none' ? null : filling)}
                    >
                      <div className="w-full flex items-center gap-2 truncate">
                        {filling.id !== 'none' && (
                          <div 
                            className="w-4 h-4 flex-shrink-0 rounded-full" 
                            style={{ backgroundColor: filling.color }}
                          />
                        )}
                        <span className="truncate">{filling.name}</span>
                        {(selectedFilling && selectedFilling.id === filling.id) || 
                         (!selectedFilling && filling.id === 'none') ? (
                          <Check className="ml-auto flex-shrink-0" size={16} />
                        ) : null}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {filling.description}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frosting" className="space-y-4">
            <h3 className="font-medium text-lg font-['Nunito']">Choose a frosting style</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {frostingOptions.map((frosting) => (
                <Tooltip key={frosting.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedFrosting.id === frosting.id ? "default" : "outline"}
                      className="h-auto py-2 px-3 justify-start items-center text-left w-full truncate"
                      onClick={() => onSelectFrosting(frosting)}
                    >
                      <div className="w-full flex items-center gap-2 truncate">
                        <div 
                          className="w-4 h-4 flex-shrink-0 rounded-full" 
                          style={{ backgroundColor: frosting.color }}
                        />
                        <span className="truncate">{frosting.name}</span>
                        {selectedFrosting.id === frosting.id && (
                          <Check className="ml-auto flex-shrink-0" size={16} />
                        )}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {frosting.description} ({frosting.style} style)
                  </TooltipContent>
                </Tooltip>
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
                  <Tooltip key={topping.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`h-auto py-2 px-3 justify-start items-center text-left w-full truncate ${isDisabled ? 'opacity-50' : ''}`}
                        onClick={() => isSelected ? onRemoveTopping(topping.id) : !isDisabled && onAddTopping(topping)}
                        disabled={isDisabled}
                      >
                        <div className="w-full flex items-center gap-2 truncate">
                          {topping.id !== 'sprinkles' ? (
                            <div 
                              className="w-4 h-4 flex-shrink-0 rounded-full" 
                              style={{ backgroundColor: topping.color === '#MULTIPLE' ? '#FF5A60' : topping.color }}
                            />
                          ) : (
                            <div className="w-4 h-4 flex-shrink-0 mr-2 flex">
                              <div className="w-1 h-4 bg-[#FF5A60]"></div>
                              <div className="w-1 h-4 bg-[#4A5AAD]"></div>
                              <div className="w-1 h-4 bg-[#FDE151]"></div>
                              <div className="w-1 h-4 bg-[#CCFFE5]"></div>
                            </div>
                          )}
                          <span className="truncate">{topping.name}</span>
                          {isSelected && (
                            <Check className="ml-auto flex-shrink-0" size={16} />
                          )}
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {topping.description}
                    </TooltipContent>
                  </Tooltip>
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