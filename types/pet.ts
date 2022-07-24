export type Pet = {
  type: "Dog" | "Cat";
  allowed: boolean;
  limit: number;
  details: string;
  declawed?: boolean;
  neutered?: boolean;
  interview?: boolean;
  deposit?: number;
  fee?: number;
  rent?: number;
};
