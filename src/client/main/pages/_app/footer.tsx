import * as React from 'react';
import {Grid, Col} from 'react-bootstrap';

import {Icon} from "../../../common/components/icon/icon";
const style = require('./footer.scss');

interface IProps {

}

interface IState {

}

export class Footer extends React.Component<IProps, IState> {
    render() {
        const links = [
            {
                to: '#',
                icon: <Icon name="facebook"/>
            },
            {
                to: '#',
                icon: <Icon name="google-plus"/>
            },
            {
                to: '#',
                icon: <Icon name="linkedin"/>
            },
            {
                to: '#',
                icon: <Icon name="dribbble"/>
            },
            {
                to: '#',
                icon: <Icon name="wordpress"/>
            },
            {
                to: '#',
                icon: <Icon name="android"/>
            }
        ];
        return (
            <footer className={style.footer}>
                <Grid>
                    <Col md={6}>
                        <a className={style.link} href="mailto:info@alt-lan.ru">info@alt-lan.ru </a>
                    </Col>
                    <Col md={6}>
                        <ul className={style.icons}>
                            {links.map((link, index) => {
                                return(
                                    <li key={index}>
                                        <a href={link.to}>
                                            {link.icon}
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