import { CreateUserDto } from '../dto/createUser.dto';
import { AdminService } from './admin.service';
import { LoggerService } from 'src/services/logger/logger.service';
export declare class AdminController {
    adminService: AdminService;
    private readonly logger;
    constructor(adminService: AdminService, logger: LoggerService);
    createAdmin(createuserDto: CreateUserDto): Promise<any>;
    getProviderList(): Promise<any>;
    getProviderInfoById(id: any): Promise<any>;
    getSeekerList(): Promise<any>;
    getSeekerInfoById(id: any): Promise<any>;
    updateapprovalStatus(id: any, createUserDto?: CreateUserDto): Promise<any>;
    updateEnableStatus(id: any, createUserDto?: CreateUserDto): Promise<any>;
}
