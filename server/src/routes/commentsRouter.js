const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/commentsController');

/*
TASKS 
/api/comments
*/

// Comments
router.get('/:articleId', commentsController.getArticlesComments);
router.post('/', commentsController.createComment);
router.delete('/:commentId', commentsController.deleteComment);


module.exports = router;
