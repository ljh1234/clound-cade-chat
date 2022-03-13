"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const httpExceptionFilter_1 = require("./common/httpExceptionFilter");
const httpResponseInterceptor_1 = require("./common/httpResponseInterceptor");
const logger_1 = require("./common/logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(logger_1.Logger);
    app.useGlobalFilters(new httpExceptionFilter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new httpResponseInterceptor_1.ResponseInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('clound-chat api')
        .setDescription('接口文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map