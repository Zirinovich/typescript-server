export interface IClientApplication<TStoreInterface> {
    rootReducer: Redux.Reducer<TStoreInterface>,
    clientRoutes: any,
    languages: any,
    dictionaries: any,
    configureStore(history: any, initialState?: TStoreInterface): Redux.Store<TStoreInterface>
}