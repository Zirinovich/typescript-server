import * as React from 'react';
import {i18nReducer, i18nActions, Loc} from 'redux-react-i18n';

import {IAction} from '../interfaces/common/IAction';

interface ILocalisationAction extends IAction {
    data: any;
}

interface IDictionary {
    [code: string]: any;
}

interface ILanguage {
    code: string;
    name: string;
}

class Localization {
    t(key: string) {
        return (
            <Loc locKey={key}/>
        )
    }

    getCurrentDictionary(state: any): any {
        return state && state.i18n ? state.i18n.dictionaries[this.getCurrentLanguage(state)] : null;
    }

    getCurrentLanguage(state: any): string {
        return state && state.i18n ? state.i18n.currentLanguage : null;
    }

    getLanguages(state: any): ILanguage[] {
        return state && state.i18n ? state.i18n.languages : null;
    }

    getReducer() {
        return i18nReducer;
    }

    setDictionaries: (dictionaries: IDictionary[])=>ILocalisationAction = i18nActions.setDictionaries;
    setLanguages: (languages: ILanguage[])=>ILocalisationAction = i18nActions.setLanguages;
    setCurrentLanguage: (languageCode: string)=>ILocalisationAction = i18nActions.setCurrentLanguage;
}

const localization = new Localization();

export {localization};