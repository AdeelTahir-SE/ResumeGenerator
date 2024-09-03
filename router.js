import {Router} from "express"
import webPagetopdf from "./puppeteer";
const router = Router();
let dataToconvertToResume;
router.post("/pdf",(req,res)=>{
const {data} =req.body;

})

router.get("/pdf",async (req,res)=>{
await webPagetopdf("http://localhost:5173/","outputresumes/output.pdf")
})