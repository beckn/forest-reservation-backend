import { HttpService } from '@nestjs/axios';
import { components } from 'types/schema';
import { HasuraService } from './services/hasura/hasura.service';
import { AuthService } from './auth/auth.service';
import { S3Service } from './services/s3/s3.service';
export declare class AppService {
    private readonly httpService;
    private readonly hasuraService;
    private readonly authService;
    private readonly s3Service;
    constructor(httpService: HttpService, hasuraService: HasuraService, authService: AuthService, s3Service: S3Service);
    private base_url;
    private dbName;
    getHello(): string;
    getCoursesFromFlnV3(body: {
        context: components['schemas']['Context'];
        message: {
            intent: components['schemas']['Intent'];
        };
    }): Promise<any>;
    getContent(body: {
        context: components['schemas']['Context'];
        message: {
            intent: components['schemas']['Intent'];
        };
    }): Promise<any>;
    handleSelect(selectDto: any): Promise<any>;
    handleInit(selectDto: any): Promise<any>;
    handleConfirm1(confirmDto: any): Promise<any>;
    handleConfirm(confirmDto: any): Promise<any>;
    handleRating(ratingDto: any): Promise<any>;
    handleSubmit(description: any, id: any): Promise<any>;
    isValidUrl(str: string): boolean;
}
