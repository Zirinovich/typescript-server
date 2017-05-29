import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
let multiparty = require('connect-multiparty');

router.post('/main/content/addchangecontent', async(req, res) => {
    const requestData = req.body;
    let id = await contentLogic.addChangeContentAsync(requestData);
});

router.post('/main/content/upload', multiparty({uploadDir: './uploaded'}));
router.post('/main/content/upload', async(req, res) => {
    const requestData = req.body;
    let id = await contentLogic.addChangeContentAsync(requestData);
});