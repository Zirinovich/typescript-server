export interface IClientApplication<TStoreInterface> {
    rootReducer: Redux.Reducer<TStoreInterface>,
    clientRoutes: any,
    configureStore(history: any, initialState?: TStoreInterface): Redux.Store<TStoreInterface>
}