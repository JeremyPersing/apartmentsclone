import { Property } from "./property";

export type Manager = {
  ID: number;
  name: string;
  email: string;
  userID: number;
  phoneNumber?: string;
  website?: string;
  image?: string;
  properties?: Property[];
};
