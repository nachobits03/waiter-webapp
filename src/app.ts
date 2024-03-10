
import express from "express";
import { Config } from "./appconfig";
import { AuthRouter } from "../routes";
import actuator from "express-actuator";



export default class App {
    public app: express.Application;

    constructor(){
        const config = new Config()._config();
        const basePath = `/${config.APP_NAME}`

        const options = {
            basePath: basePath}

        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(actuator(options))

        this.app.use(basePath, AuthRouter);
    }
}