import { createContext } from "react";

import { User } from "./types/user";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => {},
});

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  loading: false,
  setLoading: (loading: boolean) => {},
});
