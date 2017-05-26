import * as React from 'react';
import {Link} from 'react-router';
import {Grid} from 'react-bootstrap';

const style = require('./sectionOrderButton.scss');

//#region interfaces
interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}
//#endregion

class SectionOrderButton extends React.Component<IProps, IState> {
    public render() {
        const text = 'Закажите сегодня вебинар по нашим продуктам!';
        const buttonText = 'Заказать';
        return (
            <div className={style.section}>
                <Grid>
                    <div className={style.text}>
                        <h4>{text}</h4>
                    </div>
                    <div className={style.button}>
                        <Link to="/contacts">{buttonText}</Link>
                    </div>
                </Grid>
            </div>
        );
    }
}

export {SectionOrderButton}
