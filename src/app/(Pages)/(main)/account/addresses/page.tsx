"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, MapPinIcon, HomeIcon, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SingleAddress } from "@/interfaces";
import { apiServices } from "@/services";
import LoadingComponent from "../loading";
import { AddNewAddress } from "@/helpers/user/addNewAddress";
import { deleteAddress } from "@/helpers/user/deleteAddress";

// Address schema
const addressSchema = zod.object({
  name: zod
    .string()
    .nonempty("Address title is Required")
    .min(3, "Name must be at least 3 characters"),
  details: zod
    .string()
    .nonempty("Details is required")
    .min(10, "Address details must be at least 10 characters"),
  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(
      /^01[0125][0-9]{8}$/,
      "Phone must be a valid Egyptian number (01XXXXXXXXX)"
    ),
  city: zod
    .string()
    .nonempty("City name is required")
    .min(3, "City name must be at least 3 chars"),
});

type AddressFormData = zod.infer<typeof addressSchema>;

export default function AddressesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [userAddresses, setUserAddresses] = useState<SingleAddress[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [isDeletingAddress, setIsDeletingAddress] = useState<string | null>(
    null
  );

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: AddressFormData) => {
    setIsAddingAddress(true);

    // Post data to api
    const response = await AddNewAddress(data);
    if (response?.status == "success") {
      form.reset();
      setIsFormOpen(false);
      setIsAddingAddress(false);
      getAddresses();
    }
  };

  async function handleDeleteAddress(addressId: string) {
    setIsDeletingAddress(addressId);
    const response = await deleteAddress(addressId);
    if (response?.status == "success") {
      const newAddresses = response.data;
      setUserAddresses(newAddresses);
    }
    setIsDeletingAddress(null);
  }

  async function getAddresses() {
    setIsLoadingPage(true);
    const response = await apiServices.GetUserAddresses();
    if (response.status == "success") {
      setUserAddresses(response.data);
    }
    setIsLoadingPage(false);
  }

  useEffect(() => {
    document.title = "Addresses - Ecomus";
    getAddresses();
  }, []);

  if (isLoadingPage) {
    return <LoadingComponent title="addresses" />;
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Addresses</h1>
          <p className="text-muted-foreground">
            Manage your delivery locations
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="text-white/70 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isFormOpen ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Address
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="border-2 border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="text-primary" />
                  New Address
                </CardTitle>
                <CardDescription>
                  Add a new delivery location for your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Home, Work, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Cairo, Alexandria, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Street, building number, floor, apartment, etc."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="01XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isAddingAddress}
                      className="text-white w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                    >
                      {isAddingAddress && (
                        <Loader2 className="animate-spin size-4" />
                      )}
                      Save Address
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        {userAddresses.map((address) => (
          <motion.div
            key={address._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" />
                    {address.name}
                  </CardTitle>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {address.city}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{address.details}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>📱 {address.phone}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button
                  onClick={() => handleDeleteAddress(address._id)}
                  disabled={isDeletingAddress == address._id}
                  variant="destructive"
                  size="sm"
                >
                  {isDeletingAddress == address._id && (
                    <Loader2 className="animate-spin size-4" />
                  )}
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {userAddresses.length === 0 && !isFormOpen && (
        <div className="text-center py-12">
          <MapPinIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No addresses added</h3>
          <p className="mt-2 text-muted-foreground">
            Click &quot;Add New Address&quot; to get started
          </p>
        </div>
      )}
    </div>
  );
}
