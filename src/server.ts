import * as express from "express";

class Server {
    private app: express.Application;
    private port: number;
    private assetUrl?: string;

    constructor() {
        this.app = express();
        this.port = 3001;//process.env.PORT || 3001;
        this.assetUrl = 'http://localhost:8080';//process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : '';
    }

    renderHTML(componentHTML, initialState) {
        return `
            <!DOCTYPE html>
              <html>
              <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Hello React</title>
                  <link rel="stylesheet" href="${this.assetUrl}/public/assets/styles.css">
                  <script type="application/javascript">
                    window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
                  </script>
              </head>
              <body>
                <div id="react-view">${componentHTML}</div>
                <div id="dev-tools"></div>
                <script type="application/javascript" src="${this.assetUrl}/public/assets/bundle.js"></script>
              </body>
            </html>
          `;
    }

    public start(){
        let self = this;
        this.app.get('/', function(req, res) {
            let componentHTML = 'lalala';
            let state = '';

            return res.end(self.renderHTML(componentHTML, state));
        });

        this.app.listen(this.port, () => {
            console.log(`Server listening on: ${this.port}`);
        });
    }
}

export default new Server;