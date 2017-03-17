import {IAction} from '../../../shared/interfaces/defaultModule/IAction';
import {LOAD_SCRIPT, ILoadScriptAction} from './loadScriptActions';
import * as $ from 'jquery';
import {IScript} from '../../../shared/interfaces/common/IScript';

export function loadScriptReducer(state = null, action?: IAction): IScript {
    if (action.type === LOAD_SCRIPT) {
        let {name, url, options} = <ILoadScriptAction>action;
        return {
            name,
            url: url + "?" + $.param(options)
        }
    }
    return state;
}