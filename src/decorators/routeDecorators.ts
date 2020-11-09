import routeDecoratorFactory from "../helpers/decorators/rotueDecoratorFactory";

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
