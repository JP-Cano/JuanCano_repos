import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from '../../infrastructure/config/database/postgres/postgres.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [PostgresConfig.KEY],
      useFactory: (configService: ConfigType<typeof PostgresConfig>) => {
        const { host, port, database, username, password } =
          configService.postgres;
        return {
          type: 'cockroachdb',
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
          ssl: true,
          logging: true,
          logger: 'file',
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
