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

export type CreateReview = {
  userID: number;
  title: string;
  body: string;
  stars: number;
};
