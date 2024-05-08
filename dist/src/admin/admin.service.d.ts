import { HasuraService } from 'src/services/hasura/hasura.service';
import { EmailService } from 'src/services/email/email.service';
export declare class AdminService {
    private readonly hasuraService;
    private readonly emailService;
    private readonly baseUrl;
    constructor(hasuraService: HasuraService, emailService: EmailService);
    getProviderList(): Promise<any>;
    getProviderInfoById(id: any): Promise<any>;
    getSeekerList(): Promise<any>;
    getSeekerInfoById(id: any): Promise<any>;
    updateapprovalStatus(id: any, createUserDto: any): Promise<any>;
    updateEnableStatus(id: any, createUserDto: any): Promise<any>;
    createAdmin(createUserDto: any): Promise<any>;
}
