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
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../services/hasura/hasura.service");
const bcrypt = require("bcrypt");
const s3_service_1 = require("../services/s3/s3.service");
let ProviderService = class ProviderService {
    constructor(hasuraService, s3Service) {
        this.hasuraService = hasuraService;
        this.s3Service = s3Service;
    }
    async createContent(id, createContentdto) {
        return this.hasuraService.createContent(id, createContentdto);
    }
    async getContent(id) {
        return this.hasuraService.getContent(id);
    }
    async getContentById(id, provider_id) {
        return this.hasuraService.getContentById(id, provider_id);
    }
    async editContent(id, createContentdto) {
        return this.hasuraService.editContent(id, createContentdto);
    }
    async deleteContent(id, provider_id) {
        return this.hasuraService.deleteContent(id, provider_id);
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
    async createCollection(provider_id, body) {
        return this.hasuraService.createCollection(provider_id, body);
    }
    async getCollection(provider_id) {
        return this.hasuraService.getCollection(provider_id);
    }
    async getCollectionContent(id) {
        return this.hasuraService.getCollectionContent(id);
    }
    async updateCollection(id, provider_id, body) {
        return this.hasuraService.updateCollection(id, provider_id, body);
    }
    async deleteCollection(id, provider_id) {
        return this.hasuraService.deleteCollection(id, provider_id);
    }
    async createContentCollection(body) {
        return this.hasuraService.createContentCollection(body);
    }
    async deleteContentCollection(id) {
        return this.hasuraService.deleteContentCollection(id);
    }
    async createBulkContent1(provider_id, data) {
        return this.hasuraService.createBulkContent(provider_id, data);
    }
    async createBulkContent(provider_id, result) {
        const expectedHeaders = ['content_id', 'Name', 'Description', 'Icon', 'Publisher', 'Collection', 'URL_Type', 'URL', 'Mime_Type', 'Language', 'Content Type', 'Category', 'Themes', 'Min age', 'Max age', 'Author', 'Domain', 'Curricular Goals', 'Competencies', 'Learning Outomes', 'Persona', 'License', 'Terms and Conditions', 'Attribute'];
        const csvheader = Object.keys(result[0]);
        const areHeadersValid = this.arraysHaveSameElements(expectedHeaders, csvheader);
        const updates = [];
        if (areHeadersValid) {
            for (const log of result) {
                updates.push({
                    competency: log['Competencies'],
                    contentType: log['Content Type'],
                    description: log['Description'],
                    domain: log['Domain'],
                    goal: log['Curricular Goals'],
                    language: log['Language'],
                    link: log['URL'],
                    sourceOrganisation: log['Publisher'],
                    image: log['Icon'],
                    themes: log['Themes'],
                    title: log['Name'],
                    user_id: provider_id,
                    content_id: log['content_id'],
                    publisher: log['Publisher'],
                    collection: log['Collection'],
                    urlType: log['URL_Type'],
                    mimeType: log['Mime_Type'],
                    minAge: parseInt(log['Min age']),
                    maxAge: parseInt(log['Max age']),
                    author: log['Author'],
                    learningOutcomes: log['Learning Outomes'],
                    category: log['Category'],
                    persona: log['Persona'],
                    license: log['License'],
                    conditions: log['Terms and Conditions'],
                    attribute: log['Attribute']
                });
            }
            const promises = [];
            updates.forEach((item) => {
                promises.push(this.hasuraService.createContent(provider_id, item));
            });
            return await Promise.all(promises);
        }
        else {
            return {
                error: "Invalid CSV headers"
            };
        }
    }
    arraysHaveSameElements(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((element) => arr2.includes(element)) &&
            arr2.every((element) => arr1.includes(element));
    }
    async addFile(file, document_type) {
        const originalName = file.originalname.split(" ").join("").toLowerCase();
        const [name, fileType] = originalName.split(".");
        let key = `${name}${Date.now()}.${fileType}`;
        console.log("key", key);
        const imageUrl = await this.s3Service.uploadFile(file, key);
        console.log("imageUrl", imageUrl);
        return { imageUrl: imageUrl, mimetype: `image/${fileType}`, key: key };
    }
    async getFile(id) {
        const key = id;
        return await this.s3Service.getFileUrl(key);
    }
    async createScholarship(provider_id, scholarship) {
        return this.hasuraService.createScholarship(provider_id, scholarship);
    }
    async getScholarship(provider_id) {
        return this.hasuraService.getScholarship(provider_id);
    }
    async getScholarshipById(id, provider_id) {
        return this.hasuraService.getScholarshipById(id, provider_id);
    }
    async editScholarshipById(id, provider_id, scholarship) {
        return this.hasuraService.editScholarshipById(id, provider_id, scholarship);
    }
};
ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hasura_service_1.HasuraService, s3_service_1.S3Service])
], ProviderService);
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map