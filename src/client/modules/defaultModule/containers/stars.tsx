import * as React from 'react';
import {IStars} from '../../../interfaces/defaultModule/IStars';
import {getStars} from '../redux/actions/starsActions';
import {IStarsAction} from '../../../interfaces/defaultModule/IStarsAction';

const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');
const style = require('./stars.scss');

interface IProps {
    stars: IStars;
    getStars: Redux.ActionCreator<IStarsAction>;
}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getStars());
    },
}])
@connect(
    (state) => ({stars: state.stars}),
)
class Stars extends React.Component<IProps, {}> {
    public render() {
        const {stars} = this.props;

        return (
            <div className={style.Stars}>
                {stars.isFetching ? 'Fetching Stars' : stars.count}
            </div>
        );
    }
}

export {Stars}
