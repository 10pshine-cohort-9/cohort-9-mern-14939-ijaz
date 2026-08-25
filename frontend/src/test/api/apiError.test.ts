import axios from "axios";
import { toApiError } from "../../api/apiError";

describe("toApiError", () => {
  it("extracts message and details from an Axios error response", () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          error: "Validation failed",
          details: [{ field: "email", message: "Invalid email" }],
        },
      },
    };
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    const result = toApiError(axiosError);

    expect(result.message).toBe("Validation failed");
    expect(result.details).toEqual([
      { field: "email", message: "Invalid email" },
    ]);
  });

  it("falls back to a generic message when Axios error has no error field", () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: {} },
    };
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    const result = toApiError(axiosError);

    expect(result.message).toBe("Something went wrong");
    expect(result.details).toBeUndefined();
  });

  it("returns a generic message for a non-Axios error", () => {
    jest.spyOn(axios, "isAxiosError").mockReturnValue(false);

    const result = toApiError(new Error("random failure"));

    expect(result.message).toBe("Something went wrong");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
