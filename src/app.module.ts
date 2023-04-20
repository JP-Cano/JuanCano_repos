import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfig } from './shared/infrastructure/config/database/postgres/postgres.config';
import { LoggerMiddlewareConfig } from './shared/infrastructure/config/logger/logger-middleware.config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [PostgresConfig],
      isGlobal: true,
    }),
    SharedModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddlewareConfig).forRoutes('*');
  }
}
