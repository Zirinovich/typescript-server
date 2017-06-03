import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";
import HTTP_STATUS_CODES from 'http-status-enum';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
const fs = require('fs');

router.post('/main/content/addchangecontent', async(req, res) => {
    let {idcontent, filedata} = req.body;
    if (/[^\w\d\.-_]/.test(idcontent)) {
        return res.json({
            errorCode: ErrorCodeEnum.InvalidParameterValueSymbol,
            errorMessage: "Parameter 'idcontent' may contain only 'Aa-Zz','.','-','_' symbols."
        });
    }
    idcontent = _.trimEnd(idcontent, '.');
    let filedataHex = "\\x".concat(Buffer.from(filedata).toString("hex"));
    let content = await contentLogic.addChangeContentAsync({idcontent, filedata: filedataHex}, filedata);
    res.json(content);
});

router.post('/main/content/getcontent', async(req, res) => {
    let {idcontent} = req.body;
    let content = await contentLogic.findContentDtoByIdAsync(idcontent);
    content.data.filedata = Buffer.from(content.data.filedata).toString("utf8");
    res.json(content);
});

router.post('/main/content/deletecontent', async(req, res) => {
        const ids = req.body;
        let content = await contentLogic.deleteContentAsync(ids);
        res.json(content);
    }, AuthClaims.Authenticated,
    {
        idRule: "main_content_delete",
        resolve: (ruleDto, req) => {
            return ruleDto.rulevalue == "true";
        }
    }
);

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
