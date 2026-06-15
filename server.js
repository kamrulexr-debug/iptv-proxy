const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "http://198.195.239.50:8095",
    changeOrigin: true,
    secure: false
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
