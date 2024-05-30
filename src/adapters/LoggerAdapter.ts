import { Logger } from "../logger";

export type LogLevels = 'info' | 'error';

export interface LoggerAdapterInterface {
    log(message: string, level: LogLevels): void;
}

class LoggerAdapter implements LoggerAdapterInterface {
    private logger: LoggerAdapterInterface;

    constructor () {
        this.logger = new Logger();
    }
        
    log(message: string, level: LogLevels): void {
        this.logger.log(message, level);
    }
}

const loggerAdapter = new LoggerAdapter();

export default loggerAdapter;