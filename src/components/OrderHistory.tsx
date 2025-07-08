import { useState } from "react";
import { useKV } from '@github/spark/hooks';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, MagnifyingGlass, Package, X } from "@phosphor-icons/react";
import { Order } from "@/types/cupcake";

export function OrderHistory() {
  const [orders] = useKV<Order[]>("submitted-orders", []);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case 'confirmed': return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'completed': return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'cancelled': return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "";
    }
  };
  
  // View order details
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <>
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <List size={18} />
            Order History ({orders.length})
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-['Poppins']">Order History</DialogTitle>
            <DialogDescription>
              View all previously submitted cupcake orders
            </DialogDescription>
          </DialogHeader>
          
          {orders.length > 0 ? (
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="details">Order Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Base</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>{order.email}</TableCell>
                          <TableCell>{order.cupcake.base.name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)} variant="outline">
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => viewOrderDetails(order)}
                            >
                              <MagnifyingGlass size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Order #{selectedOrder.id.slice(0, 8)}</h3>
                      <Badge className={getStatusColor(selectedOrder.status)} variant="outline">
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p>{formatDate(selectedOrder.date)}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{selectedOrder.email}</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md space-y-3">
                      <h4 className="font-medium">Cupcake Details</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Base</p>
                          <p>{selectedOrder.cupcake.base.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Filling</p>
                          <p>{selectedOrder.cupcake.filling?.name || "None"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Frosting</p>
                          <p>{selectedOrder.cupcake.frosting.name} ({selectedOrder.cupcake.frosting.style})</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Toppings</p>
                          <p>
                            {selectedOrder.cupcake.toppings.length > 0 
                              ? selectedOrder.cupcake.toppings.map(t => t.name).join(", ")
                              : "None"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                        Select Different Order
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package size={48} className="mx-auto text-muted-foreground mb-2" />
                    <p>Select an order from the list to view details</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Submit your first cupcake order to see it here
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              <X size={16} className="mr-2" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}