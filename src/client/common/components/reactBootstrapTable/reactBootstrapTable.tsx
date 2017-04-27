import * as React from 'react';
import {BootstrapTable, TableHeaderColumn, SelectRowMode, SortOrder} from 'react-bootstrap-table';

import '../../../common/content/react-bootstrap-table/react-bootstrap-table.scss';

interface IProps {
    headers: {
        name: string;
        label: string;
        key?: boolean;
    }[];
    data: Object[];
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
        const {headers, data} = this.props;
        const {currPage} = this.state;

        const mode: SelectRowMode = 'checkbox';
        const sortOrder: SortOrder = 'desc';

        const selectRowProp = {
            mode: mode,
            clickToSelect: true
        };

        const options = {
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: currPage,
            sortName: 'id',
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