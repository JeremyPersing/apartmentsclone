import { createContext } from "react";

import { User } from "./types/user";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => {},
});
