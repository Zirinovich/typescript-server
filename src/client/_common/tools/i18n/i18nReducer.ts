import {IAction} from '../../interfaces/IAction';
import {
    SET_CURRENT_LANGUAGE,
    SET_LANGUAGES,
    SET_RESOURCES,
    ISetCurrentLanguageAction,
    ISetLanguagesAction,
    ISetResources
} from './i18nActions';
import {II18n} from './II18n';

const initialState: II18n = {
    currentLanguage: 'ru-RU',
    languages: [],
    resources: {}
};

export function i18nReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE: {
            const {languageCode} = <ISetCurrentLanguageAction>action;
            return Object.assign({}, state, {
                currentLanguage: languageCode
            });
        }

        case SET_LANGUAGES : {
            const {languages} = <ISetLanguagesAction>action;
            return Object.assign({}, state, {languages});
        }

        case SET_RESOURCES: {
            const {key, resources} = <ISetResources>action;
            const languages = state.languages;
            let resourcesObject = state.resources;

            const resourcesKey = 'translation';
            languages.map((lang) => {
                if(!resourcesObject[lang.code]) resourcesObject[lang.code] = {};
                if(!resourcesObject[lang.code][resourcesKey]) resourcesObject[lang.code][resourcesKey] = {};
                resourcesObject[lang.code][resourcesKey][key] = resources[lang.code];
            });
            return Object.assign({}, state, {resources: resourcesObject});
        }

        default:
            return state || initialState;
    }
}
