"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const users_entity_1 = require("./src/users/entities/users.entity");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        users_entity_1.default
    ],
    migrations: [__dirname + '/src/migrations/*.ts'],
    charset: 'utf8mb4',
    synchronize: false,
    logging: true,
});
exports.default = dataSource;
//# sourceMappingURL=dataSource.js.map