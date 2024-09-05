import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function loginuser(email,password){
  const user=await prisma.user.findUnique({
    where:{
      email
    }
  })
  if(user.password===password){
    return user
  }
  else{
    return null;
  }
}
export async function createUser(name, email, password) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
}

export async function createResume(
  email,
  password,
  aboutMeData,
  whyShouldHireYouData,
  projects,
  skills,
  company,
  education,
  interests
) {
  const resume = await prisma.user.create({
    data: {
      email,
      password,
      aboutMe: {
        create: {
          para1: aboutMeData.para1,
          para2: aboutMeData.para2,
          links: aboutMeData.links,
        },
      },
      whyShouldHireYou: {
        create: {
          reason: whyShouldHireYouData.reason,
        },
      },
      projects: {
        create: projects.map((project) => ({
          title: project.title,
          content: project.content,
          tags: project.tags.split(",").map(tag => tag.trim()), // Ensure tags are trimmed
        })),
      },
      skills: {
        create: skills.map((skill) => ({
          name: skill.name, // Corrected to match schema
        })),
      },
      company: {
        create: {
          name: company.name,
          logo: company.logo,
          jobtitle: company.jobtitle,
        },
      },
      education: {
        create: education.map((edu) => ({
          detail: edu.details, // Corrected to match schema
        })),
      },
      interest: { // Corrected from interest to interests
        create: interests.map((interest) => ({
          name: interest.name, // Corrected to match schema
        })),
      },
    },
  });

  return resume;
}

export async function getResume(email) {
  const resume = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      aboutMe: true,
      whyShouldHireYou: true,
      projects: true,
      skills: true,
      company: true,
      education: true,
      interests: true,
    },
  });
  return resume;
}
