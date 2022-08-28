import { PickerItem } from "react-native-woodpicker/dist/types";

export type TempApartment = {
  unit: string;
  bedrooms: PickerItem;
  bathrooms: PickerItem;
  sqFt: string;
  rent: string;
  deposit: string;
  leaseLength: string;
  availableOn: Date;
  active: boolean;
  showCalendar: boolean;
  images: string[];
  amenities: string[];
  description: string;
};
