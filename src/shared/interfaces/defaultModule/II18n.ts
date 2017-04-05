export interface II18n {
    currentLanguage: string;
    languages: {
        code: string;
        name: string;
    }[]
    resources: {
        [languageCode: string]: {
            [key: string]: any
        }
    }
}