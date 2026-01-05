import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'RSRBr143@',
  database: process.env.DB_NAME || 'inventory_db',

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
