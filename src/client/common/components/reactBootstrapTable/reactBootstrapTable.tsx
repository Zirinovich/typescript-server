import * as React from 'react';
import {BootstrapTable, TableHeaderColumn, SelectRowMode, SortOrder} from 'react-bootstrap-table';

import '../../../common/content/react-bootstrap-table/react-bootstrap-table.scss';

interface IProps {
    headers: {
        name: string;
        label: string;
        key?: boolean;
    }[];
    data: any[];
    rowSelectHandler?: (selected: number[]) => {};
}

interface IState {
    key: string;
    selected: any[];
    currPage: number;
}

export class ReactBootstrapTable extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        const key = props.headers.filter(header => header.key)[0].name;
        this.state = {
            key,
            selected: [],
            currPage: 1
        };
    }

    selectHandler(row, isSelected) {
        this.selectAllHandler(isSelected, [row]);
        return true;
    }

    selectAllHandler(isSelected, rows) {
        const {rowSelectHandler} = this.props;
        const {key, selected} = this.state;

        let result;
        if (isSelected) {
            result = _.uniqBy(selected.concat(rows), ((row) => {
                return row[key];
            }));
        } else {
            let keys = rows.map((row) => {
                return row[key];
            });
            result = selected.filter((row) => {
                return keys.indexOf(row[key]) === -1;
            });
        }

        this.setState({selected: result});
        if (rowSelectHandler) rowSelectHandler(result);
        return true;
    }

    render() {
        const {headers, data} = this.props;
        const {key, currPage} = this.state;

        const mode: SelectRowMode = 'checkbox';
        const sortOrder: SortOrder = 'desc';

        const selectRowProp = {
            mode: mode,
            clickToSelect: true,
            onSelect: this.selectHandler.bind(this),
            onSelectAll: this.selectAllHandler.bind(this),
        };

        const options = {
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: currPage,
            sortName: key,
            sortOrder: sortOrder
        };

        return (
            <BootstrapTable ref='table'
                            data={ data }
                            pagination={ true }
                            selectRow={ selectRowProp }
                            options={ options }>
                {headers.map((header, index) => {
                    return (
                        <TableHeaderColumn key={index}
                                           dataField={header.name}
                                           filter={{ type: 'TextFilter', delay: 100 }}
                                           isKey={header.key}
                                           dataSort={ true }>{header.label}</TableHeaderColumn>
                    )
                })}
            </BootstrapTable>
        );
    }
}