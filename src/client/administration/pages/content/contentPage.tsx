import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getContent, getContentById, deleteContent} from '../../redux/contentActions';
import {ContentCreateEditModal} from './contentCreateEditModal';

//#region interfaces
interface IProps {
    contentdata: any;
    deleteContent: Function;
    getContentById: Function;
}

interface IState {

}
//#endregion

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getContent());
    }
}])
@connect(
    (state) => ({contentdata: state.contentdata}),
    (dispatch) => ({
        deleteContent: (idscontent) => dispatch(deleteContent(idscontent)),
        getContentById: (idcontent) => dispatch(getContentById(idcontent))
    })
)
export class ContentPage extends React.Component<IProps, IState> {
    render() {
        const {contentdata: {list}, getContentById, deleteContent} = this.props;
        const headers = [
            {
                name: 'idcontent',
                label: i18n.t('administration.contentName'),
                key: true
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: ContentCreateEditModal,
                method: () => {
                    getContentById();
                }
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: ContentCreateEditModal,
                method: (selected) => {
                    getContentById(_.first(selected));
                },
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
                    deleteContent(selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}