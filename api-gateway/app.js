const express=require("express");
const {createProxyMiddleware}=require("http-proxy-middleware");
const app= express();

app.use("/airlines",createProxyMiddleware({target:"http://127.0.0.1:3001",changeOrigin:true}));
app.use("/flight",createProxyMiddleware({target:"http://127.0.0.1:3002",changeOrigin:true}));
app.use("/passenger",createProxyMiddleware({target:"http://127.0.0.1:3003",changeOrigin:true}));

app.listen(3000, ()=>{
    console.log("Gateway is listening on port 3000");
});