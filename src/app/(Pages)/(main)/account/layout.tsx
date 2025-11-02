import React, { ReactNode } from "react";
import { CreditCard, Truck, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SidenavLinks from "@/components/design/account/SidenavLinks";

const features = [
  {
    icon: <Truck className="w-6 h-6 text-blue-600" />,
    title: "Free Shipping",
    description: "Free shipping on orders over $180",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-green-600" />,
    title: "Flexible Payment",
    description: "Multiple secure payment options",
  },
  {
    icon: <Headphones className="w-6 h-6 text-purple-600" />,
    title: "24/7 Support",
    description: "We are here for you all week",
  },
];

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 lg:px-2 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, orders, and preferences
            </p>
          </div>

          {/* <AccountHeader /> */}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-4 h-full">
              <Card className="sticky top-32">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <div className="">
                      <SidenavLinks />
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-8">
              {children}
              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
