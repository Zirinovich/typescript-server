import * as React from 'react';

import {generator} from '../../../../shared/tools/generator';

interface IProps {

}

interface IState {

}

export class Tinymce extends React.Component<IProps, IState> {
    id = generator.genId();

    static isLoaded = false;
    static tinymce;

    static loadJsClient() {
        if (!Tinymce.isLoaded) {
            Tinymce.tinymce = require('tinymce/tinymce');

            require('tinymce/themes/modern/theme');

            require('tinymce/plugins/advlist');
            require('tinymce/plugins/anchor');
            require('tinymce/plugins/autolink');
            //require('tinymce/plugins/autoresize');
            //require('tinymce/plugins/autosave');
            //require('tinymce/plugins/bbcode');
            require('tinymce/plugins/charmap');
            //require('tinymce/plugins/code');
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

            Tinymce.isLoaded = true;
        }
        return Tinymce.tinymce;
    }

    componentDidMount() {
        var tinymce = Tinymce.loadJsClient();

        const id = this.id;

        tinymce.init({
            selector: '#' + id,
            height: 500,
            plugins: [
                'advlist autolink link image lists charmap print preview anchor',
                'table textcolor colorpicker'
                //"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                //"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                //"table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
            ],

            toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
            toolbar2: "searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
            toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

            menubar: false,
            toolbar_items_size: 'small',
            paste_data_images: true
        });
    }

    render() {
        return (
            <div id={this.id}/>
        )
    }
}