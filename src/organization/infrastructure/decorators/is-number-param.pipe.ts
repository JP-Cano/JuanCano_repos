import { HttpStatus, Param, ParseIntPipe } from '@nestjs/common';

export function IsNumberParamPipe(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => ({
        statusCode: 400,
        message: 'Invalid id',
      }),
    }),
  );
}
