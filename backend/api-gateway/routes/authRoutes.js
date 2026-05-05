const { createProxyMiddleware } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../config/services");

module.exports = (app) => {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: AUTH_SERVICE,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        "^/": "/api/auth/",
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
      },
    }),
  );
};

/*
v1
text : wasail tawasol 3an bo3d 
fikra 3ama 
2q f nas
principe de communication (enivitable, la rij3ata fi tawasol)
motivation(types lfar9 + t3rif)
feedback (types 4 kolo les types (positif + negative))
risalat talab l3amal 

v2
text : dev fullstack
type de question (fermet overt lmohim kolo)
ecoute actif
lettre de motivation
*/
