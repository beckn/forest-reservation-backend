"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../role.guard");
const createUser_dto_1 = require("../dto/createUser.dto");
const admin_service_1 = require("./admin.service");
const logger_service_1 = require("../services/logger/logger.service");
let AdminController = class AdminController {
    constructor(adminService, logger) {
        this.adminService = adminService;
        this.logger = logger;
    }
    async createAdmin(createuserDto) {
        return this.adminService.createAdmin(createuserDto);
    }
    async getProviderList() {
        return this.adminService.getProviderList();
    }
    async getProviderInfoById(id) {
        return this.adminService.getProviderInfoById(id);
    }
    async getSeekerList() {
        return this.adminService.getSeekerList();
    }
    async getSeekerInfoById(id) {
        return this.adminService.getSeekerInfoById(id);
    }
    async updateapprovalStatus(id, createUserDto) {
        console.log("createUserDto", createUserDto);
        const response = await this.adminService.updateapprovalStatus(id, createUserDto);
        return response;
    }
    async updateEnableStatus(id, createUserDto) {
        console.log("createUserDto", createUserDto);
        const response = await this.adminService.updateEnableStatus(id, createUserDto);
        return response;
    }
};
__decorate([
    (0, common_1.Post)('/registerAdmin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Get)('/getProviderList'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getProviderList", null);
__decorate([
    (0, common_1.Get)('/getProviderInfo/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getProviderInfoById", null);
__decorate([
    (0, common_1.Get)('/getSeekerList'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSeekerList", null);
__decorate([
    (0, common_1.Get)('/getSeekerInfo/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSeekerInfoById", null);
__decorate([
    (0, common_1.Patch)('/approval/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateapprovalStatus", null);
__decorate([
    (0, common_1.Patch)('/enable/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("admin")),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateEnableStatus", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, logger_service_1.LoggerService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map