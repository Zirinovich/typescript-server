//import * as i18next from 'i18next';

import {IAction} from '../../../shared/interfaces/common/IAction';

export const SET_CURRENT_LANGUAGE = 'i18n/SET_CURRENT_LANGUAGE';
export const SET_LANGUAGES = 'i18n/SET_LANGUAGES';
export const SET_RESOURCES = 'i18n/SET_RESOURCES';

export interface II18nAction extends IAction {
    data: any;
}

export function setCurrentLanguage(languageCode): II18nAction {
    return {
        type: SET_CURRENT_LANGUAGE,
        data: languageCode
    };
}

export function setLanguages(languages): II18nAction {
    return {
        type: SET_CURRENT_LANGUAGE,
        data: languages
    };
}

export function setResources(dictionaries): II18nAction {
    return {
        type: SET_CURRENT_LANGUAGE,
        data: dictionaries
    };
}