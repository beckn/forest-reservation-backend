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
exports.SeekerService = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../services/hasura/hasura.service");
const bcrypt = require("bcrypt");
let SeekerService = class SeekerService {
    constructor(hasuraService) {
        this.hasuraService = hasuraService;
    }
    async resetPassword(email, resetPasswordDto) {
        console.log("email", email);
        console.log("resetPasswordDto", resetPasswordDto);
        const user = await this.hasuraService.findOne(email);
        if (user) {
            const passwordMatches = await bcrypt.compare(resetPasswordDto.currentPassword, user.password);
            if (passwordMatches) {
                const newPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
                return this.hasuraService.updatePassword(user.id, newPassword);
            }
            else {
                throw new common_1.HttpException('Password is incorrect!', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
    }
    async getContent(getContentdto) {
        return this.hasuraService.findContent1(getContentdto);
    }
    async searchCollection(getCollectiondto) {
        return this.hasuraService.findCollection(getCollectiondto);
    }
    async createContentBookmark(id, createContentdto) {
        return this.hasuraService.createContentBookmark(id, createContentdto);
    }
    async removeBookmarkContent(id, seeker_id) {
        return this.hasuraService.removeBookmarkContent(id, seeker_id);
    }
    async getCollection() {
        return this.hasuraService.getAllCollection();
    }
    async getCollectionContent(id) {
        return this.hasuraService.getCollectionContent(id);
    }
    async createBookmark(seeker_id, body) {
        return this.hasuraService.createBookmark(seeker_id, body);
    }
    async getBookmark(seeker_id) {
        return this.hasuraService.getBookmark(seeker_id);
    }
    async getBookmarkContent(id, seeker_id) {
        return this.hasuraService.getBookmarkContent(id, seeker_id);
    }
    async updateBookmark(id, seeker_id, body) {
        return this.hasuraService.updateBookmark(id, seeker_id, body);
    }
    async deleteBookmark(id, seeker_id) {
        return this.hasuraService.deleteBookmark(id, seeker_id);
    }
    async addContentBookmark(body) {
        return this.hasuraService.addContentBookmark(body);
    }
    async deleteContentBookmark(id, seeker_id) {
        return this.hasuraService.deleteContentBookmark(id, seeker_id);
    }
    async createConfig(user_id, body) {
        return this.hasuraService.createConfig(user_id, body);
    }
    async getConfig(user_id) {
        return this.hasuraService.getConfig(user_id);
    }
    async getScholarship(getContentdto) {
        return this.hasuraService.findScholarship(getContentdto);
    }
};
SeekerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hasura_service_1.HasuraService])
], SeekerService);
exports.SeekerService = SeekerService;
//# sourceMappingURL=seeker.service.js.map