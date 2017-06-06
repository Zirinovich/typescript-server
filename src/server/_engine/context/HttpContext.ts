const contextService = require('request-context');

export class HttpContext {
    static Setup() {
        return contextService.middleware('contextCurrent');
    };

    static Set(name: string, value: any, next) {
        contextService.set('contextCurrent:' + name, value);
        next();
    }

    static GetFromCurrent<T>(name: string): T {
        return contextService.get('contextCurrent:' + name);
    }
}