import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './mymodel/entities/User';


dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
