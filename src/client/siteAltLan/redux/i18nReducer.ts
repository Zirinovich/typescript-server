import {
    SET_CURRENT_LANGUAGE,
    SET_LANGUAGES,
    SET_RESOURCES,
} from './i18nActions';
import {II18n} from '../../../shared/interfaces/defaultModule/II18n';

const initialState: II18n = {
    currentLanguage: 'ru',
    languages: [
        {
            code: 'ru',
            name: 'Русский'
        },
        {
            code: 'en',
            name: 'English'
        }
    ],
    resources: {
        en: {
            translation: {
                'mainPage': 'Main',
                'labPage': 'LAB',
                'contactsPage': 'Contacts',
                'presentationsPage': 'Presentations of solutions',
                'partnersPage': 'Partners',
                'ossPage': 'OSS solutions',
                'language': 'Language',
                'actionLogin': 'Login',
                'actionLogout': 'Logout'
            }
        },
        ru: {
            translation: {
                'mainPage': 'Главная',
                'labPage': 'LAB',
                'contactsPage': 'Контакты',
                'presentationsPage': 'Презентации решений',
                'partnersPage': 'Партнеры',
                'ossPage': 'OSS решения',
                'language': 'Язык',
                'actionLogin': 'Войти',
                'actionLogout': 'Выйти'
            }
        }
    }
};

export function i18nReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_LANGUAGE: {
            let newState = Object.assign({}, state);
            newState.currentLanguage = action.data;
            return newState
        }

        case SET_LANGUAGES: {
            let newState = Object.assign({}, state);
            newState.languages = action.data;
            return newState
        }

        case SET_RESOURCES: {
            let newState = Object.assign({}, state);
            newState.resources = action.data;
            return newState
        }

        default:
            return state || initialState
    }
}
