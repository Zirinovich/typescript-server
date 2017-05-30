import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
import {MultipartFormParser} from "../../_engine/middlewares/common/MultipartFormParser";

router.post('/main/content/addchangecontent', async(req, res) => {
    let parser = new MultipartFormParser();
    const {fields, uploads} = await parser.ParseForm(req);
    let result = await contentLogic.addChangeFileAsync(uploads[0]);
    res.json(result);
});

router.post('/main/content/upload', async(req: any, res) => {
    let parser = new MultipartFormParser();
    const {fields, uploads} = await parser.ParseForm(req);
    let result = await contentLogic.addChangeFileAsync(uploads[0]);
    res.json(result);
});
