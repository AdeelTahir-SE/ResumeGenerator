import express from "express"
import router from "./router.js"
import cors from "cors"
const app =express()
app.use(express.json());
app.use(cors())

app.use("/api",router);
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})