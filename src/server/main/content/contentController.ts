import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";
import HTTP_STATUS_CODES from 'http-status-enum';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
const fs = require('fs');

const contentMimeType = "text/html,application/xhtml+xml,application/xml";

router.post('/main/content/addchangecontent', async(req, res) => {
    let {idcontent, contentdata} = req.body;
    if(/[^\w\d\.-_]/.test(idcontent)){
        return res.json({
            errorCode: ErrorCodeEnum.InvalidParameterValueSymbol,
            errorMessage: "Parameter 'idcontent' may contain only 'Aa-Zz','.','-','_' symbols."
        });
    }
    idcontent = _.trimEnd(idcontent, '.');
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

router.post('/main/content/getcontent', async(req, res) => {
    let {idcontent} = req.body;
    let content = await contentLogic.findContentDtoByIdAsync(idcontent);
    content.data.filedata = Buffer.from(content.data.filedata).toString("utf8");
    res.json(content);
});

router.post('/main/content/getcontentlist', async(req, res) => {
    let content = await contentLogic.getContentListAsync();
    res.json(content);
}, AuthClaims.Authenticated);

router.post('/main/content/uploadfile', async(req: any, res) => {
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
}, AuthClaims.Authenticated);
