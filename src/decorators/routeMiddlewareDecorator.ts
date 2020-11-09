import {RequestHandler} from "express";
import getRoutesConfig, {RoutesConfig} from "../utils/getRoutesConfig";

export default function Middleware(...middlewares: RequestHandler[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const {routes}: RoutesConfig = getRoutesConfig(target);

        if (!routes[key])
            throw new Error('route is unset. try use one of the route decorators after middleware decorator.');
        routes[key].stack.unshift(...middlewares);

        return descriptor;
    };
}
