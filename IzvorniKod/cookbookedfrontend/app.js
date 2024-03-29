const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const path = require("path")

const app = express();

// Configuration

const { API_BASE_URL } = process.env;

// Proxy
app.use(
    "/api",
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true,
    })
);

app.listen(3000);

app.use(express.static(path.join(__dirname, 'build')))

app.get("/*", async (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    }
);
