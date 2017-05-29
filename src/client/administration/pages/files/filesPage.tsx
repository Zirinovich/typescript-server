import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getFiles, deleteFiles} from '../../redux/filesActions';
import {FileCreateEditModal} from './fileCreateEditModal';

//#region interfaces
interface IProps {
    files: any;
    deleteFiles: Function;
}

interface IState {

}
//#endregion

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getFiles());
    }
}])
@connect(
    (state) => ({files: state.files}),
    (dispatch) => ({
        deleteFiles: (id) => dispatch(deleteFiles(id))
    })
)
export class FilesPage extends React.Component<IProps, IState> {
    render() {
        const {files: {list}, deleteFiles} = this.props;
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'name',
                label: i18n.t('administration.fileName')
            },
            {
                name: 'link',
                label: i18n.t('administration.link')
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: FileCreateEditModal,
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: FileCreateEditModal,
                validate: {
                    isSingleRowSelected: true
                }
            },
            {
                text: i18n.t('administration.delete'),
                validate: {
                    isSelected: true,
                    confirm: true
                },
                method: (selected) => {
                    deleteFiles(selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}