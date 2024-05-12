// routes.js
const ROUTES = {
    root: () => "/",
    hub: (userId) => `/hub/${userId}`,
    login: () => "/login",
    signup: () => "/signup",
    dashboard: (userId) => `/dashboard/${userId}`,
    userAccount: (userId) => `/userAccount/${userId}`,
    articles: (userId) => `/articles/${userId}`,
    savedArticles: (userId) => `/savedArticles/${userId}`,
};

export default ROUTES;
  