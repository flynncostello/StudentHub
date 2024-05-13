const articlesModel = require('../models/articlesModel');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articlesModel.m_getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(404).json({ error: 'Articles not found' });
  }
};

exports.getUsersArticles = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userArticles = await articlesModel.m_getUserArticles(userId);
    res.json(userArticles);
  } catch (error) {
    res.status(404).json({ error: 'User articles not found' });
  }
};

exports.createArticle = async (req, res) => {
  const articleData = req.body;
  try {
    const newArticle = await articlesModel.m_createArticle(articleData);
    //console.log(newArticle)
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const updatedData = req.body;
  try {
    const updatedArticle = await articlesModel.m_updateArticle(articleId, updatedData);
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(404).json({ error: 'Article not found' });
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const deletedArticle = await articlesModel.m_deleteArticle(articleId);
    res.json(deletedArticle);
  } catch (error) {
    res.status(404).json({ error: 'Article not found' });
  }
};




exports.getUsersFavouritedArticles = async (req, res) => {
  const userId = req.params.userId;
  try {
    const favouritedArticles = await articlesModel.m_getUserFavouritedArticles(userId);
    res.json(favouritedArticles);
  } catch (error) {
    res.status(404).json({ error: 'Favourited articles not found' });
  }
};

exports.favouriteArticle = async (req, res) => {
  const userId = req.params.userId;
  const articleId = req.params.articleId;
  try {
    const favouriteStatus = await articlesModel.m_favouriteArticle(userId, articleId);
    res.json(favouriteStatus);
  } catch (error) {
    res.status(404).json({ error: 'Failed to favourite article' });
  }
};

exports.unfavouriteArticle = async (req, res) => {
  const userId = req.params.userId;
  const articleId = req.params.articleId;
  try {
    const unfavouriteStatus = await articlesModel.m_unfavouriteArticle(userId, articleId);
    res.json(unfavouriteStatus);
  } catch (error) {
    res.status(404).json({ error: 'Failed to unfavourite article' });
  }
};