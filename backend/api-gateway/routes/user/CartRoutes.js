const { createProxyMiddleware } = require("http-proxy-middleware");
const { CART_SERVICE } = require("../../config/services");
const auth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  app.use(
    "/api/user/cart",
    auth,
    createProxyMiddleware({
      target: CART_SERVICE,
      changeOrigin: true,
    }),
  );
};
