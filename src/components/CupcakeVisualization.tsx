import React from "react";
import { cn } from "@/lib/utils";
import { Cupcake, FrostingStyle } from "@/types/cupcake";

interface CupcakeVisualizationProps {
  cupcake: Cupcake;
}

export function CupcakeVisualization({ cupcake }: CupcakeVisualizationProps) {
  // Rendering logic for frosting based on style
  const renderFrosting = (style: FrostingStyle, color: string) => {
    switch (style) {
      case "swirl":
        return (
          <div
            className="absolute w-[120px] h-[80px] -top-[40px] left-1/2 -translate-x-1/2 cupcake-frosting"
            style={{ 
              background: color,
              borderRadius: "60px 60px 10px 10px",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 75% 30%, 50% 0%, 25% 30%, 0% 0%)" 
            }}
          ></div>
        );
      case "smooth":
        return (
          <div
            className="absolute w-[110px] h-[50px] -top-[30px] left-1/2 -translate-x-1/2 cupcake-frosting"
            style={{ 
              background: color,
              borderRadius: "55px 55px 0 0",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)" 
            }}
          ></div>
        );
      case "textured":
        return (
          <div className="absolute w-[120px] h-[60px] -top-[40px] left-1/2 -translate-x-1/2 flex justify-center cupcake-frosting">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-[20px] h-[60px] mx-[2px]"
                style={{ 
                  background: color,
                  borderRadius: "10px 10px 0 0" 
                }}
              ></div>
            ))}
          </div>
        );
      case "drizzle":
        return (
          <>
            <div
              className="absolute w-[100px] h-[30px] -top-[20px] left-1/2 -translate-x-1/2 cupcake-frosting"
              style={{ 
                background: color,
                borderRadius: "50px 50px 5px 5px" 
              }}
            ></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[8px] h-[30px] -top-[10px] cupcake-frosting"
                style={{ 
                  background: color,
                  borderRadius: "4px",
                  left: `${40 + i * 12}px`,
                  transform: `rotate(${i % 2 ? 10 : -10}deg)`,
                  transformOrigin: "bottom center" 
                }}
              ></div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  // Render toppings
  const renderToppings = () => {
    return cupcake.toppings.map((topping, index) => {
      // Different topping visualizations based on the topping type
      if (topping.id === 'sprinkles') {
        return (
          <div key={index} className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[90px] h-[40px] pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[5px] h-[2px] rounded-full cupcake-topping"
                style={{
                  background: ['#FF5A60', '#4A5AAD', '#FDE151', '#CCFFE5', '#FFF59A'][i % 5],
                  left: `${Math.random() * 90}px`,
                  top: `${Math.random() * 40}px`,
                  transform: `rotate(${Math.random() * 180}deg)`,
                }}
              ></div>
            ))}
          </div>
        );
      } else if (topping.id === 'chocolate-chips') {
        return (
          <div key={index} className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[90px] h-[40px] pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[6px] h-[6px] rounded-full cupcake-topping"
                style={{
                  background: topping.color,
                  left: `${Math.random() * 90}px`,
                  top: `${Math.random() * 40}px`,
                }}
              ></div>
            ))}
          </div>
        );
      } else if (topping.id === 'cherry') {
        return (
          <div 
            key={index} 
            className="absolute w-[15px] h-[15px] -top-[45px] left-1/2 -translate-x-1/2 cupcake-topping"
            style={{ 
              background: topping.color,
              borderRadius: '50%',
              boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
            }}
          ></div>
        );
      } else if (topping.id === 'strawberry') {
        return (
          <div 
            key={index} 
            className="absolute -top-[50px] left-1/2 -translate-x-1/2 cupcake-topping"
          >
            <div 
              style={{ 
                width: '20px',
                height: '15px',
                background: topping.color,
                borderRadius: '10px 10px 10px 10px',
              }}
            ></div>
          </div>
        );
      } else {
        // Default topping visualization
        return (
          <div 
            key={index} 
            className="absolute w-[10px] h-[10px] cupcake-topping"
            style={{ 
              background: topping.color,
              borderRadius: '50%',
              top: `-${30 + index * 5}px`,
              left: `${50 + (index % 3) * 10 - 10}px`,
            }}
          ></div>
        );
      }
    });
  };

  return (
    <div className="relative w-[200px] h-[200px] mx-auto">
      {/* Cupcake wrapper */}
      <div className="absolute bottom-0 w-[100px] h-[70px] left-1/2 -translate-x-1/2">
        <div 
          className="w-full h-full"
          style={{ 
            background: "linear-gradient(180deg, #E57373 0%, #D32F2F 100%)",
            borderRadius: "10px 10px 20px 20px",
            clipPath: "polygon(0% 30%, 10% 0%, 90% 0%, 100% 30%, 100% 100%, 0% 100%)"
          }}
        ></div>
      </div>
      
      {/* Cupcake base */}
      <div className="absolute bottom-[20px] w-[90px] h-[60px] left-1/2 -translate-x-1/2">
        <div 
          className="w-full h-full cupcake-base rounded-t-xl"
          style={{ 
            background: cupcake.base.color,
            borderRadius: "15px 15px 0 0" 
          }}
        ></div>
        
        {/* Filling (if selected) */}
        {cupcake.filling && cupcake.filling.id !== 'none' && (
          <div 
            className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[40px] h-[20px] cupcake-filling"
            style={{ 
              background: cupcake.filling.color,
              borderRadius: "50%" 
            }}
          ></div>
        )}
      </div>
      
      {/* Frosting */}
      {renderFrosting(cupcake.frosting.style, cupcake.frosting.color)}
      
      {/* Toppings */}
      {renderToppings()}
    </div>
  );
}