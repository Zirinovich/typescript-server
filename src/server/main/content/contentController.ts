import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";

router.post('/main/users/addchangecontent', async(req, res) => {
    const requestData = req.body;
    let id = await contentLogic.addChangeContentAsync(requestData);
});