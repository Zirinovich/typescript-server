import * as React from 'react';

interface IProps {

}

interface IState {

}

let idNumber = 1;

export class Tinymce extends React.Component<IProps, IState> {
    id = 'ui-' + idNumber;

    componentDidMount() {
        var tinymce = require('tinymce/tinymce');

        require('tinymce/themes/modern/theme');

        require('tinymce/plugins/paste');
        require('tinymce/plugins/link');

        const id = this.id;
        idNumber++;

        tinymce.init({
            selector: '#' + id,
            plugins: ['paste', 'link'],
            paste_data_images: true
        });
    }

    render() {
        return (
            <div id={this.id}/>
        )
    }
}