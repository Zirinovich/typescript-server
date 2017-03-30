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

function getArticleSerial() {
    // Данная функция не использует проверок res.ok и прочего, учитывать это беря как пример
    let text = "";
    return fetch(`http://localhost:8889/api/public/article/${67}`)
        .then((res) => {
            res.text().then(txt => text += txt);
            return fetch(`http://localhost:8889/api/public/article/${89}`)
                .then((res) => {
                    return res.text().then(txt => {
                        text = text + ' --->>> ' + txt;
                        return Promise.resolve(text);
                    })
                })
        })
}


function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    });
}

export function getArticle(artNumber: number) {
    return (dispatch) => {
        dispatch(articleRequest());

        return fetch(`http://localhost:8889/api/public/article/${artNumber}`)
            .then((res) => {
                if (res.ok) {
                    if (artNumber === 2) {
                        return delay(3000)
                            .then(() => {
                                dispatch(articleSuccess());
                                return res.text();

                            });
                    }
                    else {
                        dispatch(articleSuccess());
                        return res.text();
                    }
                }
                else {
                    return res.text().then(text => {
                        dispatch(articleFailure(text));
                        return Promise.resolve("");
                    });
                }
            })
            .catch((err) => {
                dispatch(articleFailure(err));
            });
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
