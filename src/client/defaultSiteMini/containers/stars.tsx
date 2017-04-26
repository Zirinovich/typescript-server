import * as React from 'react';
import {getStars} from '../redux/starsActions';
import {IStars} from '../interfaces/IStars';
import {IAction} from "../../common/interfaces/IAction";

const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');
const style = require('./stars.scss');

interface IProps {
    stars: IStars;
    getStars: ()=>IAction;
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
