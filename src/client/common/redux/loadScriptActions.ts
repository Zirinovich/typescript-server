import {IAction} from '../../../shared/interfaces/defaultModule/IAction';
export const LOAD_SCRIPT: string = 'common/LOAD_SCRIPT';

export interface ILoadScriptAction extends IAction {
    name: string;
    url: string;
    options?: any;
}

export function loadScript(name: string, url: string, options?: any): ILoadScriptAction {
    return {
        type: LOAD_SCRIPT,
        name,
        url,
        options
    }
}