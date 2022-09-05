import { useContext } from "react";

import { LoadingContext } from "../context";

export const useLoading = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  return { loading, setLoading };
};
