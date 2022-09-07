import { PickerItem } from "react-native-woodpicker/dist/types";

export type Apartment = {
  ID: number;
  bathrooms: number;
  bedrooms: number;
  images: string[];
  propertyID: number;
  rent: number;
  sqFt: number;
  unit: string;
  deposit: number;
  leaseLength: string;
  availableOn: string;
  active: boolean;
  amenities: string[];
  description: string;
  CreatedAt: string;
  UpdatedAt?: string | null;
  DeletedAt?: string | null;
};

export type EditApartment = {
  ID?: number;
  unit: string;
  bedrooms: PickerItem | number;
  bathrooms: PickerItem | number;
  sqFt: string | number;
  active: boolean;
  editName: boolean;
  availableOn: Date;
};
