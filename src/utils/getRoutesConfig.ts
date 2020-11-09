import {RequestHandler, RouterOptions} from 'express';

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
    url: string;
    method: Method;
    stack: RequestHandler[];
}

export interface RoutesConfigClass {
    __routes_config__?: RoutesConfig;
}

export interface RoutesConfig {
    url: string;
    routerOptions?: RouterOptions;
    routes: {
        [key: string]: Route;
    };
    middleware: RequestHandler[];
    subControllers: RoutesConfigClass[];
}

export default function getRoutesConfig(target: RoutesConfigClass): RoutesConfig {
    if (!target.__routes_config__)
        target.__routes_config__ = {
            url: '',
            routes: {},
            middleware: [],
            subControllers: []
        };

    return target.__routes_config__;
}
