import {GET_FILES_SUCCESS, IGetFilesSuccessAction} from './filesActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: any[];
}

const initialState = {
    list: []
};


export function filesReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_FILES_SUCCESS:
            const {list} = <IGetFilesSuccessAction>action;
            return Object.assign({}, state, {list});
        default:
            return state;
    }
}
