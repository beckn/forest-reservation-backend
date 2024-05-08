"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeekerModule = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../services/hasura/hasura.service");
const logger_service_1 = require("../services/logger/logger.service");
const seeker_controller_1 = require("./seeker.controller");
const seeker_service_1 = require("./seeker.service");
let SeekerModule = class SeekerModule {
};
SeekerModule = __decorate([
    (0, common_1.Module)({
        controllers: [seeker_controller_1.SeekerController],
        providers: [seeker_service_1.SeekerService, hasura_service_1.HasuraService, logger_service_1.LoggerService]
    })
], SeekerModule);
exports.SeekerModule = SeekerModule;
//# sourceMappingURL=seeker.module.js.map