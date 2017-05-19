import * as React from 'react';

import {Icon} from '../../../_common/components/icon/icon';
import {Textarea} from '../../../_common/components/textarea/textarea';
const style = require('./iconTextarea.scss');

interface IProps {
    name: string;
    iconName: string;
    onEvent?: any;
    required?: boolean;
}

interface IState {

}

export class IconTextarea extends React.Component<IProps, IState> {
    render() {
        const {name, iconName, onEvent, required} = this.props;
        return (
            <label className={style.input}>
                <Icon name={iconName}/>
                <Textarea
                    name={name}
                    onEvent={onEvent}
                    required={required}
                />
            </label>
        )
    }
}