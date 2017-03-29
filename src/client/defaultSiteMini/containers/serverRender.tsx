import * as React from 'react';
import {getArticle} from '../redux/serverRenderActions';

// const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

interface IProps {
    article1?: string;
    article2?: string;
}

@asyncConnect([{
    key: 'article1',
    promise: ({params}) => {
        console.log(params);
        return new Promise(getArticle(1));
    }
}, {
    key: 'article2',
    promise: getArticle(2)
}])
export class ServerRender extends React.Component<IProps, any> {

    public render() {
        const {article1, article2} = this.props;
        return (
            <div>
                <div>{article1}</div>
                <br/>
                <div>{article2}</div>
            </div>
        );
    }
}