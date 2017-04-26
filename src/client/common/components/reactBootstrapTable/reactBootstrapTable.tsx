import * as React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

interface IProps {

}

interface IState {
    selected: number[];
    currPage: number;
}

export class ReactBootstrapTable extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            currPage: 1
        };
    }

    render() {
        const {
            currPage
        } = this.state;
        const onRowSelect = ({id}, isSelected) => {
            if (isSelected && this.state.selected.length !== 2) {
                this.setState({
                    selected: [...this.state.selected, id].sort(),
                    currPage: this.state.currPage
                });
            } else {
                this.setState({selected: this.state.selected.filter(it => it !== id)});
            }
            return false;
        };

        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: onRowSelect,
            selected: this.state.selected
        };

        const options = {
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: currPage,
            sortName: 'id',
            //sortOrder: 'desc'
        };

        const products = [
            {
                id: '1',
                name: 'test',
                price: '100500'
            },
            {
                id: '2',
                name: 'test 2',
                price: '100500'
            },
            {
                id: '3',
                name: 'test 3',
                price: '100500'
            },
            {
                id: '4',
                name: 'test 4',
                price: '100500'
            },
            {
                id: '5',
                name: 'test 5',
                price: '100500'
            },
            {
                id: '6',
                name: 'test 6',
                price: '100500'
            },
            {
                id: '7',
                name: 'test 7',
                price: '100500'
            }
        ];

        const headers = [
            {
                name: 'id',
                label: 'ID',
                key: true
            },
            {
                name: 'name',
                label: 'Product Name',
                key: false
            },
            {
                name: 'price',
                label: 'Product Price',
                key: false
            }
        ];

        return (
            <BootstrapTable ref='table' data={ products } pagination={ true }
                            options={ options }>
                {headers.map((header) => {
                    return (
                        <TableHeaderColumn dataField={header.name} isKey={header.key}>{header.label}</TableHeaderColumn>
                    )
                })}
            </BootstrapTable>
        );
    }
}