import {
    SET_CURRENT_LANGUAGE,
    SET_LANGUAGES,
    SET_RESOURCES
} from './i18nActions';
import {II18n} from './II18n';

const initialState: II18n = {
    currentLanguage: 'ru-RU',
    languages: [],
    resources: {}
};

export function i18nReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE: {
            return Object.assign({}, state, {
                currentLanguage: action.languageCode
            });
        }

        case SET_LANGUAGES : {
            return Object.assign({}, state, {
                languages: action.languages
            });
        }

        case SET_RESOURCES: {
            const languages = state.languages;
            let resources = state.resources;
            const resourcesKey = 'translation';
            languages.map((lang) => {
                if(!resources[lang.code]) resources[lang.code] = {};
                if(!resources[lang.code][resourcesKey]) resources[lang.code][resourcesKey] = {};
                resources[lang.code][resourcesKey][action.key] = action.resources[lang.code];
            });
            return Object.assign({}, state, {resources});
        }

        default:
            return state || initialState;
    }
}
