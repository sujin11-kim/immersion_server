import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './mymodel/entities/User';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'sleact',
  entities: [
    User
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default dataSource;
