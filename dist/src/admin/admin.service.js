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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../services/hasura/hasura.service");
const email_service_1 = require("../services/email/email.service");
const createUser_dto_1 = require("../dto/createUser.dto");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(hasuraService, emailService) {
        this.hasuraService = hasuraService;
        this.emailService = emailService;
    }
    async getProviderList() {
        const response = await this.hasuraService.getProviderList();
        return response;
    }
    async getProviderInfoById(id) {
        const response = await this.hasuraService.getProviderInfoById(id);
        return response;
    }
    async getSeekerList() {
        const response = await this.hasuraService.getSeekerList();
        return response;
    }
    async getSeekerInfoById(id) {
        const response = await this.hasuraService.getSeekerInfoById(id);
        return response;
    }
    async updateapprovalStatus(id, createUserDto) {
        const updateStatus = await this.hasuraService.updateapprovalStatus(id, createUserDto);
        return updateStatus;
    }
    async updateEnableStatus(id, createUserDto) {
        const updateStatus = await this.hasuraService.updateEnableStatus(id, createUserDto);
        return updateStatus;
    }
    async createAdmin(createUserDto) {
        const user = new createUser_dto_1.CreateUserDto();
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        user.name = createUserDto.name;
        user.role = createUserDto.role;
        user.approved = true;
        const createAdmin = await this.hasuraService.adminCreate(user);
        return createAdmin;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hasura_service_1.HasuraService,
        email_service_1.EmailService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map