import * as React from 'react';
import {getArticle} from '../redux/serverRenderActions';

const {asyncConnect} = require('redux-connect');
const {connect} = require('react-redux');

interface IProps {
    article1?: string;
    article2?: string;
    message?: any;
    isFetching: boolean;
}

@asyncConnect([{
    key: 'article1',
    promise: ({store:{dispatch}}) => {
        return dispatch(getArticle(1));
    }
}, {
    key: 'article2',
    promise: ({store:{dispatch}}) => {
        return dispatch(getArticle(2));
    }
}])
@connect(
    (state) => ({...state.articles})
)
export class ServerRender extends React.Component<IProps, any> {
    public render() {
        const {article1, article2, message, isFetching} = this.props;
        return (
            <div>{
                isFetching ? 'Fetching articles' :
                    <div>
                        {message ? message :
                            <div>
                                <div>{article1}</div>
                                <br/>
                                <div>{article2}</div>
                            </div>}
                    </div>
            }
            </div>
        );
    }
}