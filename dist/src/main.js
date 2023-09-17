"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const expressBasicAuth = require("express-basic-auth");
const http_exception_filter_1 = require("./aop/exception/http-exception.filter");
const cookieParser = require("cookie-parser");
const custom_logger_1 = require("../resource/logger/custom-logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new custom_logger_1.CustomLogger()
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.use(["/api-docs", "/api-docs-json"], expressBasicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("IMMERSION")
        .setDescription("The immersion API description")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api-docs", app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map