import * as React from 'react';
import {decrement, increment, ICounterAction} from '../redux/counterActions';
import {ICounter} from '../../../shared/interfaces/defaultModule/ICounter';
import {Button} from 'react-bootstrap'
const {connect} = require('react-redux');
const style = require('./counter.scss');

interface IProps {
    counter: ICounter;
    increment: (count: number)=>ICounterAction;
    decrement: ()=>ICounterAction;
}

@connect(
    (state) => ({counter: state.counter}),
    (dispatch) => ({
        decrement: () => dispatch(decrement()),
        increment: (count) => dispatch(increment(count)),
    }),
)
class Counter extends React.Component<IProps, void> {
    public render() {
        const {increment, decrement, counter} = this.props;
        return (
            <div className={style.Counter}>
                <h4>Counter Example</h4>
                <Button
                    name="incBtn"
                    onClick={()=>{increment(3)}}>
                    INCREMENT
                </Button>
                <Button
                    name="decBtn"
                    onClick={decrement}
                    disabled={counter.count <= 0}>
                    DECREMENT
                </Button>
                <p>{counter.count}</p>
            </div>
        );
    }
}

export {Counter}
