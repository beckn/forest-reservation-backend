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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const logger_service_1 = require("../services/logger/logger.service");
const createProvider_dto_1 = require("../dto/createProvider.dto");
const createUser_dto_1 = require("../dto/createUser.dto");
const hasura_service_1 = require("../services/hasura/hasura.service");
const email_service_1 = require("../services/email/email.service");
const bcrypt = require("bcrypt");
const createSeeker_dto_1 = require("../dto/createSeeker.dto");
let AuthService = class AuthService {
    constructor(jwtService, logger, hasuraService, emailService) {
        this.jwtService = jwtService;
        this.logger = logger;
        this.hasuraService = hasuraService;
        this.emailService = emailService;
        this.smsKey = '13893kjefbekbkb';
    }
    async validateUser(request) {
        let result = await this.hasuraService.isUserApproved(request.email);
        console.log(result, "result");
        return result;
    }
    async createUser(createUserDto) {
        const user = new createUser_dto_1.CreateUserDto();
        user.email = createUserDto.email;
        if (createUserDto.role !== "seeker" || (createUserDto.role == "seeker" && createUserDto.password)) {
            console.log("if");
            user.password = await bcrypt.hash(createUserDto.password, 10);
        }
        user.name = createUserDto.name;
        user.role = createUserDto.role;
        const createUser = await this.hasuraService.createUser(user);
        if (createUser.role === 'provider') {
            let providerUser = new createProvider_dto_1.CreateProviderDto();
            providerUser.organization = createUserDto.organization;
            providerUser.source_code = createUserDto.source_code;
            providerUser.user_id = createUser.id;
            const response = await this.hasuraService.createProviderUser(providerUser);
            return response;
        }
        else if (createUser.role === 'seeker') {
            let seeker = new createSeeker_dto_1.CreateSeekerDto();
            seeker.age = createUserDto.age;
            seeker.gender = createUserDto.gender;
            seeker.phone = createUserDto.phone;
            seeker.name = createUserDto.name;
            seeker.email = createUserDto.email;
            seeker.user_id = createUser.id;
            const response = await this.hasuraService.createSeekerUser(seeker);
            return response;
        }
    }
    async findOne(email) {
        const user = await this.hasuraService.findOne(email);
        return user;
    }
    generateToken(payload) {
        const plainObject = JSON.parse(JSON.stringify(payload));
        const token = this.jwtService.sign(plainObject, { expiresIn: 8640000 });
        if (!token) {
            this.logger.log('POST /login', 'log in failed');
        }
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, logger_service_1.LoggerService, hasura_service_1.HasuraService, email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map