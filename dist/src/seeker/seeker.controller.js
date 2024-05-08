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
exports.SeekerController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const createContent_dto_1 = require("../dto/createContent.dto");
const createSeeker_dto_1 = require("../dto/createSeeker.dto");
const resetPassword_dto_1 = require("../dto/resetPassword.dto");
const role_guard_1 = require("../role.guard");
const logger_service_1 = require("../services/logger/logger.service");
const seeker_service_1 = require("./seeker.service");
let SeekerController = class SeekerController {
    constructor(seekerService, logggerService) {
        this.seekerService = seekerService;
        this.logggerService = logggerService;
    }
    async resetPassword(request, resetPasswordDto) {
        this.logggerService.log('Patch /resetPassword', request.user.id);
        return this.seekerService.resetPassword(request.user.email, resetPasswordDto);
    }
    async getContent(request, getContentdto) {
        console.log("getContentdto", getContentdto);
        this.logggerService.log('POST /getContent');
        return this.seekerService.getContent(getContentdto);
    }
    async searchCollection(request, body) {
        console.log("getCollectionDto", body);
        this.logggerService.log('POST /getCollection');
        return this.seekerService.searchCollection(body);
    }
    async getScholarship(request, body) {
        this.logggerService.log('POST /getScholarship');
        return this.seekerService.getScholarship(body);
    }
    async createContentBookmark(request, createContentdto) {
        console.log("user", request.user);
        console.log("createContentdto", createContentdto);
        this.logggerService.log('POST /createContent', request.user.id);
        let id = request.user.id;
        console.log("id", id);
        return this.seekerService.createContentBookmark(id, createContentdto);
    }
    async removeBookmarkContent(request, id) {
        console.log("user", request.user);
        this.logggerService.log('POST /createContent', request.user.id);
        let seeker_id = request.user.id;
        console.log("id", id);
        return this.seekerService.removeBookmarkContent(id, seeker_id);
    }
    async getCollection(request) {
        return this.seekerService.getCollection();
    }
    async getCollectionContent(request, id) {
        return this.seekerService.getCollectionContent(id);
    }
    async createBookmark(request, body) {
        this.logggerService.log('POST /createBookmark', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        console.log("body", body);
        return this.seekerService.createBookmark(seeker_id, body);
    }
    async getBookmark(request) {
        this.logggerService.log('POST /getBookmark', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        return this.seekerService.getBookmark(seeker_id);
    }
    async getBookmarkContent(request, id) {
        this.logggerService.log('POST /getBookmarkContent', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        return this.seekerService.getBookmarkContent(id, seeker_id);
    }
    async updateBookmark(request, id, body) {
        this.logggerService.log('POST /updateBookmark', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        console.log("id", id);
        console.log("body", body);
        return this.seekerService.updateBookmark(id, seeker_id, body);
    }
    async deleteCollection(request, id) {
        this.logggerService.log('POST /deleteCollection', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        console.log("id", id);
        return this.seekerService.deleteBookmark(id, seeker_id);
    }
    async addContentBookmark(request, body) {
        this.logggerService.log('POST /addContentBookmark', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        console.log("body", body);
        return this.seekerService.addContentBookmark(body);
    }
    async deleteContentBookmark(request, id) {
        this.logggerService.log('POST /deleteContentBookmark', request.user.id);
        let seeker_id = request.user.id;
        console.log("seeker_id", seeker_id);
        console.log("id", id);
        return this.seekerService.deleteContentBookmark(id, seeker_id);
    }
    async createConfig(request, createSeekerDto) {
        console.log("user", request.user);
        this.logggerService.log('POST /createConfig', request.user.id);
        let user_id = request.user.id;
        return this.seekerService.createConfig(user_id, createSeekerDto);
    }
    async getConfig(request) {
        console.log("user", request.user);
        this.logggerService.log('POST /createConfig', request.user.id);
        let user_id = request.user.id;
        return this.seekerService.getConfig(user_id);
    }
};
__decorate([
    (0, common_1.Patch)('/resetPassword'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/searchContent'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createContent_dto_1.CreateContentDto]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getContent", null);
__decorate([
    (0, common_1.Post)('/searchCollection'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "searchCollection", null);
__decorate([
    (0, common_1.Post)('/searchScholarship'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getScholarship", null);
__decorate([
    (0, common_1.Post)('/bookmarkContent'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createContent_dto_1.CreateContentDto]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "createContentBookmark", null);
__decorate([
    (0, common_1.Delete)('/bookmarkContent/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "removeBookmarkContent", null);
__decorate([
    (0, common_1.Get)('/collection'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getCollection", null);
__decorate([
    (0, common_1.Get)('/collection/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getCollectionContent", null);
__decorate([
    (0, common_1.Post)('/bookmark'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "createBookmark", null);
__decorate([
    (0, common_1.Get)('/bookmark'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getBookmark", null);
__decorate([
    (0, common_1.Get)('/bookmark/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getBookmarkContent", null);
__decorate([
    (0, common_1.Patch)('/bookmark/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "updateBookmark", null);
__decorate([
    (0, common_1.Delete)('/bookmark/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "deleteCollection", null);
__decorate([
    (0, common_1.Post)('/contentBookmark'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "addContentBookmark", null);
__decorate([
    (0, common_1.Delete)('/contentBookmark/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "deleteContentBookmark", null);
__decorate([
    (0, common_1.Post)('/configuration'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createSeeker_dto_1.CreateSeekerDto]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "createConfig", null);
__decorate([
    (0, common_1.Get)('/configuration'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), new role_guard_1.RoleGuard("seeker")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "getConfig", null);
SeekerController = __decorate([
    (0, common_1.Controller)('seeker'),
    __metadata("design:paramtypes", [seeker_service_1.SeekerService, logger_service_1.LoggerService])
], SeekerController);
exports.SeekerController = SeekerController;
//# sourceMappingURL=seeker.controller.js.map