"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
let UtilService = class UtilService {
    generateRandomWord(length) {
        const numbers = '0123456789';
        let number = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            number += numbers.charAt(randomIndex);
        }
        return number;
    }
    generateReferralCode(email) {
        const emailPrefix = email.substring(0, 4);
        const randomWord1 = this.generateRandomWord(1);
        const randomWord2 = this.generateRandomWord(1);
        console.log("randomWord1", randomWord1);
        console.log("randomWord2", randomWord2);
        const referralCode = `${emailPrefix}${randomWord1}${randomWord2}`.toUpperCase();
        console.log(referralCode);
        return referralCode;
        ;
    }
};
UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=utility.js.map