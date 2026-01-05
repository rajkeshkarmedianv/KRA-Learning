import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbPassword = configService.get<string>('DB_PASSWORD');
  const dbName = configService.get<string>('DB_NAME');

  if (!dbPassword || !dbName) {
    console.warn('Warning: DB_PASSWORD or DB_NAME not set in .env file');
  }

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<number>('DB_PORT') || 5432,
    username: configService.get<string>('DB_USERNAME') || 'postgres',
    password: dbPassword || '',
    database: dbName || 'inventory_db',

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,

    synchronize: false,

    logging: configService.get<string>('NODE_ENV') === 'development',
    retryAttempts: 3,
    retryDelay: 3000,
  };
};
