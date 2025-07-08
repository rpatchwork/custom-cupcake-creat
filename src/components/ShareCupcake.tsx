import React from "react";
import { Button } from "@/components/ui/button";
import { ShareNetwork } from "@phosphor-icons/react";
import { Cupcake } from "@/types/cupcake";
import { copyShareableUrl } from "@/lib/share-utils";

interface ShareCupcakeProps {
  cupcake: Cupcake;
}

export function ShareCupcake({ cupcake }: ShareCupcakeProps) {
  const handleShare = () => {
    copyShareableUrl(cupcake);
  };

  return (
    <Button 
      variant="secondary" 
      onClick={handleShare}
      className="flex items-center gap-1"
    >
      <ShareNetwork size={18} />
      Share Cupcake
    </Button>
  );
}