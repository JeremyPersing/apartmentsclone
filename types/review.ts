export type Review = {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string | null;
  userID: number;
  propertyID: number;
  title: string;
  body: string;
  stars: number;
};
