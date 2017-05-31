import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";

router.post('/main/content/addchangecontent', (req, res) => {
    return undefined;
});

router.post('/main/content/upload', async(req: any, res) => {
    let parser = new MultipartFormParser();
    const {fields, uploadedFiles} = await parser.ParseForm(req);
    let result = await contentLogic.uploadFileAsync(uploadedFiles[0]);
    res.json(result);
});
