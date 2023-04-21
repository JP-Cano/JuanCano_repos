import { ApiProperty } from '@nestjs/swagger';
import { RepositoryStateEnumSpanish } from '../../infrastructure/constants/repository-state.enum';

export interface RepositoryResponseInterface {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  coverage: string;
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hotspots: number;
  verificationState: string;
  state: RepositoryStateEnumSpanish;
}

export class Repositories implements RepositoryResponseInterface {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tribe: string;

  @ApiProperty()
  organization: string;

  @ApiProperty()
  coverage: string;

  @ApiProperty()
  codeSmells: number;

  @ApiProperty()
  bugs: number;

  @ApiProperty()
  vulnerabilities: number;

  @ApiProperty()
  hotspots: number;

  @ApiProperty()
  verificationState: string;

  @ApiProperty()
  state: RepositoryStateEnumSpanish;
}
