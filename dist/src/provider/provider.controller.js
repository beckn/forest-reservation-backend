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
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../role.guard");
const provider_service_1 = require("./provider.service");
const logger_service_1 = require("../services/logger/logger.service");
const createContent_dto_1 = require("../dto/createContent.dto");
const resetPassword_dto_1 = require("../dto/resetPassword.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs_1 = require("fs");
const csvParser = require("csv-parser");
const scholarship_dto_1 = require("../dto/scholarship.dto");
let ProviderController = class ProviderController {
    constructor(providerService, logggerService) {
        this.providerService = providerService;
        this.logggerService = logggerService;
    }
    async createContent(request, createContentdto) {
        console.log("user", request.user);
        console.log("createContentdto", createContentdto);
        this.logggerService.log('POST /createContent', request.user.id);
        let id = request.user.id;
        console.log("id", id);
        return this.providerService.createContent(id, createContentdto);
    }
    async getContent(request) {
        this.logggerService.log('GET /getContent', request.user.id);
        return this.providerService.getContent(request.user.id);
    }
    async getContentById(request, id) {
        this.logggerService.log('GET /getContent', request.user.id);
        return this.providerService.getContentById(id, request.user.id);
    }
    async editContent(request, id, createContentdto) {
        console.log("createContentdto", createContentdto);
        return this.providerService.editContent(id, createContentdto);
    }
    async deleteContent(request, id) {
        this.logggerService.log('POST /deleteContent', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("id", id);
        return this.providerService.deleteContent(id, provider_id);
    }
    async resetPassword(request, resetPasswordDto) {
        this.logggerService.log('Patch /resetPassword', request.user.id);
        return this.providerService.resetPassword(request.user.email, resetPasswordDto);
    }
    async createCollection(request, body) {
        this.logggerService.log('POST /createContent', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("body", body);
        return this.providerService.createCollection(provider_id, body);
    }
    async getCollection(request) {
        this.logggerService.log('POST /createContent', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        return this.providerService.getCollection(provider_id);
    }
    async getCollectionContent(request, id) {
        this.logggerService.log('POST /createContent', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        return this.providerService.getCollectionContent(id);
    }
    async updateCollection(request, id, body) {
        this.logggerService.log('POST /updateCollection', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("id", id);
        console.log("body", body);
        return this.providerService.updateCollection(id, provider_id, body);
    }
    async deleteCollection(request, id) {
        this.logggerService.log('POST /deleteCollection', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("id", id);
        return this.providerService.deleteCollection(id, provider_id);
    }
    async createContentCollection(request, body) {
        this.logggerService.log('POST /createCollectionContent', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("body", body);
        return this.providerService.createContentCollection(body);
    }
    async deleteContentCollection(request, id) {
        this.logggerService.log('POST /deleteContentCollection', request.user.id);
        let provider_id = request.user.id;
        console.log("provider_id", provider_id);
        console.log("id", id);
        return this.providerService.deleteContentCollection(id);
    }
    async createBulkContent(request, body) {
        this.logggerService.log('POST /createBulkContent', request.user.id);
        let provider_id = request.user.id;
        return this.providerService.createBulkContent(provider_id, body);
    }
    async uploadCSV(file, request) {
        let provider_id = request.user.id;
        const results = [];
        return new Promise((resolve, reject) => {
            (0, fs_1.createReadStream)(file.path)
                .pipe(csvParser())
                .on('data', (data) => {
                results.push(data);
            })
                .on('end', async () => {
                const data = await this.providerService.createBulkContent(provider_id, results);
                resolve(data);
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    }
    async addFile(file, document_type) {
        console.log("upload-file", file);
        console.log("document_type", document_type);
        return await this.providerService.addFile(file, document_type);
    }
    async getFileUrl(id) {
        console.log("get-file id", id);
        return await this.providerService.getFile(id);
    }
    async createScholarship(request, scholarship) {
        console.log("user", request.user);
        console.log("scholarship", scholarship);
        this.logggerService.log('POST /scholarship', request.user.id);
        let provider_id = request.user.id;
        return this.providerService.createScholarship(provider_id, scholarship);
    }
    async getScholarship(request) {
        console.log("user", request.user);
        this.logggerService.log('POST /scholarship', request.user.id);
        let provider_id = request.user.id;
        return this.providerService.getScholarship(provider_id);
    }
    async getScholarshipById(request, id) {
        console.log("user", request.user);
        this.logggerService.log('POST /scholarship', request.user.id);
        let provider_id = request.user.id;
        return this.providerService.getScholarshipById(id, provider_id);
    }
    async editScholarshipById(request, id, scholarship) {
        console.log("user", request.user);
        this.logggerService.log('POST /scholarship', request.user.id);
        let provider_id = request.user.id;
        return this.providerService.editScholarshipById(id, provider_id, scholarship);
    }
};
__decorate([
    (0, common_1.Post)('/content'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createContent_dto_1.CreateContentDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createContent", null);
__decorate([
    (0, common_1.Get)('/content'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getContent", null);
__decorate([
    (0, common_1.Get)('/contentById/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getContentById", null);
__decorate([
    (0, common_1.Patch)('/content/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createContent_dto_1.CreateContentDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "editContent", null);
__decorate([
    (0, common_1.Delete)('/content/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteContent", null);
__decorate([
    (0, common_1.Patch)('/resetPassword'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/collection'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createCollection", null);
__decorate([
    (0, common_1.Get)('/collection'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getCollection", null);
__decorate([
    (0, common_1.Get)('/collection/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getCollectionContent", null);
__decorate([
    (0, common_1.Patch)('/collection/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "updateCollection", null);
__decorate([
    (0, common_1.Delete)('/collection/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteCollection", null);
__decorate([
    (0, common_1.Post)('/contentCollection'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createContentCollection", null);
__decorate([
    (0, common_1.Delete)('/contentCollection/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteContentCollection", null);
__decorate([
    (0, common_1.Post)('/createBulkContent1'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createBulkContent", null);
__decorate([
    (0, common_1.Post)('/createBulkContent'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './files'
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "uploadCSV", null);
__decorate([
    (0, common_1.Post)('/uploadImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('document_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "addFile", null);
__decorate([
    (0, common_1.Get)('/getImageUrl/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getFileUrl", null);
__decorate([
    (0, common_1.Post)('/scholarship'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, scholarship_dto_1.ScholarshipDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createScholarship", null);
__decorate([
    (0, common_1.Get)('/scholarship'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getScholarship", null);
__decorate([
    (0, common_1.Get)('/scholarship/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getScholarshipById", null);
__decorate([
    (0, common_1.Patch)('/scholarship/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("provider")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, scholarship_dto_1.ScholarshipDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "editScholarshipById", null);
ProviderController = __decorate([
    (0, common_1.Controller)('provider'),
    __metadata("design:paramtypes", [provider_service_1.ProviderService, logger_service_1.LoggerService])
], ProviderController);
exports.ProviderController = ProviderController;
//# sourceMappingURL=provider.controller.js.map