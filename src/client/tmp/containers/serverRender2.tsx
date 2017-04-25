import * as React from 'react';
import {getArticlePromise} from '../redux/serverRenderActions';

const {asyncConnect} = require('redux-connect');

interface IProps {
    article?: string;
}

@asyncConnect([{
    key: 'article',
    promise: ({params:{fetchId}}) => getArticlePromise(fetchId)
}])
export class ServerRender2 extends React.Component<IProps, any> {

    public render() {
        const {article} = this.props;
        return (
            <div>
                <div>{article}</div>
            </div>
        );
    }
}