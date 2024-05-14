// routes.js
const ROUTES = {
    root: () => "/",
    hub: (userId) => `/hub/${userId}`,
    login: () => "/login",
    signup: () => "/signup",
    dashboard: (userId) => `/dashboard/${userId}`,
    userAccount: (userId) => `/userAccount/${userId}`,
    articles: (userId) => `/articles/${userId}`,
    favouriteArticles: (userId) => `/favouriteArticles/${userId}`,
    article: (articleId, articleType) => `/article/${articleId}/${articleType}`,
};

export default ROUTES;
  