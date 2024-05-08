/// <reference types="multer" />
import { ProviderService } from './provider.service';
import { LoggerService } from '../services/logger/logger.service';
import { CreateContentDto } from '../dto/createContent.dto';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
import { ScholarshipDto } from 'src/dto/scholarship.dto';
export declare class ProviderController {
    private readonly providerService;
    private readonly logggerService;
    constructor(providerService: ProviderService, logggerService: LoggerService);
    createContent(request: any, createContentdto?: CreateContentDto): Promise<any>;
    getContent(request: any): Promise<any>;
    getContentById(request: any, id: any): Promise<any>;
    editContent(request: any, id: any, createContentdto?: CreateContentDto): Promise<any>;
    deleteContent(request: any, id: any): Promise<any>;
    resetPassword(request: any, resetPasswordDto: ResetPasswordDto): Promise<any>;
    createCollection(request: any, body: any): Promise<any>;
    getCollection(request: any): Promise<any>;
    getCollectionContent(request: any, id: any): Promise<any>;
    updateCollection(request: any, id: any, body: any): Promise<any>;
    deleteCollection(request: any, id: any): Promise<any>;
    createContentCollection(request: any, body: any): Promise<any>;
    deleteContentCollection(request: any, id: any): Promise<any>;
    createBulkContent(request: any, body: any): Promise<any[] | {
        error: string;
    }>;
    uploadCSV(file: Express.Multer.File, request: any): Promise<unknown>;
    addFile(file: Express.Multer.File, document_type: string): Promise<{
        imageUrl: string;
        mimetype: string;
        key: string;
    }>;
    getFileUrl(id: string): Promise<string>;
    createScholarship(request: any, scholarship?: ScholarshipDto): Promise<any>;
    getScholarship(request: any): Promise<any>;
    getScholarshipById(request: any, id: any): Promise<any>;
    editScholarshipById(request: any, id: any, scholarship?: ScholarshipDto): Promise<any>;
}
