const appConfig = require('../../../../config/main');

import * as React from 'react';
import * as Helmet from 'react-helmet';

class App extends React.Component<any, any> {
  public render() {
    return (
      <section>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <div>App</div>
      </section>
    );
  }
}

export { App }
