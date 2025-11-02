// components/address-selection-dialog.tsx
"use client";

// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  PlusIcon,
  HomeIcon,
  BuildingIcon,
  Loader2,
  // CheckIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SingleAddress } from "@/interfaces";
import Link from "next/link";

// Props interface
interface AddressSelectionDialogProps {
  addresses: SingleAddress[];
  selectedAddress: SingleAddress | null;
  // selectedAddressId: string | null;
  onAddressSelect: (address: SingleAddress) => void;
  isOpenAddressesDialog: boolean;
  setIsOpenAddressesDialog: (x: boolean) => void;
  handleOnlinePayment: () => void;
  handleCashPayment: () => void;
  isLoadingOnline: boolean;
  isLoadingCash: boolean;
  // onAddNewAddress: () => void;
  // triggerText?: string;
  // triggerVariant?: "default" | "outline" | "ghost" | "link" | "destructive";
}

export function AddressSelectionDialog({
  addresses,
  selectedAddress,
  // selectedAddressId,
  onAddressSelect,
  isOpenAddressesDialog,
  setIsOpenAddressesDialog,
  handleOnlinePayment,
  handleCashPayment,
  isLoadingCash,
  isLoadingOnline,
}: // onAddNewAddress,
// triggerText = "Select Address",
// triggerVariant = "default",
AddressSelectionDialogProps) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState<string | null>(
  //   selectedAddressId
  // );

  // Sync selected address when prop changes
  // useEffect(() => {
  //   setSelectedId(selectedAddressId);
  // }, [selectedAddressId]);

  // const handleSelect = (addressId: string) => {
  //   setSelectedId(addressId);
  //   onAddressSelect(addressId);
  // };

  // const handleConfirm = () => {
  //   if (selectedId) {
  //     onAddressSelect(selectedId);
  //     setIsOpen(false);
  //   }
  // };

  const AddressIcon = ({ address }: { address: SingleAddress }) => {
    if (address.name.toLowerCase().includes("home")) {
      return <HomeIcon className="h-4 w-4" />;
    }
    if (
      address.name.toLowerCase().includes("work") ||
      address.name.toLowerCase().includes("office")
    ) {
      return <BuildingIcon className="h-4 w-4" />;
    }
    return <MapPinIcon className="h-4 w-4" />;
  };

  return (
    <Dialog
      open={isOpenAddressesDialog}
      onOpenChange={setIsOpenAddressesDialog}
    >
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPinIcon className="text-primary" />
            Select Delivery Address
          </DialogTitle>
          <DialogDescription>
            Choose from your saved addresses or add a new one
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto p-3 bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MapPinIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
              <p className="text-muted-foreground text-sm mb-6">
                You haven&apos;t added any delivery addresses yet
              </p>
              <Button asChild className="w-full">
                <Link href={"/account/addresses"}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Your First Address
                </Link>
              </Button>
            </div>
          ) : (
            <RadioGroup
              // value={selectedId || ""}
              // onValueChange={handleSelect}
              defaultValue={selectedAddress?._id ?? undefined}
              className="space-y-3 "
            >
              <ScrollArea className="pr-2  max-h-64 overflow-y-auto">
                <AnimatePresence>
                  <div className="flex flex-col gap-3">
                    {addresses.map((address) => (
                      <motion.div
                        key={address._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <div
                          className="flex items-start space-x-3 p-3 rounded-lg border-2 hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => onAddressSelect(address)}
                        >
                          <RadioGroupItem
                            value={address._id}
                            id={address._id}
                            className="mt-1.5"
                          />
                          <Label
                            htmlFor={address._id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <AddressIcon address={address} />
                              <span className="font-medium">
                                {address.name}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {address.details}, {address.city}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              📱 {address.phone}
                            </p>
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </ScrollArea>
            </RadioGroup>
          )}
        </div>

        {addresses.length > 0 && (
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" asChild>
              <Link href={"/account/addresses"}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add New Address
              </Link>
            </Button>
            <Button
              onClick={handleOnlinePayment}
              disabled={selectedAddress == null || isLoadingOnline}
            >
              {isLoadingOnline && <Loader2 className="animate-spin size-4" />}
              Online Pay
            </Button>
            <Button
              onClick={handleCashPayment}
              disabled={selectedAddress == null || isLoadingCash}
            >
              {isLoadingCash && <Loader2 className="animate-spin size-4" />}
              Cash Pay
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
