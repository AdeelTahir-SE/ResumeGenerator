import express from "express"
import Router from "./router.js"
const app =express()
app.use(express.json());
app.use("/api",Router);
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})