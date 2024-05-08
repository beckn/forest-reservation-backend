"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setViewEngine('ejs');
    app.setBaseViewsDir((0, path_1.join)('src', '.', 'views'));
    app.enableCors();
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map