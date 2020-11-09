import {RouterOptions} from "express";

import getRoutesConfig, {RoutesConfig} from "../utils/getRoutesConfig";

export default function Controller(url: string, routerOptions?: RouterOptions) {
    return (target: any): void => {
        const routesConfig: RoutesConfig = getRoutesConfig(target.prototype);

        routesConfig.url = url;
        routesConfig.routerOptions = routerOptions;
    };
}
