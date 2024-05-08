import { HasuraService } from 'src/services/hasura/hasura.service';
export declare class SeekerService {
    private readonly hasuraService;
    constructor(hasuraService: HasuraService);
    resetPassword(email: any, resetPasswordDto: any): Promise<any>;
    getContent(getContentdto: any): Promise<any>;
    searchCollection(getCollectiondto: any): Promise<any>;
    createContentBookmark(id: any, createContentdto: any): Promise<any>;
    removeBookmarkContent(id: any, seeker_id: any): Promise<any>;
    getCollection(): Promise<any>;
    getCollectionContent(id: any): Promise<any>;
    createBookmark(seeker_id: any, body: any): Promise<any>;
    getBookmark(seeker_id: any): Promise<any>;
    getBookmarkContent(id: any, seeker_id: any): Promise<any>;
    updateBookmark(id: any, seeker_id: any, body: any): Promise<any>;
    deleteBookmark(id: any, seeker_id: any): Promise<any>;
    addContentBookmark(body: any): Promise<any>;
    deleteContentBookmark(id: any, seeker_id: any): Promise<any>;
    createConfig(user_id: any, body: any): Promise<any>;
    getConfig(user_id: any): Promise<any>;
    getScholarship(getContentdto: any): Promise<any>;
}
