import * as React from 'react';
import {i18nActions, Loc} from 'redux-react-i18n';

class Localisation {
    t(key) {
        return (
            <Loc locKey={key}/>
        )
    }

    getCurrentLanguage(state) {
        return state && state.i18n ? state.i18n.currentLanguage : null;
    }

    getLanguages(state){
        return state && state.i18n ? state.i18n.languages: null;
    }

    setDictionaries = i18nActions.setDictionaries;
    setLanguages = i18nActions.setLanguages;
    setCurrentLanguage = i18nActions.setCurrentLanguage;
}

const localisation = new Localisation();

export {localisation};