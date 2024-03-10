import logger from './appconfig/logger'
import App from './app';
import { Config } from './appconfig';

interface STARTUP {
    API_PORT?: string;
    APP_NAME?: string;
    MONGO_URL?: string;
}

(async () => {
    try {
        logger.info('Server starting...');

        const config = new Config();

        const {
            API_PORT,
            APP_NAME,
            MONGO_URL
        }: STARTUP = config._config();

        const app = new App().app;

        const server = app.listen(API_PORT, () => {
            logger.info(`App ${APP_NAME || 'Unnamed'} started on Port: ${API_PORT}`);
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            logger.info('Received SIGINT. Shutting down gracefully...');
            server.close(() => {
                logger.info('Server closed. Exiting process.');
                process.exit(0);
            });
        });

        process.on('SIGTERM', () => {
            logger.info('Received SIGTERM. Shutting down gracefully...');
            server.close(() => {
                logger.info('Server closed. Exiting process.');
                process.exit(0);
            });
        });
    } catch (error: any) {
        logger.error(error.stack || error);
        process.exit(1);
    }
})();