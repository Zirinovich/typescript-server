import * as React from 'react';
import * as i18next from 'i18next'

import {setCurrentLanguage, setLanguages, setResources} from './i18nActions';
import {i18nReducer} from './i18nReducer';
import {Loc} from './loc';

class I18n {
    t(key: string, options?: any) {
        return <Loc locKey={key} options={options}/>
    }

    getCurrentDictionary(state: any) {
        return state && state.i18n ? state.i18n.resources[this.getCurrentLanguage(state)] : null;
    }

    getCurrentLanguage(state: any) {
        return state && state.i18n ? state.i18n.currentLanguage : null;
    }

    getResources(state: any) {
        return state && state.i18n ? state.i18n.resources : null;
    }

    getLanguages(state: any) {
        return state && state.i18n ? state.i18n.languages : null;
    }

    getReducer() {
        return i18nReducer;
    }

    getString(state: any, locKey: string, options?: any) {
        const currentLanguage = this.getCurrentLanguage(state);
        const resources = this.getResources(state);
        i18next.init({
            lng: currentLanguage,
            resources: resources
        });
        return i18next.t(locKey, options);
    }

    setCurrentLanguage = setCurrentLanguage;
    setResources = setResources;
    setLanguages = setLanguages;
}

const i18n = new I18n();

export {i18n};