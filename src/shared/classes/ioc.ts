import * as _ from 'lodash';

export default class Ioc {
    private static bindings: Bind[] = [];

    public static register(name: string, isSingletone: boolean, obj: any, params?: any) {
        this.registerMany([name], isSingletone, obj, params);
    }

    public static registerMany<T>(name: string[], isSingletone: boolean, obj: T, params?: any, removeRegistrations: boolean = true): T {
        let bind = new Bind();
        bind.identifiers = name;
        bind.paramsCreate = params;
        bind.isSingletone = isSingletone;
        if (typeof (obj) == "function") {
            bind.classObj = obj;
        } else {
            bind.isSingletone = true;
            bind.instanceObj = obj;
        }
        if (removeRegistrations) {
            _.remove(this.bindings, (b) => {
                return _.isEqual(b.identifiers.sort(), name.sort())
            });
        }
        this.bindings.push(bind);
        return obj;
    }

    public static initModule<T>(name: string): T {
        return Ioc.resolve<T>(name);
    }

    public static resolve<T>(name: string): T {
        let res: T[] = this.resolvePrivate<T>(name, true);
        if (res.length > 0)
            return res[0];
        else
            return undefined;
    }

    public static resolveMany<T>(name: string): T[] {
        return this.resolvePrivate<T>(name, false);
    }

    private static resolvePrivate<T>(name: string, isSingle: boolean): T[] {
        let res: T[] = [];
        _.forEach(this.bindings, (bind/*, key*/) => {
            let find: string = _.find(bind.identifiers, (ident) => ident === name);
            if (find) {
                if (bind.isSingletone) {
                    if (bind.instanceObj) {
                        res.push(bind.instanceObj);
                        if (isSingle)
                            return false;
                    } else {
                        bind.instanceObj = new bind.classObj(bind.paramsCreate);
                        res.push(bind.instanceObj);
                        if (isSingle)
                            return false;
                    }
                } else {
                    res.push(new bind.classObj(bind.paramsCreate));
                    if (isSingle)
                        return false;
                }
            }
        });
        return res;
    }
}
class Bind {
    identifiers: Array<any>;
    classObj: any;
    instanceObj: any;
    isSingletone: boolean;
    paramsCreate: boolean;
}
//Ioc.registerMany(["IMap", "IModule"], true, MapModule.default);
//Ioc.registerMany(["IGeoObjects","IModule"],true,new IGeoObjectsDefault())
//let modules: IModule[] = Ioc.resolveMany<IModule>("IModule");