import { HttpException, HttpStatus } from '@nestjs/common';

export class NoCoverageRepositoryException extends HttpException {
  constructor() {
    super(
      'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
      HttpStatus.BAD_REQUEST,
    );
  }
}
