import * as React from 'react';
import * as TinyMCE from 'react-tinymce';

import {generator} from '../../../../shared/tools/generator';
import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

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
    id = generator.genId();

    static isLoaded = false;
    static tinymce;

    static loadJsClient() {
        if (!FieldEditor.isLoaded) {
            FieldEditor.tinymce = require('imports-loader?this=>window!exports-loader?window.tinymce!tinymce/tinymce');
            require('imports-loader?this=>window!tinymce/themes/modern/theme');

            require('tinymce/plugins/advlist');
            require('tinymce/plugins/anchor');
            require('tinymce/plugins/autolink');
            //require('tinymce/plugins/autoresize');
            //require('tinymce/plugins/autosave');
            //require('tinymce/plugins/bbcode');
            require('tinymce/plugins/charmap');
            require('tinymce/plugins/code');
            //require('tinymce/plugins/codesample');
            require('tinymce/plugins/colorpicker');
            //require('tinymce/plugins/contextmenu');
            //require('tinymce/plugins/directionality');
            //require('tinymce/plugins/emoticons');
            //require('tinymce/plugins/fullpage');
            //require('tinymce/plugins/fullscreen');
            require('tinymce/plugins/image');
            //require('tinymce/plugins/imagetools');
            //require('tinymce/plugins/importcss');
            //require('tinymce/plugins/insertdatetime');
            //require('tinymce/plugins/layer');
            //require('tinymce/plugins/legacyoutput');
            require('tinymce/plugins/link');
            require('tinymce/plugins/lists');
            //require('tinymce/plugins/media');
            //require('tinymce/plugins/nonbreaking');
            //require('tinymce/plugins/noneditable');
            //require('tinymce/plugins/pagebreak');
            //require('tinymce/plugins/paste');
            require('tinymce/plugins/preview');
            require('tinymce/plugins/print');
            //require('tinymce/plugins/save');
            //require('tinymce/plugins/searchreplace');
            //require('tinymce/plugins/spellchecker');
            //require('tinymce/plugins/tabfocus');
            require('tinymce/plugins/table');
            //require('tinymce/plugins/template');
            require('tinymce/plugins/textcolor');
            //require('tinymce/plugins/textpattern');
            //require('tinymce/plugins/toc');
            //require('tinymce/plugins/visualblocks');
            //require('tinymce/plugins/visualchars');
            //require('tinymce/plugins/wordcount');

            FieldEditor.isLoaded = true;
        }
    }

    componentDidUpdate() {
        const {value} = this.props;
        const tinymce = FieldEditor.tinymce;
        if (tinymce) tinymce.get(this.id).setContent(value ? value : '');
    }

    changeHandler(e) {
        const {name, onEvent} = this.props;
        onEvent({
            event: EventMethodEnum.OnChange,
            value: e.target.getContent(),
            name,
            type: EventComponentTypeEnum.Textarea
        });
    }

    render() {
        const {value} = this.props;
        FieldEditor.loadJsClient();
        const config = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            height: 500
        };
        return (
            <TinyMCE
                id={this.id}
                content={value}
                config={config}
                onChange={this.changeHandler.bind(this)}
            />
        );
    }
}