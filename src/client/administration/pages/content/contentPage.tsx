import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getContent, deleteContent} from '../../redux/contentActions';
import {ContentCreateEditModal} from './contentCreateEditModal';

//#region interfaces
interface IProps {
    content: any;
    deleteContent: Function;
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
    (state) => ({content: state.content}),
    (dispatch) => ({
        deleteUsers: (id) => dispatch(deleteContent(id))
    })
)
export class ContentPage extends React.Component<IProps, IState> {
    render() {
        const {content: {list}} = this.props;
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'link',
                label: i18n.t('administration.link')
            },
            {
                name: 'datetime',
                label: i18n.t('administration.dateTime')
            },
            {
                name: 'content',
                label: i18n.t('administration.content')
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: ContentCreateEditModal,
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: ContentCreateEditModal,
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

                }
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}