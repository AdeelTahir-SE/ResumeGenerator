import {Router} from "express"
import { createResume,createUser,getResume,loginuser } from "./prismaclient.js";
import {webPagetopdf,webPagetojpeg} from "./puppeteer.js";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const router = Router();
router.post("/resumedata/:email", async (req, res) => {

  const {
    aboutMeData,
    whyShouldHireYou,
    password,
    projects,
    skills,
    company,
    education,
    email,
    interests,
  } = req.body;
 
  try {
    const resume = await createResume(
      email,
      password,
      aboutMeData,
      whyShouldHireYou,
      projects,
      skills,
      company,
      education,
      interests
    );

    console.log("Resume created:", resume);

    res.status(201).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the resume.' });
  }
});




router.get("/resumedata/:email",(req,res)=>{
    const {email}=req.params;
res.json(getResume(email))
});

router.get("/templates/images",async (req,res)=>{
for(let i=1;i<5;i++)
  await webPagetojpeg(`http://localhost:5173/Template${i}`,`Frontend/resumegenerator/src/assets/outputresume${i}.jpeg`)
})


router.get("/templates/pdf/:id",async(req,res)=>{
const{id}=req.params;
  await webPagetopdf(`http://localhost:5173/Template${id}`,`Frontend/resumegenerator/src/assets/outputresume${id}.pdf`)
  res.json({msg:"success"})
})


// Backend route for creating a user
router.post("/user/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const response = await createUser(name, email, password);
    if (response) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: `Prisma Client Error: ${error.message}` });
    } else {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email' });
    }

    // Validate password
    const isPasswordValid = await validatePassword(password, user.password); // Replace with your password validation function
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: `Prisma Client Error: ${error.message}` });
    } else {
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  }
});

export default router;