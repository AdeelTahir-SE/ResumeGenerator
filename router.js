import {Router} from "express"
import { createResume,createUser,getResume,loginuser } from "./prismaclient.js";
import {webPagetopdf,webPagetojpeg} from "./puppeteer.js";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from "./prismaclient.js";
const router = Router();
router.get("/resumedata/:id", async (req, res) => {
  const { id } = req.params;
  try {

    const resume = await getResume(parseInt(id,10));
    if (resume) {
      res.status(200).json(resume);
    } else {
      res.status(404).json({ message: 'Resume not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the resume.' });
  }
});

router.post("/resumedata", async (req, res) => {

  const {
    id,
    aboutMeData,
    whyShouldHireYou,
    projects,
    skills,
    company,
    profileImage,
    education,
    interests,
  } = req.body;
  console.log('Received data:', {
    id,
    aboutMeData,
    whyShouldHireYou,
    projects,
    skills,
    company,
    education,
    interests
  });
  try {
    const resume = await createResume(
      parseInt(id),
      profileImage,
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






router.get("/templates/images",async (req,res)=>{
for(let i=1;i<5;i++){
  await webPagetojpeg(`http://localhost:5173/Template${i}`,`Frontend/resumegenerator/src/assets/outputresume${i}.jpeg`)
}
res.json({message:"created successfully!"})
}
)


router.get("/templates/pdf/:id",async(req,res)=>{
const{id}=req.params;
  await webPagetopdf(`http://localhost:5173/Template${id}`,`Frontend/resumegenerator/src/assets/outputresume${id}.pdf`)
  res.json({msg:"success"})
})

router.post("/user/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    // Create user
    const response = await createUser( email, password);
    if (response) {
      res.status(201).json({ user:response.id,message:"User created successfully!" });
    } else {
      res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: `Prisma Client Error: ${error.message}` });
    } else {
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  }
});

// Backend route for user login
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email' });
    }

    // Validate password
    const isPasswordValid = await loginuser(email, password); // Replace with your password validation function
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
console.log(isPasswordValid.id)
    res.status(200).json({ user: isPasswordValid.id,message:"login successfully!" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: `Prisma Client Error: ${error.message}` });
    } else {
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  }
});

export default router;