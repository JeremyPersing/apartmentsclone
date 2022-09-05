import { PickerItem } from "react-native-woodpicker/dist/types";

import { TempApartment } from "./tempApartment";

export type EditPropertyInitialValues = {
  unitType: "single" | "multiple" | undefined;
  apartments: TempApartment[];
  images: string[];
  description: string;
  includedUtilities: string[];
  petsAllowed: PickerItem;
  laundryType: PickerItem;
  parkingFee: string;
  amenities: string[];
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  phoneNumber: string;
  onMarket: boolean;
};
