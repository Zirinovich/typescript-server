import Reducer = Redux.Reducer;

interface IApplication {
    rootReducer: Reducer<any>
}

export class Application implements IApplication {
    rootReducer = ({} as any);
}