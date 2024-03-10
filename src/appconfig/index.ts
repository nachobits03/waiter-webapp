
const environment = process.env.NODE_ENV;
import * as path from 'path';


interface ENV {
    API_PORT?: string;
    APP_NAME?: string;
    MONGO_URL?: string;
}

export class Config {
    _config(): ENV {
        // dotenv.config({path: path.resolve( `./../../config/.env.${environment}`) });
        // console.log(dotenv.config.toString())
        return {
            API_PORT: process.env.API_PORT,
            APP_NAME: process.env.APP_NAME, // Corrected variable name here
            MONGO_URL: process.env.MONGO_URL
        };
    }
}
