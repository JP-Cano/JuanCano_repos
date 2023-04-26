import { registerAs } from '@nestjs/config';
import { PROCESS } from '../../../constants/process.constant';
import { TYPEORM_POSTGRES_CONFIG } from '../../../constants/token';

interface PostgresConfigInterface {
  database: string;
  port: number;
  host: string;
  username: string;
  password: string;
}

export const PostgresConfig = registerAs(TYPEORM_POSTGRES_CONFIG, () => ({
  postgres: {
    database: PROCESS.DATABASE,
    port: Number(PROCESS.PORT),
    host: PROCESS.HOST,
    username: PROCESS.DB_USERNAME,
    password: PROCESS.PASSWORD,
  } as PostgresConfigInterface,
}));
