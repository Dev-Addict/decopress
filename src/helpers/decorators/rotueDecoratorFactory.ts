import getRoutesConfig, {Method, RoutesConfig} from "../../utils/getRoutesConfig";

export default function routeDecoratorFactory(method: Method, url: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const {routes}: RoutesConfig = getRoutesConfig(target);

        routes[url] = {
            method,
            stack: [descriptor.value]
        };

        return descriptor;
    }
}
