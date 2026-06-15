const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://198.195.239.50:8095",
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
