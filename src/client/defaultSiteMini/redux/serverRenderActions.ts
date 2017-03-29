import {IAction} from '../../../shared/interfaces/defaultModule/IAction';

export const ARTICLE_GET_REQUEST: string = 'article/GET_REQUEST';
export const ARTICLE_GET_SUCCESS: string = 'article/GET_SUCCESS';
export const ARTICLE_GET_FAILURE: string = 'article/GET_FAILURE';

export interface IArticleAction extends IAction {
    payload: {
        text?: string,
        message?: any
    }
}

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    });
}

export function getArticle(artNumber: number) {
    return () => {
        console.log(`fetching article ${artNumber}`);
        return fetch(`http://localhost:8889/api/public/article/${artNumber}`)
            .then((res) => {
                if (artNumber === 2) {
                    return delay(1000).then(() => {
                        return res.text()
                    });
                }
                else {
                    return res.text();
                }
            })
            .catch((err) => {
                return err;
            })
    }
}

/*
export function articleRequest(): IAction {
    return {
        type: ARTICLE_GET_REQUEST,
    };
}

export function articleSuccess(text: string): IArticleAction {
    return {
        type: ARTICLE_GET_SUCCESS,
        payload: {
            text
        }
    }
}

export function articleFailure(message: any): IArticleAction {
    return {
        type: ARTICLE_GET_FAILURE,
        payload: {
            message
        }
    }
}*/
