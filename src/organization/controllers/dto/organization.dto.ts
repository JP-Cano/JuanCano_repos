import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrganizationDto {
  @ApiProperty({
    type: 'number',
    description: 'Organization ID',
  })
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @ApiProperty({
    type: 'string',
    description: 'Organization name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'number',
    description: 'Organization status',
  })
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
