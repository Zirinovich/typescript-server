import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {ReactBootstrapTable} from '../../../common/components/reactBootstrapTable/reactBootstrapTable';

interface IProps {

}

interface IState {

}

export class Users extends React.Component<IProps, IState> {
    render() {
        const headers = [
            {
                name: 'id',
                label: 'ID',
                key: true
            },
            {
                name: 'name',
                label: 'Product Name'
            },
            {
                name: 'price',
                label: 'Product Price'
            }
        ];

        const data = [];
        for(let i = 0; i < 100; i++){
            data.push({
                id: i,
                name: 'test ' + i,
                price: i * 100500
            });
        }

        return (
            <Grid>
                <ReactBootstrapTable headers={headers} data={data}/>
            </Grid>
        );
    }
}