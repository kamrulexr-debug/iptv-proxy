const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://198.195.239.50:8095",
    changeOrigin: true,
    secure: false,
    ws: true,
    proxyTimeout: 60000,
    timeout: 60000,

    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36"
      );
    },

    onProxyRes(proxyRes) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },

    onError(err, req, res) {
      console.error("PROXY ERROR:", err);
      if (!res.headersSent) {
        res.status(500).send("Proxy Error");
      }
    }
  })
);

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
