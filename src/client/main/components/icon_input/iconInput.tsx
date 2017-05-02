import * as React from 'react';
import {Field} from 'redux-form';

import {Icon} from '../../../_common/components/icon/icon';
const style = require('./iconInput.scss');

interface IProps {
    name:string;
    type?:string;
    iconName:string;
}

interface IState {

}

export class IconInput extends React.Component<IProps, IState> {
    renderField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && error && <span>{error}</span>}
            </div>
        )
    }

    render(){
        const {name, type, iconName} = this.props;
        return (
            <label className={style.input}>
                <Icon name={iconName}/>
                <Field
                    name={name}
                    type={type ? type : 'text'}
                    component={this.renderField}
                />
            </label>
        )
    }
}