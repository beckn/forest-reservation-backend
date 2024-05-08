"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const logger_service_1 = require("./services/logger/logger.service");
const provider_module_1 = require("./provider/provider.module");
const seeker_module_1 = require("./seeker/seeker.module");
const hasura_service_1 = require("./services/hasura/hasura.service");
const s3_service_1 = require("./services/s3/s3.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            Object.assign(Object.assign({}, axios_1.HttpModule.register({})), { global: true }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule, provider_module_1.ProviderModule, seeker_module_1.SeekerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_service_1.LoggerService, hasura_service_1.HasuraService, s3_service_1.S3Service],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map