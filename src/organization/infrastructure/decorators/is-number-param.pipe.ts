import {
  BadRequestException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

export function IsNumberParamPipe(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () =>
        new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid ID',
        }),
    }),
  );
}
