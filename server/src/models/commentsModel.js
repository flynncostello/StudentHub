const supabase = require('../services/supabaseDatabaseService');

exports.m_getArticlesComments = async (articleId) => {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId);
    if (error) throw error;
    return data;
};

exports.m_createComment = async (commentData) => {
    const { article_id, writer_id, content } = commentData;
    const { data, error } = await supabase
        .from('comments')
        .insert([{ article_id, writer_id, content }]);
    if (error) throw error;
    return data;
}

exports.m_deleteComment = async (commentId) => {
    const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .single();
    if (error) throw error;
    return data;
};