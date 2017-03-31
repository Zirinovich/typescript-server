import {IAction} from '../../../shared/interfaces/defaultModule/IAction';

export const ARTICLE_GET_REQUEST: string = 'article/GET_REQUEST';
export const ARTICLE_GET_SUCCESS: string = 'article/GET_SUCCESS';
export const ARTICLE_GET_FAILURE: string = 'article/GET_FAILURE';

export interface IArticleAction extends IAction {
    errorMessage?: any
}

export function getArticlePromise(artNumber: any) {
    if (!isNaN(artNumber)) {
        return fetch(`http://localhost:8889/api/public/article/${artNumber}`)
            .then((res) => {
                return res.text();
            })
    }
    return getArticleSerial();
}

async function getArticleSerial() {
    let first = await (await fetch(`http://localhost:8889/api/public/article/${67}`)).text();
    let second = await (await fetch(`http://localhost:8889/api/public/article/${89}`)).text();
    return first + "  --->>>  " + second;
}


function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    });
}

export function getArticle(artNumber: number) {
    return async(dispatch) => {
        dispatch(articleRequest());

        try {
            let response = await fetch(`http://localhost:8889/api/public/article/${artNumber}`);
            if (response.ok) {
                if (artNumber === 2) {
                    await delay(3000);
                    dispatch(articleSuccess());
                    return await response.text();

                }
                else {
                    dispatch(articleSuccess());
                    return await response.text();
                }
            }
            else {
                let errText = await response.text();
                dispatch(articleFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(articleFailure(error));
        }
    }
}

export function articleRequest(): IAction {
    return {
        type: ARTICLE_GET_REQUEST,
    };
}

export function articleSuccess(): IArticleAction {
    return {
        type: ARTICLE_GET_SUCCESS
    }
}

export function articleFailure(message: any): IArticleAction {
    return {
        type: ARTICLE_GET_FAILURE,
        errorMessage: message
    }
}
