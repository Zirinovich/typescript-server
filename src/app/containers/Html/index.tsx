import * as React from 'react';
import * as Helmet from 'react-helmet';

interface IHtmlProps {
  manifest?: Object;
  markup?: string;
}

class Html extends React.Component<IHtmlProps, {}> {
  private resolve(files) {
    return files.map((src) => {
      if (!this.props.manifest[src]) { return; }
      return '/public/' + this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

  public render() {
    const head = Helmet.rewind();
    const { markup } = this.props;

    const scripts = this.resolve([/*'vendor.js', */'app.js']);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i} />,
    );

    return (
      <html>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
      <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
      {renderScripts}
      </body>
      </html>
    );
  }
}

export { Html }
