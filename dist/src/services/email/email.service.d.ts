import { ConfigService } from '@nestjs/config';
import { UtilService } from './utility';
import { LoggerService } from 'src/services/logger/logger.service';
export declare class EmailService {
    private readonly utilService;
    private configService;
    private readonly logger;
    private aws_host;
    private aws_user;
    private aws_pass;
    mailgun_apikey: string;
    private mailgun_url;
    private mailgun_sender;
    constructor(utilService: UtilService, configService: ConfigService, logger: LoggerService);
    sendWelcomeEmail1(email: string): Promise<string>;
    generateRefCode(email: string): string;
    sendEmail1(): void;
    sendRequestedUserEmail(payload: any): Promise<void>;
    sendWelcomeEmail(email: string, name: string, mobile: string, referralCode: string): Promise<any>;
    sendEmail2(email: any, subject: any, text: any): Promise<any>;
    sendEmail3(email: any, subject: any, text: any): Promise<any>;
    sendEmail(email: any, subject: any, text: any): Promise<any>;
}
