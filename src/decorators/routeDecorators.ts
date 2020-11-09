import routeDecoratorFactory from "../helpers/decorators/rotueDecoratorFactory";
import getRoutesConfig, {RoutesConfig} from "../utils/getRoutesConfig";

export function Get(url: string) {
    return routeDecoratorFactory('get', url);
}

export function Post(url: string) {
    return routeDecoratorFactory('post', url);
}

export function Put(url: string) {
    return routeDecoratorFactory('put', url);
}

export function Patch(url: string) {
    return routeDecoratorFactory('patch', url);
}

export function Delete(url: string) {
    return routeDecoratorFactory('delete', url);
}

export function All(url: string) {
    return routeDecoratorFactory('all', url);
}

export function Use() {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const {subControllers}: RoutesConfig = getRoutesConfig(target);

        subControllers.push(descriptor.value());

        return descriptor;
    };
}
