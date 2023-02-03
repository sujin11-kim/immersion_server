import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Users from './src/users/entities/users.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Users
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
