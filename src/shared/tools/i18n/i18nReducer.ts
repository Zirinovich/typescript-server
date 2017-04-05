import {
    SET_CURRENT_LANGUAGE,
    SET_RESOURCES,
} from './i18nActions';
import {II18n} from './II18n';

const initialState: II18n = {
    currentLanguage: 'ru',
    languages: [],
    resources: {}
};

export function i18nReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE: {
            let newState = _.assign({}, state);
            newState.currentLanguage = action.data;
            return newState
        }

        case SET_RESOURCES: {
            return _.assign({}, state, {resources: action.data.resources, languages: action.data.languages});
        }

        default:
            return state || initialState
    }
}
