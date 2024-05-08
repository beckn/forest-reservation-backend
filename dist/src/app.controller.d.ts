import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    getCoursesFromFln(body: any): Promise<any>;
    selectCourse(body: any): Promise<any>;
    initCourse(body: any): Promise<any>;
    confirmCourse(body: any): Promise<any>;
    giveRating(body: any): Promise<any>;
    getFeedbackForm(id: string): {
        id: string;
    };
    submitFeedback(description: string, id: string): Promise<any>;
    getContentFromIcar1(body: any): Promise<any>;
    selectCourse1(body: any): Promise<any>;
    initCourse1(body: any): Promise<any>;
    confirmCourse1(body: any): Promise<any>;
}
