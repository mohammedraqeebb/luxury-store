import { CustomError } from '@luxury-store/common';

export class RateLimitedError extends CustomError {
  statusCode: number = 503;
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
