"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const User_1 = require("./mymodel/entities/User");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User_1.User
    ],
    migrations: [__dirname + '/src/migrations/*.ts'],
    charset: 'utf8mb4',
    synchronize: false,
    logging: true,
});
exports.default = dataSource;
//# sourceMappingURL=dataSource.js.map