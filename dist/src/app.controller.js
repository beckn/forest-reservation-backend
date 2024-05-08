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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getCoursesFromFln(body) {
        return this.appService.getContent(body);
    }
    selectCourse(body) {
        return this.appService.handleSelect(body);
    }
    initCourse(body) {
        return this.appService.handleInit(body);
    }
    confirmCourse(body) {
        return this.appService.handleConfirm(body);
    }
    giveRating(body) {
        console.log("rating api calling");
        return this.appService.handleRating(body);
    }
    getFeedbackForm(id) {
        return { id };
    }
    submitFeedback(description, id) {
        return this.appService.handleSubmit(description, id);
    }
    getContentFromIcar1(body) {
        console.log("search api calling");
        return this.appService.getContent(body);
    }
    selectCourse1(body) {
        console.log("select api calling");
        return this.appService.handleSelect(body);
    }
    initCourse1(body) {
        console.log("init api calling");
        return this.appService.handleInit(body);
    }
    confirmCourse1(body) {
        console.log("confirm api calling");
        return this.appService.handleConfirm(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('dsep/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCoursesFromFln", null);
__decorate([
    (0, common_1.Post)('dsep/select'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "selectCourse", null);
__decorate([
    (0, common_1.Post)('dsep/init'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "initCourse", null);
__decorate([
    (0, common_1.Post)('dsep/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "confirmCourse", null);
__decorate([
    (0, common_1.Post)('dsep/rating'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "giveRating", null);
__decorate([
    (0, common_1.Get)('feedback/:id'),
    (0, common_1.Render)('feedback'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFeedbackForm", null);
__decorate([
    (0, common_1.Post)('/submit-feedback/:id'),
    __param(0, (0, common_1.Body)('description')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "submitFeedback", null);
__decorate([
    (0, common_1.Post)('mobility/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContentFromIcar1", null);
__decorate([
    (0, common_1.Post)('mobility/select'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "selectCourse1", null);
__decorate([
    (0, common_1.Post)('mobility/init'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "initCourse1", null);
__decorate([
    (0, common_1.Post)('mobility/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "confirmCourse1", null);
AppController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [app_service_1.AppService, auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map