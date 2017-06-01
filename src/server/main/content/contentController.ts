import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";
import HTTP_STATUS_CODES from 'http-status-enum';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
const fs = require('fs');

const contentMimeType = "text/html,application/xhtml+xml,application/xml";

router.post('/main/content/addchangearticle', async(req, res) => {
    let {idcontent, contentdata} = req.body;
    let data = Buffer.from(contentdata).toString("hex");
    console.log(data);
    let file = await contentLogic.uploadFileAsync({
        fileName: `${idcontent}-${new Date().toISOString().replace(/\D/g, "-").substr(0, 21)}.content`,
        size: data.length / 2,
        tags: contentdata,
        mimeType: contentMimeType,
        hexData: contentdata,
        encoding: "utf-8",
        extension: "content"
    });
    let content = await contentLogic.addChangeContentAsync({idcontent, idfile: file.data.idfile});
    res.json(content);
});

router.get('/main/content/getcontent/:idcontent', async(req, res) => {
    let {idcontent} = req.params;
    let content = await contentLogic.findContentDataHexByIdAsync(idcontent);
    if (content.errorCode === ErrorCodeEnum.NoErrors && !!content.data) {
        res.writeHead(HTTP_STATUS_CODES.OK, {'Accept': `${contentMimeType}`});
        res.end(content.data, 'hex');
    }
    else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).send(content.errorMessage);
    }
});

router.post('/main/content/upload', async(req: any, res) => {
    let parser = new MultipartFormParser();
    const {fields, uploadedFiles} = await parser.ParseForm(req);
    let result = await contentLogic.uploadFileAsync(uploadedFiles[0]);
    result = Object.assign({}, {...result}, {success: true}); // TODO: обработать ошибки, success только если noerrors
    res.json(result);
}, AuthClaims.Authenticated);

router.get('/main/content/image/:idfile', async(req, res) => {
    let {idfile} = req.params;
    let file = await contentLogic.findFileDtoByIdAsync(idfile);
    res.writeHead(<number>HTTP_STATUS_CODES.OK, {'Content-Type': `${file.data.mimetype}`});
    res.end(file.data.filedata, 'hex');
    console.log(file.data.filename);
});
