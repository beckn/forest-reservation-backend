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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utility_1 = require("./utility");
const logger_service_1 = require("../logger/logger.service");
const nodemailer = require("nodemailer");
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const axios = require('axios');
let EmailService = class EmailService {
    constructor(utilService, configService, logger) {
        this.utilService = utilService;
        this.configService = configService;
        this.logger = logger;
        this.aws_host = process.env.AWS_HOST;
        this.aws_user = process.env.AWS_USER;
        this.aws_pass = process.env.AWS_PASS;
        this.mailgun_apikey = process.env.MAILGUN_APIKEY;
        this.mailgun_url = process.env.MAILGUN_URL;
        this.mailgun_sender = process.env.MAILGUN_SENDER;
    }
    async sendWelcomeEmail1(email) {
        console.log("email", email);
        let transporter = nodemailer.createTransport({
            host: this.aws_host,
            port: 587,
            secure: false,
            auth: {
                user: this.aws_user,
                pass: this.aws_pass,
            },
            tls: {
                rejectUnauthorized: false
            },
        });
        let emailData = {};
        emailData = {
            from: `"Manipal" <abhilash.dube@tekditechnologies.com>`,
            to: email,
            subject: `Manipal sa-dashboard`,
            text: `Email from manipal sa-dashboard`,
        };
        try {
            let info = await transporter.sendMail(emailData);
            console.log("info", info);
            if (info.messageId) {
                console.log("email sent!");
                return "Email sent successfully!";
            }
            else {
                console.log("unable to send email");
                return "unable to send email";
            }
        }
        catch (error) {
            console.log("email err", error);
            throw new common_1.HttpException('Unable to send Email!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    generateRefCode(email) {
        const referralCode = this.utilService.generateReferralCode(email);
        this.logger.log('Referral Code Generated');
        return referralCode;
    }
    sendEmail1() {
        console.log("Send email function...");
        const main = async () => {
            let transporter = nodemailer.createTransport({
                host: this.aws_host,
                port: 587,
                secure: false,
                auth: {
                    user: this.aws_user,
                    pass: this.aws_pass,
                },
                tls: {
                    rejectUnauthorized: false
                },
            });
            let emailData = {};
            emailData = {
                from: `"Manipal" <abhilash.dube@tekditechnologies.com>`,
                to: `suraj_k@tekditechnologies.com`,
                subject: `Manipal sa-dashboard`,
                text: `Email from manipal sa-dashboard`,
            };
            let info = await transporter.sendMail(emailData);
            if (info.messageId) {
                console.log("email sent!");
                return "Email sent successfully!";
            }
            else {
                console.log("unable to send email");
                return "unable to send email";
            }
        };
        main().catch(console.error);
    }
    async sendRequestedUserEmail(payload) {
        let subject = 'Request For Student Ambassdor';
        let text = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Medace</title>
    </head>
    <body>
    <p>Hello Manipal,</p>

    <p>Please be informed that there is a request from a student to become a Student Ambassador. Please log in to the Portal and kindly approve the application.</p>

    <p>Thanks,<br>Team Manipal MedAce</p>
    </body>
    </html>
    `;
        this.sendEmail("mongodb4038@gmail.com", subject, text);
    }
    async sendWelcomeEmail(email, name, mobile, referralCode) {
        let subject = 'Welcome to Medace';
        let text = `
    <!DOCTYPE html>
<html>
<head>
    <title>Welcome to Medace</title>
</head>
<body>
    <p>Hello ${name},</p>

    <p>We are thrilled to welcome you to the MedAcers team at Manipal MedAce! Congratulations on your selection, and we are excited to have you join us on this incredible journey dedicated to making a positive impact in the life of an MBBS student.</p>

    <p>At MedAce, we believe in the power of innovation and collaboration to transform healthcare. Your selection reflects our confidence in your abilities and your potential to contribute significantly to our mission. We are confident that your skills, dedication, and enthusiasm will be valuable assets to our team.</p>

    <p>Your dedicated Area Manager will reach out to you and share your Roles and Responsibilities that you need to carry out in your assigned college/territory during this entire journey.</p>

    <p>We have activated your MedAcers Dashboard, where you can see all the program details, your profile, your contribution, achievements & more.</p>

    <p>You can log in to the MedAcers Dashboard using your phone number listed below:</p>

    <p>Portal Link: <a href="https://medacers.manipalmedace.com/">Click here</a></p>

    <p>Phone Number: <a href="tel:${mobile}">${mobile}</a></p>
    
    <p>Your Referral Code: ${referralCode}</p>

    <p>For any queries, please reach out to your dedicated area manager or contact us at +91 81 5183 5183 | support@manipalmedace.com.</p>

    <p>We look forward to applauding you and celebrating your successes as we are #InThisTogether.</p>

    <p>Thanks,<br>Team Manipal MedAce</p>
</body>
</html>

    `;
        return this.sendEmail(email, subject, text);
    }
    async sendEmail2(email, subject, text) {
        console.log("email", email);
        console.log("subject", subject);
        const api_key = this.configService.get('MAILGUN_APIKEY');
        console.log("api_key 255", api_key);
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: this.configService.get('MAILGUN_APIKEY'),
        });
        try {
            let msg = await mg.messages
                .create('manipalmedace.com', {
                from: 'Manipal MedAce  <medacers@manipalmedace.com>',
                to: [email],
                subject: subject,
                html: text,
            });
            console.log("msg 265", msg);
            return msg;
        }
        catch (error) {
            console.log("error", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendEmail3(email, subject, text) {
        console.log("sendEmail3");
        console.log("email", email);
        console.log("subject", subject);
        console.log("text", text);
        const username = 'api';
        const password = this.mailgun_apikey;
        const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log("base64Credentials", base64Credentials);
        let data = new formData();
        data.append('from', 'Manipal MedAcers medacers@manipalmedace.com');
        data.append('to', 'suraj_k@tekditechnologies.com');
        data.append('subject', 'Hello');
        data.append('text', 'Testing2 some Mailgun awesomeness!');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.mailgun.net/v3/manipalmedace.com/messages',
            headers: Object.assign({ 'Authorization': `Basic ${base64Credentials}` }, data.getHeaders()),
            data: data
        };
        try {
            let res = await axios.request(config);
            console.log("msg", res.data);
            return res.data;
        }
        catch (error) {
            console.log("error", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendEmail(email, subject, text) {
        console.log("sendEmail 256");
        const axios = require('axios');
        const FormData = require('form-data');
        let data = new FormData();
        data.append('from', 'Manipal MedAcers medacers@manipalmedace.com');
        data.append('to', `${email}`);
        data.append('subject', `${subject}`);
        data.append('html', `${text}`);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.mailgun.net/v3/manipalmedace.com/messages',
            headers: Object.assign({ 'Authorization': 'Basic YXBpOjA2NGY0ZmE3Y2UzZWIyMWEwYTNhYmY2Mzk1ZDA3YTc1LTdjYTE0NGQyLTkwZjUxNDA4' }, data.getHeaders()),
            data: data
        };
        try {
            let res = await axios.request(config);
            console.log("msg", res.data);
            return res.data;
        }
        catch (error) {
            console.log("error", error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_1.UtilService,
        config_1.ConfigService,
        logger_service_1.LoggerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map