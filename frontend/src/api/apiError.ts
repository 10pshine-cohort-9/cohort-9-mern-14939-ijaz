import axios from "axios";

export interface ApiError {
  message: string;
  details?: { field: string; message: string }[];
}

export function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    return {
      message: err.response?.data?.error || "Something went wrong",
      details: err.response?.data?.details,
    };
  }
  return { message: "Something went wrong" };
}
