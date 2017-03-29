import * as express from 'express';

export const router = express.Router();

router.get('/article/:articleId', (req, res) => {
    const {articleId} = req.params;
    res.send(`${articleId}${articleId}${articleId}${articleId} Lorem ipsum dolor sit amet, ne duo saepe prompta recteque. Postulant deterruisset cu pri. Est ne scaevola hendrerit persecuti, oporteat adolescens appellantur usu ne, usu putent nusquam perfecto cu. Eu utinam democritum qui, duo vidisse gloriatur no. At nobis putent duo.`);
});
router.all('/*', (req, res) => {
    res.send(req.url + " съешь же ещё этих мягких французских булок, да выпей чаю!");
});