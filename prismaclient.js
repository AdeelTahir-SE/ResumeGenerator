import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma
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
export async function createUser( email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return user;
}


export async function createResume(
  id,
  profile,
  aboutMeData,
  whyShouldHireYouData,
  projects,
  skills,
  company,
  education,
  interests
) {
  // Validate input data
  if (!Array.isArray(projects) || !Array.isArray(skills) || !Array.isArray(education) || !Array.isArray(interests)) {
    throw new TypeError('Projects, skills, education, and interests must be arrays');
  }

  try {
    // Start a transaction to ensure atomicity
    const resume = await prisma.$transaction(async (prisma) => {
      // Delete existing records
      await prisma.project.deleteMany({ where: { userId: id } });
      await prisma.skill.deleteMany({ where: { userId: id } });
      await prisma.education.deleteMany({ where: { userId: id } });
      await prisma.interest.deleteMany({ where: { userId: id } });

      // Update user record with new data
      return await prisma.user.update({
        where: { id: id },
        data: {
          profile:profile,
          aboutMe: {
            upsert: {
              create: {
                para1: aboutMeData.para1,
                para2: aboutMeData.para2,
                links: aboutMeData.links,
              },
              update: {
                para1: aboutMeData.para1,
                para2: aboutMeData.para2,
                links: aboutMeData.links,
              },
            },
          },
          whyShouldHireYou: {
            upsert: {
              create: {
                reason: whyShouldHireYouData.reason,
              },
              update: {
                reason: whyShouldHireYouData.reason,
              },
            },
          },
          projects: {
            create: projects.map(project => ({
              title: project.title,
              content: project.content,
              tags: project.tags.split(",").map(tag => tag.trim()),
              // Ensure correct association in your schema
            })),
          },
          skills: {
            create: skills.map(skill => ({
              name: skill.name,
              // Ensure correct association in your schema
            })),
          },
          company: {
              create: {
                name: company.name,
                logo: company.logo,
                jobtitle: company.jobtitle,
                // Ensure correct association in your schema
              }
              
          },
          education: {
            create: education.map(edu => ({
              detail: edu.details,
              // Ensure correct association in your schema
            })),
          },
          interest: {
            create: interests.map(interest => ({
              name: interest.name,
              // Ensure correct association in your schema
            })),
          },
        },
      });
    });

    return resume;
  } catch (error) {
    console.error('Error creating resume:', error);
    throw error;
  }
}


export async function getResume(id) {
  if (isNaN(id) || id <= 0) {
    console.log('Invalid user ID',id);
  }

  console.log('Fetching resume for user ID:', id);

  const resume = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      aboutMe: true,
      whyShouldHireYou: true,
      projects: true,
      skills: true,
      company: true,
      education: true,
      interest: true,
    },
  });
  return resume;
}
