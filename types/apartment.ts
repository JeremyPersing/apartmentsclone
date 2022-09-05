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
