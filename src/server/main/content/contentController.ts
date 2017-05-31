import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";
import HTTP_STATUS_CODES from 'http-status-enum';
const fs = require('fs');

router.post('/main/content/addchangecontent', (req, res) => {
    return undefined;
});

router.post('/main/content/upload', async(req: any, res) => {
    let parser = new MultipartFormParser();
    const {fields, uploadedFiles} = await parser.ParseForm(req);
    let result = await contentLogic.uploadFileAsync(uploadedFiles[0]);
    result = Object.assign({}, {...result}, {success: true});
    res.json(result);
});

router.get('/main/content/image/:idfile', async(req, res) => {
    let {idfile} = req.params;
    let file = await contentLogic.findFileDtoByIdAsync(idfile);
    res.writeHead(<number>HTTP_STATUS_CODES.OK, {'Content-Type': `${file.data.mimetype}`});
    res.end(file.data.filedata, 'hex');
    console.log(file.data.filename);
});
