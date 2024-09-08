import express from "express"
import router from "./router.js"
import cors from "cors"
const app =express()
app.use(express.json({ limit: '500mb' })); 
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/api",router);
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})