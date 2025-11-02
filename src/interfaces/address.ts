import { ShippingAddress } from "./orders";

export interface GetAddressesI {
  statusMsg?: string;
  results: number;
  status: string;
  message?: string;
  data: SingleAddress[];
}

export interface AddAndRemoveAddressI {
  statusMsg?: string;
  status: string;
  message: string;
  data: SingleAddress[];
}

export interface GetSpecificAddress {
  statusMsg?: string;
  message?: string;
  status: string;
  data: SingleAddress | null;
}

export interface SingleAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// export interface FailedAddressResponse {
//   statusMsg: string;
//   message: string;
// }

export interface PaymentShippingAddressI {
  shippingAddress: ShippingAddress;
}
