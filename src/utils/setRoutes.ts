import {RequestHandler, Router} from "express";

import {RoutesConfigClass} from "./getRoutesConfig";

export const convertToRouter = (controller: RoutesConfigClass): Router => {
    if (!controller.__routes_config__)
        throw new Error('Invalid controller: The __route_config__ doesn\'t exists on controller Object');
    if (!controller.__routes_config__.url)
        throw new Error('Invalid controller: The url doesn\'t exist on __route_config object on controller');

    const router = Router() ;
    const routes = Object.values(controller.__routes_config__.routes);

    for (const {url, method, stack} of routes)
        router[method](url, ...stack);

    const subControllers = Object.values(controller.__routes_config__.subControllers);

    for (const subController of subControllers) {
        const subRouter = convertToRouter(subController);
        router.use(subController.__routes_config__!.url, subRouter);
    }

    return router;
};

interface IRouter {
    use: (path: string, handler: RequestHandler) => void;
}

const setRoutes = (controller: RoutesConfigClass, router: IRouter) => {
    const controllerRouter = convertToRouter(controller);

    router.use(controller.__routes_config__!.url, controllerRouter);
};

export default setRoutes;
