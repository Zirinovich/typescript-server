export interface ILanguage {
    code: string;
    name: string;
}

export interface IResources {
    [languageCode: string]: {
        [key: string]: any
    }
}

export interface II18n {
    currentLanguage: string;
    languages: ILanguage[]
    resources: IResources
}