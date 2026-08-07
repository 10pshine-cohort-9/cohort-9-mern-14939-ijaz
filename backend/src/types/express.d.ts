declare global {
  namespace Express {
    interface Response {
      success: (data: unknown) => void;
      sendResponse: (statusCode: number, data: unknown) => void;
    }
  }
}

export {};
