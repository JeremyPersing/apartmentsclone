import axios from "axios";

import { ErrorRes } from "../types/error";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) return alert((error.response.data as ErrorRes).detail);

    return alert(error.message);
  }
};
