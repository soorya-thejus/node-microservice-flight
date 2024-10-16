const express=require("express");
const {createProxyMiddleware}=require("http-proxy-middleware");

const app= express();

app.use("/airlines",createProxyMiddleware({target:"http://localhost:3001",changeOrigin:true}));
app.use("/flight",createProxyMiddleware({target:"http://localhost:3002",changeOrigin:true}));
app.use("/passenger",createProxyMiddleware({target:"http://localhost:3003",changeOrigin:true}));

app.listen(3000, ()=>{
    console.log("Gateway is listening on port 3000");
});