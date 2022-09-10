import { Apartment } from "./apartment";
import { Review } from "./review";
import { Pet } from "./pet";
import { Score } from "./score";

export type Property = {
  ID: number;
  images: string[];
  rentLow: number;
  rentHigh: number;
  bedroomLow: number;
  bedroomHigh: number;
  name?: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  lng: number;
  countryCode: string;
  callingCode: string;
  phoneNumber: string;
  website?: string;
  unitType: "single" | "multiple";
  description?: string;
  stars: number;
  onMarket?: boolean;
  reviews?: Review[];
  apartments: Apartment[];
  scores?: Score[];
  includedUtilities?: string[];
  amenities?: string[];
  petsAllowed: string;
  laundryType: string;
  parkingFee?: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type CreateProperty = {
  unitType: string;
  propertyType: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  lng: number;
  userID: number;
  apartments: {
    unit?: string;
    bedrooms: number;
    bathrooms: number;
    active: boolean;
    availableOn: Date;
  }[];
};
