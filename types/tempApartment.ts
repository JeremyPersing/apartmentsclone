import { PickerItem } from "react-native-woodpicker/dist/types";

export type TempApartment = {
  ID?: number;
  unit: string;
  bedrooms: PickerItem;
  bathrooms: PickerItem;
  sqFt: string | number;
  rent: string | number;
  deposit: string | number;
  leaseLength: string;
  availableOn: Date;
  active: boolean;
  showCalendar?: boolean;
  images: string[];
  amenities: string[];
  description: string;
};
