import fs from 'fs';
import date from 'date-and-time';

import { LogLevels, LoggerAdapterInterface } from "./adapters/LoggerAdapter";

class FileLogger {
    readLogFile(path: string) {
        if (fs.existsSync(path)) {
            const fileContent = fs.readFileSync(path, { encoding: 'utf-8' });

            return fileContent;
        }

        return '';
    }

    createLogFile(message: string) {
        const _dateNow = new Date();
        const _now = date.format(_dateNow, 'DD-MM-YYYY');
        const _fileContent = this.readLogFile(`src/logs/log-${_now}.txt`);
        const _toWrite = `[${date.format(_dateNow, 'HH:mm:ss')}] - ${message}`;

        return fs.writeFileSync(`src/logs/log-${_now}.txt`, `${_fileContent}${_toWrite}`);
    }
}

const fileLogger = new FileLogger();

export class Logger implements LoggerAdapterInterface {
    log(message: string, level: LogLevels): void {
        const _output = `[${level}] - ${message}\n`;

        fileLogger.createLogFile(_output);

        console.log(_output);
    }
}