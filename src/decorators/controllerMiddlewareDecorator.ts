import {RequestHandler} from "express";
import getRoutesConfig, {RoutesConfig} from "../utils/getRoutesConfig";

export default function CMiddleware(...middlewares: RequestHandler[]) {
    return (target: any) => {
        const routesConfig: RoutesConfig = getRoutesConfig(target.prototype);

        routesConfig.middleware.unshift(...middlewares);
    };
}
