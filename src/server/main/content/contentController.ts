import {router, AuthClaims} from "../../_engine/routers/router";
import {contentLogic} from "../../registration";
let multiparty = require('connect-multiparty');

router.post('/main/content/addchangecontent', async(req, res) => {
    const requestData = req.body;
    let id = await contentLogic.addChangeContentAsync(requestData);
});

router.post('/main/content/upload', multiparty({uploadDir: './build/upload'}));
router.post('/main/content/upload', async(req: any, res) => {
    if (req.files && req.files.link) {
        // TODO: вынести логику БД в database, вернуть данные на фронт, удалить файл из upload
        let id = await contentLogic.addChangeContentAsync(req.files.link);
        console.log(id);
    }
});