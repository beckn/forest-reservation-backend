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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const createUser_dto_1 = require("../dto/createUser.dto");
const logger_service_1 = require("../services/logger/logger.service");
const fs = require("fs");
const util_1 = require("util");
let AuthController = class AuthController {
    constructor(authService, logger) {
        this.authService = authService;
        this.logger = logger;
    }
    async create(createUserDto) {
        this.logger.log('POST /register', `User Email Id : ${createUserDto.email}`);
        return this.authService.createUser(createUserDto);
    }
    login(request, response) {
        this.logger.log('POST /login');
        console.log("user", request.user);
        if (request.body.role !== request.user.role) {
            throw new common_1.UnauthorizedException;
        }
        if (!request.user.approved) {
            throw new common_1.HttpException('User is not approved!', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!request.user.enable) {
            throw new common_1.HttpException('User is disabled!', common_1.HttpStatus.UNAUTHORIZED);
        }
        let token = this.authService.generateToken(request.user);
        this.logger.log('POST /login', 'logged In successfully');
        delete request.user.password;
        return response.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            data: {
                token: token,
                user: request.user
            }
        });
    }
    async infoLog() {
        try {
            const readFile = (0, util_1.promisify)(fs.readFile);
            const data = await readFile('combined.log', 'utf-8');
            return data;
        }
        catch (error) {
            throw new Error('Unable to fetch data');
        }
    }
    async errorLog() {
        try {
            const readFile = (0, util_1.promisify)(fs.readFile);
            const data = await readFile('error.log', 'utf-8');
            return data;
        }
        catch (error) {
            throw new Error('Unable to fetch data');
        }
    }
};
__decorate([
    (0, common_1.Post)('/registerUser'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('info-log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "infoLog", null);
__decorate([
    (0, common_1.Get)('error-log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "errorLog", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, logger_service_1.LoggerService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map