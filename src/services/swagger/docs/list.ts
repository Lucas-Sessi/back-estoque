import { HttpStatus } from '@nestjs/common';
import {
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function listApiDecorator(ApiResponseEntity: any): MethodDecorator {
  const decorators = [
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse({ type: [ApiResponseEntity], status: HttpStatus.OK }),
    ApiUnauthorizedResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Bad Request',
              },
            },
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    }),
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey, descriptor);
    }
  };
}

export function listApiDecoratorPublic(
  ApiResponseEntity: any,
): MethodDecorator {
  const decorators = [
    ApiResponse({ type: [ApiResponseEntity], status: HttpStatus.OK }),
    ApiUnauthorizedResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Bad Request',
              },
            },
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    }),
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey, descriptor);
    }
  };
}
