/// <reference types="multer" />
import { HasuraService } from '../services/hasura/hasura.service';
import { S3Service } from 'src/services/s3/s3.service';
export declare class ProviderService {
    private readonly hasuraService;
    private readonly s3Service;
    constructor(hasuraService: HasuraService, s3Service: S3Service);
    createContent(id: any, createContentdto: any): Promise<any>;
    getContent(id: any): Promise<any>;
    getContentById(id: any, provider_id: any): Promise<any>;
    editContent(id: any, createContentdto: any): Promise<any>;
    deleteContent(id: any, provider_id: any): Promise<any>;
    resetPassword(email: any, resetPasswordDto: any): Promise<any>;
    createCollection(provider_id: any, body: any): Promise<any>;
    getCollection(provider_id: any): Promise<any>;
    getCollectionContent(id: any): Promise<any>;
    updateCollection(id: any, provider_id: any, body: any): Promise<any>;
    deleteCollection(id: any, provider_id: any): Promise<any>;
    createContentCollection(body: any): Promise<any>;
    deleteContentCollection(id: any): Promise<any>;
    createBulkContent1(provider_id: any, data: any): Promise<any>;
    createBulkContent(provider_id: any, result: any): Promise<any[] | {
        error: string;
    }>;
    arraysHaveSameElements(arr1: any, arr2: any): any;
    addFile(file: Express.Multer.File, document_type: string): Promise<{
        imageUrl: string;
        mimetype: string;
        key: string;
    }>;
    getFile(id: string): Promise<string>;
    createScholarship(provider_id: any, scholarship: any): Promise<any>;
    getScholarship(provider_id: any): Promise<any>;
    getScholarshipById(id: any, provider_id: any): Promise<any>;
    editScholarshipById(id: any, provider_id: any, scholarship: any): Promise<any>;
}
