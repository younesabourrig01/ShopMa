const { createProxyMiddleware } = require("http-proxy-middleware");
const { PRODUCT_SERVICE } = require("../../config/services");

module.exports = (app) => {
  app.use(
    "/api/products",
    createProxyMiddleware({
      target: PRODUCT_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/products/",
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
      },
    }),
  );
};
