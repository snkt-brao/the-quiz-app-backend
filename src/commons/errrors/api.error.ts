import { HttpException } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(errorObject: {
    statusCode: number;
    errors?: string[] | Record<string, any>[];
    error?: string;
  }) {
    const { statusCode, errors, error } = errorObject;
    super({ errors, error }, statusCode);
  }
}
