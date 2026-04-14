const { createProxyMiddleware } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../config/services");

module.exports = (app) => {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
    }),
  );
};
