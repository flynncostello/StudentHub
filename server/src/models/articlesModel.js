const supabase = require('../services/supabaseDatabaseService');

exports.m_getAllArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) throw error;
    return data;
};

exports.m_getUserArticles = async (userId) => {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('author_id', userId);
    if (error) throw error;
    return data;
};

exports.m_createArticle = async (articleData) => {
    const { author_id, author_username, author_role, title, content } = articleData;
    //console.log("IN ARTICLE MODEL: ", author_id, author_username, title, content);
    const { data, error } = await supabase
        .from('articles')
        .insert([{ author_id, author_username, author_role, title, content }])
        .select('*');
    console.log("IN MODEL FINAL DATA: ", data);
    if (error) throw error;
    return data[0];
};

exports.m_updateArticle = async (articleId, updatedData) => {
    const { title, content } = updatedData;
    const { data, error } = await supabase
        .from('articles')
        .update({ title, content })
        .eq('id', articleId)
        .select('*');
    if (error) throw error;
    return data[0];
};

exports.m_deleteArticle = async (articleId) => {
    const { data, error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId)
        .single();
    if (error) throw error;
    return data;
};

exports.m_getUserFavouritedArticles = async (userId) => {
    const { data: favArticles, error: favError } = await supabase
        .from('favourite_articles')
        .select('article_id')
        .eq('user_id', userId);
    if (favError) throw favError;

    const articleIds = favArticles.map(fav => fav.article_id);
    console.log(articleIds)
    const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .in('id', articleIds);
    if (articlesError) throw articlesError;

    return articles;
};

exports.m_favouriteArticle = async (userId, articleId) => {
    console.log(userId, articleId)
    const { data, error } = await supabase
        .from('favourite_articles')
        .insert([{ article_id: articleId, user_id: userId }]);
    console.log(data, error)
    if (error) throw error;
    return data;
};

exports.m_unfavouriteArticle = async (userId, articleId) => {
    console.log("IN UNFAVOURITE ARTICLE MODEL")
    console.log(userId)
    console.log(articleId)
    const { data, error } = await supabase
        .from('favourite_articles')
        .delete()
        .eq('user_id', userId)
        .eq('article_id', articleId)
    if (error) throw error;
    return data;
};