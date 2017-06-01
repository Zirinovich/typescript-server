import * as React from 'react';

interface IProps {
    content: string;
}

interface IState {

}

export class ContentWrapper extends React.Component<IProps, IState> {
    render() {
        const {content} = this.props;
        return (
            <div dangerouslySetInnerHTML={{__html: content}}/>
        )
    }
}