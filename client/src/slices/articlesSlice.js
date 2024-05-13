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
      title: 'Title 1',
      content: 'Content 1',
      created_at: date,
    },
    ...
  }

  articles = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg',
      author_id: '13gf0893jfs',
      title: 'Title 1',
      content: 'Content 1',
      created_at: date,
    },
    ...
  }

  favouriteArticles = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg',
      author_id: '13gf0893jfs',
      title: 'Title 1',
      content: 'Content 1',
      created_at: date,
    },
    ...
  }
  */

  reducers: {
    setArticles: (state, action) => {
        state.articles = action.payload;
    },
    addArticle: (state, action) => {
        state.articles[action.payload.id] = action.payload;
    },
    updateArticle: (state, action) => {
        state.articles[action.payload.id] = action.payload;
    },
    deleteArticle: (state, action) => {
        delete state.articles[action.payload.id];
    },


    setMyArticles: (state, action) => {
        state.myArticles = action.payload;
    },
    addMyArticle: (state, action) => {
        state.myArticles[action.payload.id] = action.payload;
    },
    updateMyArticle: (state, action) => {
        state.myArticles[action.payload.id] = action.payload;
    },
    deleteMyArticle: (state, action) => {
        delete state.myArticles[action.payload.id];
    },


    setFavouriteArticles: (state, action) => {
        state.favouriteArticles = action.payload;
    },
    addFavouriteArticle: (state, action) => {
        state.favouriteArticles[action.payload.id] = action.payload;
    },
    deleteFavouriteArticle: (state, action) => {
        delete state.favouriteArticles[action.payload.id];
    },
  },
});

export const {
    setArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    setMyArticles,
    addMyArticle,
    updateMyArticle,
    deleteMyArticle,
    setFavouriteArticles,
    addFavouriteArticle,
    deleteFavouriteArticle,
} = articlesSlice.actions;

export const selectArticles = (state) => state.articles.articles || {};
export const selectMyArticles = (state) => state.articles.myArticles || {};
export const selectFavouriteArticles = (state) => state.articles.favouriteArticles || {};
export default articlesSlice.reducer;
