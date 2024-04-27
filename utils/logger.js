import winston from 'winston'
import { generateUUIDv1 } from './uuidGenrator.js';

const infoLog = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

const errLog = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

export const infoLogger = (message) => {
    infoLog.info(message);
};

export const errorLogger = (message, stack) => {
    //* append the error message with the uuid
    const errId = generateUUIDv1();
    message = `🆔 ${errId} ↔ 🔴 ${message} \n↔ 🟡 ${stack}`;
    errLog.error(message);
    return errId;
};

