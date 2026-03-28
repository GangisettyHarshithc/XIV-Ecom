export interface ContactInfo {
  email: string;
  phone: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutStep {
  id: number;
  label: string;
  completed: boolean;
}
