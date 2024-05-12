const commentsModel = require('../models/commentsModel');

exports.getArticlesComments = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const articlesComments = await commentsModel.m_getArticlesComments(articleId);
    res.json(articlesComments);
  } catch (error) {
    res.status(404).json({ error: 'Article comments not found' });
  }
};

exports.createComment = async (req, res) => {
  const commentData = req.body;
  try {
    const newComment = await commentsModel.m_createComment(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const deletedComment = await commentsModel.m_deleteComment(commentId);
    res.json(deletedComment);
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
};