"use client";

import LoadingComponent from "@/app/(Pages)/(main)/account/loading";
import { Card, CardContent } from "@/components/ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";
import { GetUserOrdersI } from "@/interfaces";
import { apiServices } from "@/services";
import { Mail, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AccountHeader() {
  const { data: userData } = useSession();
  const [orders, setOrders] = useState<GetUserOrdersI[] | null>(null);
  // const [userId, setUserId] = useState<string>("");

  // useMemo(async () => {
  //   const res = await getUserId();
  //   setUserId(res ?? "");
  // }, []);
  async function getAllOrders() {
    const orders = await apiServices.getUserOrders();
    if (orders) {
      setOrders(orders.reverse());
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (userData == null || orders == null) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {/* Profile Header Card */}
      <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center  gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarFallback className="text-5xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  {userData?.user.name
                    .split(" ", 2)
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <User2 className="w-4 h-4 text-blue-600" />
                {userData?.user.name}
              </h2>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{userData?.user.email}</span>
                </div>
              </div>
            </div>

            <Separator className="md:hidden" />

            {/* Stats */}
            <div className="flex gap-6 md:gap-4 md:flex-col items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {orders.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Orders
                </div>
              </div>
              {/* <Separator className="md:hidden h-8 w-px" /> */}
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    orders.reduce(
                      (sum, order) => sum + order.totalOrderPrice,
                      0
                    )
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Total Spent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
