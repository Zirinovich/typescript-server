import * as express from "express";

var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
