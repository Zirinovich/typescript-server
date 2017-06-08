import * as React from 'react';
import {Grid, Col} from 'react-bootstrap';

import {Icon} from "../../../_common/components/icon/icon";
const style = require('./footer.scss');

interface IProps {

}

interface IState {

}

export class Footer extends React.Component<IProps, IState> {
    render() {
        const email = 'info@alt-lan.ru';
        const icons = [
            {
                name: 'twitter',
                href: 'https://twitter.com/alt_lan'
            }
        ];
        return (
            <footer className={style.footer}>
                <Grid>
                    <Col md={6}>
                        <a className={style.link} href={'mailto:' + email}>{email}</a>
                    </Col>
                    <Col md={6}>
                        <ul className={style.icons}>
                            {icons.map((icon, index) => {
                                return(
                                    <li key={index}>
                                        <a href={icon.href} target="_blank">
                                            <Icon name={icon.name}/>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>
                </Grid>
            </footer>
        )
    }
}