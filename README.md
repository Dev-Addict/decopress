# _Decopress_
###### Decopress is a tool to help you write cleaner Express.js code using typescript decorators.
### _Installation_
* Using **_npm_**: \
`npm install decopress`
* Using **_yarn_**: \
`yarn add decopress`
### _Quick Start_
creating a controller
```
import {NextFunction, Request, Response} from 'express';
import {Controller, Get, Middleware} from 'decopress';

const middleware1 = (req: Request, res: Response, next: NextFunction) => {
    console.log('in middleware1');
    next();
};

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
    console.log('in middleware2');
    next();
};

@Controller('/')
class ExampleController {
    @Middleware(middleware1, middleware2)
    @Get('/')
    hello(req: Request, res: Response) {
        res.json({
            message: 'hello'
        });
    }
}
```
connect controller with app
```
import express from 'express';
import {setRoutes} from 'decopress';

const app = express();

// controller we made in the top code example
const controller = new ExampleController();

setRoutes(controller, app);
```

### _Controller Class_
#### _Controller Decorator_
You can use **Controller** decorator to create decorator classes.

> Note: if you don't apply **Controller** decorator to controller class while you are trying to convert your controllers into routes you will face errors.

**Controller** accepts one argument and that the url(path) and url is required.
```
import {Controller} from 'decopress';

const url = '/path'

@Controller(url)
class ExampleController {
    ...
}
```

#### _CMiddleware Decorator_
You can use **CMiddleware** decorator to add middleware to your controller class. 

> Note: You should use **CMiddleware** decorator before **Controller** decorator and you can use **CMiddleware** as much as you like and it will run in order.

**CMiddleware** decorator accepts spread middleware of type RequestHandler from express package.
```
import {RequestHandler} from 'express';
import {Controller, CMiddleware} from 'decopress';

const middleware1: RequestHandler = (req, res, next) => {
    console.log('in middleware1');

    next();
};

const middleware1: RequestHandler = (req, res, next) => {
    console.log('in middleware1');

    next();
};

@CMiddleware(middleware1, middleware2)
@Controller('/')
class ExampleController {
    ...
}
```

### _Method Decorators_
There is **Get**, **Post**, **Put**, **Patch**, **Delete**, and **All** method decorators they all accept only url(path) and the method of type Request handler in the class and represent the method of the name.

> Note: by my convention the method name is the path(it's not required)
```
import {Controller, Get} from 'decopress';

@Controller('/')
class ExampleController {
    @Get('/hello')
    hello(req: Request, res: Response) {
        res.json({
            message: "hello"
        });
    }
}
``` 
#### _Middleware Decorator_
**Middleware** decorator is used to add middleware to request stack. it works the same way as **CMiddleware** decorator. and it accept arguments of type RequestHandler from express package.

> Note: it is required to use it before **Method** Decorators.
```
import {RequestHandler} from 'express';
import {Controller, Get, Middleware} from 'decopress';

const middleware1: RequestHandler = (req, res, next) => {
    console.log('in middleware1');

    next();
};

const middleware1: RequestHandler = (req, res, next) => {
    console.log('in middleware1');

    next();
};

@Controller('/')
class ExampleController {
    @Middleware(middleware1, middleware2)
    @Get('/hello')
    hello(req: Request, res: Response) {
        res.json({
            message: "hello"
        });
    }
}
```
#### _Use Method Decorator_
**Use** method decorator is an special method decorator that can help you handle sub controllers all you have to do is in the method return instance of your controller.

> Note: by my convention the method name for **Use** method decorator is as same as class name
```
import {Controller, Use} from 'decopress';

@Controller('/2')
class ExampleController2 {
}

@Controller('/')
class ExampleController {
    @Use('/')
    ExampleController2() {
        return new ExampleControler2();
    }
}
```

### _Get Result_
getting results is easy in decopress just you have to import **setRoutes** and then **setRoutes** accept to arguments the first one is instance of your controller class and the second one is either instance of Router from express package or your app.
```
import express from 'express';
import {setRoutes} from 'decopress';
    
const app = express();

...

// I'm using ExampleController from top examples
setRoutes(new ExampleController(), app);
```
