import {IAction} from '../../interfaces/IAction';
import {ILanguage} from './II18n';

export const SET_CURRENT_LANGUAGE = 'i18n/SET_CURRENT_LANGUAGE';
export const SET_LANGUAGES = 'i18n/SET_LANGUAGES';
export const SET_RESOURCES = 'i18n/SET_RESOURCES';

export interface ISetCurrentLanguageAction extends IAction {
    languageCode: string;
}

export interface ISetLanguagesAction extends IAction {
    languages: ILanguage[]
}

export interface ISetResources extends IAction {
    key: string
    resources: any;
}

export function setCurrentLanguage(languageCode): ISetCurrentLanguageAction {
    return {
        type: SET_CURRENT_LANGUAGE,
        languageCode
    };
}

export function setLanguages(languages): ISetLanguagesAction {
    return {
        type: SET_LANGUAGES,
        languages
    };
}

export function setResources(key: string, resources: any): ISetResources {
    return {
        type: SET_RESOURCES,
        key,
        resources
    }
}