"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const user_entity_1 = require("./mymodel/entities/user.entity");
dotenv.config();
const dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "sleact",
    entities: [user_entity_1.User],
    migrations: [__dirname + "/src/migrations/*.ts"],
    charset: "utf8mb4",
    synchronize: false,
    logging: true,
});
dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = dataSource;
//# sourceMappingURL=ormconfig.js.map