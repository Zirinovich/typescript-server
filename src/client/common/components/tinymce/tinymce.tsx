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
            require('tinymce/plugins/autolink');
            require('tinymce/plugins/lists');
            require('tinymce/plugins/link');
            require('tinymce/plugins/image');
            require('tinymce/plugins/charmap');
            require('tinymce/plugins/print');
            require('tinymce/plugins/preview');
            require('tinymce/plugins/anchor');
            require('tinymce/plugins/searchreplace');
            require('tinymce/plugins/visualblocks');
            require('tinymce/plugins/code');
            require('tinymce/plugins/fullscreen');
            require('tinymce/plugins/insertdatetime');
            require('tinymce/plugins/media');
            require('tinymce/plugins/table');
            require('tinymce/plugins/contextmenu');
            require('tinymce/plugins/paste');

            Tinymce.isLoaded = true;
        }
        return Tinymce.tinymce;
    }

    componentDidMount() {
        var tinymce = Tinymce.loadJsClient();

        const id = this.id;

        tinymce.init({
            selector: '#' + id,
            height: 300,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'table | styleselect formatselect fontselect fontsizeselect',
            paste_data_images: true,
            content_css: [
                '//cdn.tinymce.com/4/skins/lightgray/content.min.css',
                //'//www.tinymce.com/css/codepen.min.css'
            ]
        });
    }

    render() {
        return (
            <div id={this.id}/>
        )
    }
}