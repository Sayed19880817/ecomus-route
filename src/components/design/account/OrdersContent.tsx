"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PackageIcon,
  MapPinIcon,
  PhoneIcon,
  CreditCardIcon,
  TruckIcon,
  UserIcon,
  CalendarIcon,
  DollarSignIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GetUserOrdersI } from "@/interfaces";
import { formatCurrency } from "@/helpers/formatCurrency";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
  if (isDelivered) return "bg-green-100 text-green-800";
  if (isPaid) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
  if (isDelivered) return "Delivered";
  if (isPaid) return "Paid";
  return "Pending";
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case "cash":
      return <DollarSignIcon className="h-4 w-4" />;
    case "card":
      return <CreditCardIcon className="h-4 w-4" />;
    case "online":
      return <CreditCardIcon className="h-4 w-4" />;
    default:
      return <DollarSignIcon className="h-4 w-4" />;
  }
};

export default function OrdersContent({
  orders,
}: {
  orders: GetUserOrdersI[];
}) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter orders by status
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "delivered") return order.isDelivered;
    if (activeTab === "paid") return order.isPaid && !order.isDelivered;
    if (activeTab === "pending") return !order.isPaid;
    return true;
  });
  return (
    <>
      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders List */}
      <AnimatePresence>
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <PackageIcon className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No orders found</h3>
            <p className="mt-2 text-muted-foreground">
              {activeTab === "all"
                ? "You haven't placed any orders yet"
                : `No ${activeTab} orders found`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <PackageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Order #{order.id}
                          </CardTitle>
                          <CardDescription>
                            Placed on {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusColor(
                            order.isPaid,
                            order.isDelivered
                          )}
                        >
                          {getStatusText(order.isPaid, order.isDelivered)}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {getPaymentMethodIcon(order.paymentMethodType)}
                          {order.paymentMethodType.charAt(0).toUpperCase() +
                            order.paymentMethodType.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <ShoppingBagIcon className="h-4 w-4" />
                        Order Items
                      </h3>
                      <div className="grid gap-4">
                        {order.cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="relative w-16 h-16 rounded-md overflow-hidden">
                              <Image
                                src={item.product.imageCover.trim()}
                                alt={item.product.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.product.brand.name} • {item.count} item
                                {item.count > 1 ? "s" : ""}
                              </p>
                              <p className="text-sm font-medium mt-1">
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping & Billing Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div>
                          <h3 className="font-medium flex items-center gap-2 mb-3">
                            <TruckIcon className="h-4 w-4" />
                            Shipping Address
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-start gap-2">
                              <MapPinIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>
                                {order.shippingAddress.details},{" "}
                                {order.shippingAddress.city}
                              </span>
                            </p>
                            <p className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4" />
                              <span>{order.shippingAddress.phone}</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Customer Info */}
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-3">
                          <UserIcon className="h-4 w-4" />
                          Customer Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4" />
                            <span>{order.user.name}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4" />
                            <span className="truncate">{order.user.email}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4" />
                            <span>{order.user.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(order.totalOrderPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>{formatCurrency(order.shippingPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{formatCurrency(order.taxPrice)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Total:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(order.totalOrderPrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>Updated: {formatDate(order.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* <CardFooter className="flex justify-end pt-4">
                    <Button variant="outline">View Details</Button>
                  </CardFooter> */}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper Icons
function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
