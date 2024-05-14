import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    myArticles: {},
    articles: {},
    favouriteArticles: {},
  },
  /*
  Example state:

  myArticles = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg',
      author_id: '13gf0893jfs',
      author_username: 'Flynn', <-- Need to retrieve from database when getting article
      title: 'Title 1',
      content: 'Content 1',
      created_at: 'date/time',
      comments: {
        '232890fgnsi': {
            id: '232890fgnsi',
            article_id: 'd123sdf424fwg',
            writer_id: '13gf0893jfs',
            writer_name: 'Dan', <-- Need to retrieve from database when getting article
            content: 'Comment 1',
        },
        ...
      },
    },
    ...
  }

  articles = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg',
      author_id: '13gf0893jfs',
      author_username: 'Flynn', <-- Need to retrieve from database when getting article
      title: 'Title 1',
      content: 'Content 1',
      created_at: date,
      comments: {
        '232890fgnsi': {
            id: '232890fgnsi',
            article_id: 'd123sdf424fwg',
            writer_id: '13gf0893jfs',
            writer_name: 'Dan', <-- Need to retrieve from database when getting article
            content: 'Comment 1',
        },
        ...
    },
    },
    ...
  }

  favouriteArticles = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg',
      author_id: '13gf0893jfs',
      author_username: 'Flynn', <-- Need to retrieve from database when getting article
      title: 'Title 1',
      content: 'Content 1',
      created_at: date,
      comments: {
        '232890fgnsi': {
            id: '232890fgnsi',
            article_id: 'd123sdf424fwg',
            writer_id: '13gf0893jfs',
            writer_name: 'Dan', <-- Need to retrieve from database when getting article
            content: 'Comment 1',
        },
        ...
      },
    },
    ...
  }
  */

  reducers: {
    setArticles: (state, action) => {
        state.articles = action.payload;
    },
    clearArticles: (state) => {
        state.articles = {};
    },
    addArticle: (state, action) => {
        state.articles[action.payload.id] = action.payload;
    },
    updateArticle: (state, action) => {
        const { id, title, content } = action.payload;
        state.articles[id].title = title;
        state.articles[id].content = content;
    },
    deleteArticle: (state, action) => {
        delete state.articles[action.payload.id];
    },
    setArticleComments: (state, action) => {
        state.articles[action.payload.article_id].comments = action.payload.comments;
    },
    addArticleComment: (state, action) => {
        state.articles[action.payload.article_id].comments[action.payload.id] = action.payload;
    },
    deleteArticleComment: (state, action) => {
        delete state.articles[action.payload.article_id].comments[action.payload.id];
    },


    setMyArticles: (state, action) => {
        state.myArticles = action.payload;
    },
    clearMyArticles: (state) => {
        state.myArticles = {};
    },
    addMyArticle: (state, action) => {
        state.myArticles[action.payload.id] = action.payload;
    },
    updateMyArticle: (state, action) => {
        const { id, title, content } = action.payload;
        state.myArticles[id].title = title;
        state.myArticles[id].content = content;
    },
    deleteMyArticle: (state, action) => {
        delete state.myArticles[action.payload.id];
    },
    setMyArticleComments : (state, action) => {
        state.myArticles[action.payload.article_id].comments = action.payload.comments;
    },
    addMyArticleComment: (state, action) => {
        state.myArticles[action.payload.article_id].comments[action.payload.id] = action.payload;
    },
    deleteMyArticleComment: (state, action) => {
        delete state.myArticles[action.payload.article_id].comments[action.payload.id];
    },


    setFavouriteArticles: (state, action) => {
        state.favouriteArticles = action.payload;
    },
    clearFavouriteArticles: (state) => {
        state.favouriteArticles = {};
    },
    addFavouriteArticle: (state, action) => {
        state.favouriteArticles[action.payload.id] = action.payload;
    },
    deleteFavouriteArticle: (state, action) => {
        delete state.favouriteArticles[action.payload.id];
    },
    setFavouriteArticleComments: (state, action) => {
        state.favouriteArticles[action.payload.article_id].comments = action.payload.comments;
    },
    addFavouriteArticleComment: (state, action) => {
        state.favouriteArticles[action.payload.article_id].comments[action.payload.id] = action.payload;
    },
    deleteFavouriteArticleComment: (state, action) => {
        delete state.favouriteArticles[action.payload.article_id].comments[action.payload.id];
    },
  },
});

export const {
    setArticles,
    clearArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    setArticleComments,
    addArticleComment,
    deleteArticleComment,

    setMyArticles,
    clearMyArticles,
    addMyArticle,
    updateMyArticle,
    deleteMyArticle,
    setMyArticleComments,
    addMyArticleComment,
    deleteMyArticleComment,

    setFavouriteArticles,
    clearFavouriteArticles,
    addFavouriteArticle,
    deleteFavouriteArticle,
    setFavouriteArticleComments,
    addFavouriteArticleComment,
    deleteFavouriteArticleComment,

} = articlesSlice.actions;

export const selectArticles = (state) => state.articles.articles || {};
export const selectMyArticles = (state) => state.articles.myArticles || {};
export const selectFavouriteArticles = (state) => state.articles.favouriteArticles || {};
export default articlesSlice.reducer;
