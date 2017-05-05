import * as React from 'react';
import {Button} from 'react-bootstrap';

import {Crud} from './crud';

interface IProps {

}

interface IState {

}

export class Rules extends React.Component<IProps, IState> {
    render() {
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'lol',
                label: 'LOL'
            },
            {
                name: 'lalala',
                label: 'Lalala'
            }
        ];
        const data = [
            {
                id: 1,
                lol: 'LOL 1',
                lalala: 'УоТакУот'
            },
            {
                id: 2,
                lol: 'LOL 2',
                lalala: 'УоТакУот'
            },
            {
                id: 3,
                lol: 'LOL 3',
                lalala: 'УоТакУот'
            }
        ];
        const actions = [
            {
                element: <Button>Трус</Button>,
                click: (selected) => {
                    console.log('Трус', selected);
                }
            },
            {
                element: <Button>Балбес</Button>,
                click: (selected) => {
                    console.log('Балбес', selected);
                }
            },
            {
                element: <Button>Бывалый</Button>,
                click: (selected) => {
                    console.log('Бывалый', selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={data} actions={actions}/>
        )
    }
}