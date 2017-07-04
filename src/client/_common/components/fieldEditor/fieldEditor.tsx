import * as React from 'react';
import * as TinyMCE from 'react-tinymce';

import { EventDelegate } from '../../interfaces/EventDelegate';
import { EventMethodEnum } from '../../interfaces/EventMethodEnum';
import { EventComponentTypeEnum } from '../../interfaces/EventComponentTypeEnum';

//#region interfaces
interface IProps {
    name: string;
    value?: string;
    onEvent?: EventDelegate;
}

interface IState {

}
//#endregion

export class FieldEditor extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.setContent = this.setContent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    static isLoaded = false;
    static tinymce;

    static fixFocusInModals() {
        $(document).on('focusin', function (e) {
            if ($(event.target).closest('.mce-window').length) {
                event.stopImmediatePropagation();
            }
        });
    }

    static loadJsClient() {
        if (!FieldEditor.isLoaded) {
            FieldEditor.tinymce = require('imports-loader?this=>window!exports-loader?window.tinymce!tinymce/tinymce');
            require('imports-loader?this=>window!tinymce/themes/modern/theme');

            require('tinymce/plugins/advlist');
            require('tinymce/plugins/anchor');
            require('tinymce/plugins/autolink');
            require('tinymce/plugins/autoresize');
            require('tinymce/plugins/autosave');
            require('tinymce/plugins/bbcode');
            require('tinymce/plugins/charmap');
            require('tinymce/plugins/code');
            require('tinymce/plugins/codesample');
            require('tinymce/plugins/colorpicker');
            require('tinymce/plugins/contextmenu');
            require('tinymce/plugins/directionality');
            require('tinymce/plugins/emoticons');
            require('tinymce/plugins/fullpage');
            require('tinymce/plugins/fullscreen');
            require('tinymce/plugins/help');
            require('tinymce/plugins/hr');
            require('tinymce/plugins/image');
            require('tinymce/plugins/imagetools');
            require('tinymce/plugins/importcss');
            require('tinymce/plugins/insertdatetime');
            //require('tinymce/plugins/layer');
            require('tinymce/plugins/legacyoutput');
            require('tinymce/plugins/link');
            require('tinymce/plugins/lists');
            require('tinymce/plugins/media');
            require('tinymce/plugins/nonbreaking');
            require('tinymce/plugins/noneditable');
            require('tinymce/plugins/pagebreak');
            require('tinymce/plugins/paste');
            require('tinymce/plugins/preview');
            require('tinymce/plugins/print');
            require('tinymce/plugins/save');
            require('tinymce/plugins/searchreplace');
            require('tinymce/plugins/spellchecker');
            require('tinymce/plugins/tabfocus');
            require('tinymce/plugins/table');
            require('tinymce/plugins/template');
            require('tinymce/plugins/textcolor');
            require('tinymce/plugins/textpattern');
            require('tinymce/plugins/toc');
            require('tinymce/plugins/visualblocks');
            require('tinymce/plugins/visualchars');
            require('tinymce/plugins/wordcount');

            FieldEditor.fixFocusInModals();
            FieldEditor.isLoaded = true;
        }
    }

    changeHandler(e) {
        const {name, onEvent} = this.props;
        if (onEvent) {
            onEvent({
                event: EventMethodEnum.OnChange,
                value: e.target.getContent(),
                name,
                type: EventComponentTypeEnum.Textarea
            });
        }
    }

    setContent(editor) {
        const {value} = this.props;
        editor.setContent(value);
    }

    render() {
        const {value} = this.props;
        FieldEditor.loadJsClient();
        const config = {
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor | codesample help',
            height: 500,
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ],
            init_instance_callback: this.setContent
        };
        return (
            <TinyMCE
                content={value}
                config={config}
                onChange={this.changeHandler}
            />
        );
    }
}