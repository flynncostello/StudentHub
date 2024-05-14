const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articlesController');

/*
TASKS 
/api/articles
*/

// Articles
router.get('/normal/:userId', articlesController.getUsersArticles);
router.get('/normal', articlesController.getAllArticles);
router.post('/normal', articlesController.createArticle);
router.put('/normal/:articleId', articlesController.updateArticle);
router.delete('/normal/:articleId', articlesController.deleteArticle);

// Favourited Articles
router.get('/favourite/:userId', articlesController.getUsersFavouritedArticles);
router.post('/favourite/:userId/:articleId', articlesController.favouriteArticle);
router.delete('/favourite/:userId/:articleId', articlesController.unfavouriteArticle);


module.exports = router;
