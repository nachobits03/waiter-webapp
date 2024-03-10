
const environment = process.env.NODE_ENV;
import * as path from 'path';


interface ENV {
    API_PORT?: string;
    APP_NAME?: string;
    MONGO_URL?: string;
}

export class Config {
    _config(): ENV {
        return {
            API_PORT: process.env.API_PORT,
            APP_NAME: process.env.APP_NAME, 
            MONGO_URL: process.env.MONGO_URL
        };
    }
}
