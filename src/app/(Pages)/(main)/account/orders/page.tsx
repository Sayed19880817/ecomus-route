"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PackageIcon,
  // MapPinIcon,
  // PhoneIcon,
  // CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  // TruckIcon,
  // UserIcon,
  // CalendarIcon,
  DollarSignIcon,
} from "lucide-react";
// import { motion } from "framer-motion";
// import Image from "next/image";
import { apiServices } from "@/services";
// import { GetUserOrdersI } from "@/interfaces";
import OrdersContent from "@/components/design/account/OrdersContent";
import { formatCurrency } from "@/helpers/formatCurrency";
import { useEffect, useState } from "react";
import { GetUserOrdersI } from "@/interfaces";
import LoadingComponent from "../loading";

// const formatDate = (dateString: string) => {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
//   if (isDelivered) return "bg-green-100 text-green-800";
//   if (isPaid) return "bg-blue-100 text-blue-800";
//   return "bg-yellow-100 text-yellow-800";
// };

// const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
//   if (isDelivered) return "Delivered";
//   if (isPaid) return "Paid";
//   return "Pending";
// };

// const getPaymentMethodIcon = (method: string) => {
//   switch (method) {
//     case "cash":
//       return <DollarSignIcon className="h-4 w-4" />;
//     case "card":
//       return <CreditCardIcon className="h-4 w-4" />;
//     case "online":
//       return <CreditCardIcon className="h-4 w-4" />;
//     default:
//       return <DollarSignIcon className="h-4 w-4" />;
//   }
// };

export default function OrdersPage() {
  const [orders, setOrders] = useState<GetUserOrdersI[] | null>(null);
  // const [orders] = useState<Order[]>(mockOrders);
  // const [activeTab, setActiveTab] = useState('all');
  async function getAllOrders() {
    const orders = await apiServices.getUserOrders();
    if (orders) {
      setOrders(orders.reverse());
    }
  }
  useEffect(() => {
    getAllOrders();
  }, []);

  // // Filter orders by status
  // const filteredOrders = orders.filter(order => {
  //   if (activeTab === 'delivered') return order.isDelivered;
  //   if (activeTab === 'paid') return order.isPaid && !order.isDelivered;
  //   if (activeTab === 'pending') return !order.isPaid;
  //   return true;
  // });

  if (orders == null) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track your orders and view order details
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {orders.length}
                </p>
              </div>
              <PackageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Delivered</p>
                <p className="text-2xl font-bold text-green-900">
                  {orders.filter((o) => o.isDelivered).length}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {orders.filter((o) => !o.isPaid).length}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">
                  Total Spent
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatCurrency(
                    orders.reduce(
                      (sum, order) => sum + order.totalOrderPrice,
                      0
                    )
                  )}
                </p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <OrdersContent orders={orders} />
    </div>
  );
}

// Helper Icons
// function ShoppingBagIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//       <line x1="3" y1="6" x2="21" y2="6" />
//       <path d="M16 10a4 4 0 0 1-8 0" />
//     </svg>
//   );
// }

// function MailIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <rect width="20" height="16" x="2" y="4" rx="2" />
//       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//     </svg>
//   );
// }

// import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components";
// import { Badge } from "@/components/ui/badge";
// import { apiServices } from "@/services";
// import { CheckCircle, Clock, Package, Truck } from "lucide-react";
// import React from "react";

// export default async function OrdersPage() {

//   const recentOrders = apiServices.getUserOrders();

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
//       case "shipped":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
//       case "processing":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "delivered":
//         return <CheckCircle className="w-4 h-4" />;
//       case "shipped":
//         return <Truck className="w-4 h-4" />;
//       case "processing":
//         return <Package className="w-4 h-4" />;
//       default:
//         return <Clock className="w-4 h-4" />;
//     }
//   };

//   return <>
//   <Card>
//                  <CardHeader>
//                    <CardTitle>Recent Orders</CardTitle>
//                    <CardDescription>
//                      View and track your recent purchases
//                    </CardDescription>
//                  </CardHeader>
//                  <CardContent className="space-y-4">
//                    {(await recentOrders).map((order) => (
//                      <Card
//                        key={order.id}
//                        className="hover:shadow-md transition-shadow"
//                      >
//                        <CardContent className="p-6">
//                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                            <div className="space-y-2">
//                              <div className="flex items-center gap-3">
//                                <span className="font-semibold text-lg">
//                                  {order.id}
//                                </span>
//                                <Badge
//                                  className={`${getStatusColor(
//                                    order.status
//                                  )} flex items-center gap-1`}
//                                >
//                                  {getStatusIcon(order.status)}
//                                  {order.status}
//                                </Badge>
//                              </div>
//                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                                <span className="flex items-center gap-1">
//                                  <Clock className="w-3 h-3" />
//                                  {order.date}
//                                </span>
//                                <span className="flex items-center gap-1">
//                                  <Package className="w-3 h-3" />
//                                  {order.items} items
//                                </span>
//                              </div>
//                            </div>
//                            <div className="flex items-center gap-4">
//                              <div className="text-right">
//                                <div className="text-2xl font-bold">
//                                  ${order.total}
//                                </div>
//                              </div>
//                              <Button variant="outline" size="sm">
//                                View Details
//                              </Button>
//                            </div>
//                          </div>
//                        </CardContent>
//                      </Card>
//                    ))}
//                  </CardContent>
//                </Card>
//   </>;
// }
