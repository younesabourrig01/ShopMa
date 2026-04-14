const { createProxyMiddleware } = require("http-proxy-middleware");
const { PRODUCT_SERVICE } = require("../../config/services");

module.exports = (app) => {
  app.use(
    "/api/products",
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
    }),
  );
};
