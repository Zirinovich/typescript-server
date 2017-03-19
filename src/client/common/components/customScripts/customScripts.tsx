import * as React from 'react';
import {IReduxStore} from '../../../../shared/interfaces/defaultModule/IReduxStore';
import {IScript} from '../../../../shared/interfaces/common/IScript';
let {connect} = require('react-redux');
let Script = require('react-load-script');

interface IState {
    scripts: IScript[]
}
interface IProps {
    script?: IScript
}

@connect(
    (state: IReduxStore) => ({script: state.loadScript})/*,
     (dispatch) => ({
     // decrement: () => dispatch(decrement()),
     // increment: (count) => dispatch(increment(count)),
     }),*/
)
export class CustomScripts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {scripts: props.script ? [props.script] : []};
    }

    componentWillReceiveProps(newProps: IProps) {
        let {script} = newProps;
        let {scripts} = this.state;
        if (script && !scripts.some(o => o.name === script.name)) {
            this.setState({scripts: [...scripts, script]});
        }
    }

    // tslint:disable-next-line
    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        console.log(nextProps);
        return this.state.scripts.length === nextState.scripts.length;
    }

    public render() {
        const {scripts} = this.state;
        return (
            <div id="cs-script">
                {
                    scripts.map((s: IScript) => {
                        return <Script onLoad={()=>{}} onError={()=>{}} key={`cscript-${s.name}`} url={s.url}/>
                    })
                }
            </div>
        );
    }
}