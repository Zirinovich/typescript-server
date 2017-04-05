export interface IClientApplication<TStoreInterface> {
    rootReducer: Redux.Reducer<TStoreInterface>;
    clientRoutes: any;
    localizationResources: any;
    configureStore(history: any, initialState?: TStoreInterface): Redux.Store<TStoreInterface>;
}