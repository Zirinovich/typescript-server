import * as React from 'react';

import {Icon} from '../../../_common/components/icon/icon';
import {Input} from '../../../_common/components/input/input';
const style = require('./iconInput.scss');

interface IProps {
    name: string;
    type?: string;
    iconName: string;
    onEvent?: any;
    required?: boolean;
}

interface IState {

}

export class IconInput extends React.Component<IProps, IState> {
    render() {
        const {name, type, iconName, onEvent, required} = this.props;
        return (
            <label className={style.input}>
                <Icon name={iconName}/>
                <Input
                    name={name}
                    type={type ? type : 'text'}
                    onEvent={onEvent}
                    required={required}
                />
            </label>
        )
    }
}