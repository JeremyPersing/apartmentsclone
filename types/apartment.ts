export type Apartment = {
  ID: number;
  bathrooms: number;
  bedrooms: number;
  images: string[];
  propertyID: number;
  rent: number;
  sqFt: number;
  unit: string;
  CreatedAt: string;
  UpdatedAt?: string | null;
  DeletedAt?: string | null;
};
