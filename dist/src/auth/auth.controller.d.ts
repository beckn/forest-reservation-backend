import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { Response } from 'express';
import { LoggerService } from 'src/services/logger/logger.service';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService, logger: LoggerService);
    create(createUserDto: CreateUserDto): Promise<any>;
    login(request: any, response: Response): Response<any, Record<string, any>>;
    infoLog(): Promise<string>;
    errorLog(): Promise<string>;
}
