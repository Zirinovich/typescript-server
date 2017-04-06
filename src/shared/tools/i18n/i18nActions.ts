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

export function setResources(resources): II18nAction {
    let languages = [];
    _.forEach(resources, function(directory, languageCode){
        languages.push({
            code: languageCode,
            name: directory.name
        });
    });
    return {
        type: SET_RESOURCES,
        data: {
            resources,
            languages
        }
    };
}