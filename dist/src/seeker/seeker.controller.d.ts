import { CreateContentDto } from 'src/dto/createContent.dto';
import { CreateSeekerDto } from 'src/dto/createSeeker.dto';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
import { LoggerService } from 'src/services/logger/logger.service';
import { SeekerService } from './seeker.service';
export declare class SeekerController {
    private readonly seekerService;
    private readonly logggerService;
    constructor(seekerService: SeekerService, logggerService: LoggerService);
    resetPassword(request: any, resetPasswordDto: ResetPasswordDto): Promise<any>;
    getContent(request: any, getContentdto?: CreateContentDto): Promise<any>;
    searchCollection(request: any, body: any): Promise<any>;
    getScholarship(request: any, body: any): Promise<any>;
    createContentBookmark(request: any, createContentdto?: CreateContentDto): Promise<any>;
    removeBookmarkContent(request: any, id: any): Promise<any>;
    getCollection(request: any): Promise<any>;
    getCollectionContent(request: any, id: any): Promise<any>;
    createBookmark(request: any, body: any): Promise<any>;
    getBookmark(request: any): Promise<any>;
    getBookmarkContent(request: any, id: any): Promise<any>;
    updateBookmark(request: any, id: any, body: any): Promise<any>;
    deleteCollection(request: any, id: any): Promise<any>;
    addContentBookmark(request: any, body: any): Promise<any>;
    deleteContentBookmark(request: any, id: any): Promise<any>;
    createConfig(request: any, createSeekerDto: CreateSeekerDto): Promise<any>;
    getConfig(request: any): Promise<any>;
}
