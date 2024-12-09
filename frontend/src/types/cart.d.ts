export interface CartError {
    response?: {
      data?: {
        message: string;
      };
      status?: number;
      statusText?: string;
    };
    message: string;
  }
