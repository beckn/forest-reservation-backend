import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/services/logger/logger.service';
import { HasuraService } from '../services/hasura/hasura.service';
import { EmailService } from '../services/email/email.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly logger;
    private readonly hasuraService;
    private readonly emailService;
    smsKey: string;
    constructor(jwtService: JwtService, logger: LoggerService, hasuraService: HasuraService, emailService: EmailService);
    validateUser(request: any): Promise<any>;
    createUser(createUserDto: any): Promise<any>;
    findOne(email: any): Promise<any>;
    generateToken(payload: any): string;
}
