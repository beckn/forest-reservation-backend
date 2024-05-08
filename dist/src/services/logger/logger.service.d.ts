export declare class LoggerService {
    private logger;
    constructor();
    log(message: string, context?: string, level?: string): void;
    error(message: string, trace: string, context?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
}
