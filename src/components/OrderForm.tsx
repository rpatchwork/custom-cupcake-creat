import { useState } from "react";
import { useKV } from '@github/spark/hooks';
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Cupcake, Order } from "@/types/cupcake";
import { useUniqueId } from "@/hooks/useUniqueId";

interface OrderFormProps {
  cupcake: Cupcake;
  onOrderSubmit: () => void;
}

export function OrderForm({ cupcake, onOrderSubmit }: OrderFormProps) {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const generateId = useUniqueId();
  
  // Get and set orders in KV storage
  const [orders, setOrders] = useKV<Order[]>("submitted-orders", []);
  
  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailValid(validateEmail(e.target.value));
    } else {
      setEmailValid(true); // Don't show error when empty
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailValid(false);
      toast.error("Please enter a valid email address");
      return;
    }
    
    setSubmitting(true);
    
    // Create new order
    const newOrder: Order = {
      id: generateId(),
      cupcake: { ...cupcake },
      email,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Add to orders list
    setOrders((currentOrders) => [...currentOrders, newOrder]);
    
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast.success("Order submitted successfully!");
      onOrderSubmit();
    }, 600);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-['Poppins']">Submit Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              className={emailValid ? "" : "border-destructive"}
            />
            {!emailValid && (
              <p className="text-sm text-destructive">Please enter a valid email address</p>
            )}
          </div>
          <div className="pt-2">
            <Button 
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={submitting}
            >
              <PaperPlaneTilt size={18} weight="bold" />
              {submitting ? "Submitting..." : "Submit Order"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Your order will be sent to Yomco for processing.</p>
      </CardFooter>
    </Card>
  );
}