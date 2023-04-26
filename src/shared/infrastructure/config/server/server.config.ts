import { registerAs } from '@nestjs/config';
import { PROCESS } from '../../constants/process.constant';
import { SERVER_CONFIG } from '../../constants/token';

export interface ServerConfigInterface {
  environment: string;
  port: number;
}

export const serverConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: PROCESS?.NODE_ENV ?? 'development',
    port: 'string' === typeof PROCESS.PORT ? Number(PROCESS.PORT) : 3001,
  }),
);
