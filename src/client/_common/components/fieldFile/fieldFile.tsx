import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';
//import * as FineUploaderTraditional from 'fine-uploader-wrappers'
//import * as Gallery from 'react-fine-uploader'

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

//#region interfaces
interface IProps {
    name: string;
    label?: any;
    value?: any;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}
//#endregion

let Gallery;

export class FieldFile extends React.Component<IProps, IState> {
    uploader;

    componentDidMount() {
        require('react-fine-uploader/gallery/gallery.css');
        Gallery = require('react-fine-uploader').default;
        const FineUploaderTraditional = require('fine-uploader-wrappers').default;
        this.uploader = new FineUploaderTraditional({
            options: {
                chunking: {
                    enabled: false
                },
                deleteFile: {
                    enabled: true,
                    endpoint: '/api/main/content/upload'
                },
                request: {
                    endpoint: '/api/main/content/upload'
                },
                retry: {
                    enableAuto: false
                }
            }
        })
    }

    onChange(e) {
        const {name, onEvent} = this.props;
        if (onEvent) {
            onEvent({
                event: EventMethodEnum.OnChange,
                value: e.target.value,
                name,
                type: EventComponentTypeEnum.File
            });
        }
    }

    render() {
        const {name, label, value, required} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                {Gallery && this.uploader && <Gallery uploader={ this.uploader }/>}
            </div>
        )
    }
}