import { createResume } from "./prismaclient.js";

// Define the data
const data = {
  profileImage: "https://example.com/profile.jpg",
  company: {
    name: "Tech Solutions Inc.",
    logo: "https://example.com/logo.png",
    jobtitle: "Software Engineer"
  },
  aboutMeData: {
    para1: "Passionate software engineer with over 5 years of experience in web development.",
    para2: "Expert in React, Node.js, and PostgreSQL. Always eager to learn and adapt to new technologies.",
    links: [
      "https://github.com/username",
      "https://linkedin.com/in/username"
    ]
  },
  whyShouldHireYou: {
    reason: "I bring a strong background in full-stack development and a passion for solving complex problems."
  },
  email: "example@dosafmain.com",
  password: "aadddas",
  skills: [
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" }
  ],
  education: [
    { details: "B.Sc. in Computer Science from University of Example" }
  ],
  interests: [
    { name: "Open Source Projects" },
    { name: "Machine Learning" }
  ],
  projects: [
    { title: "Personal Blog", content: "A blog to share my tech journey.", tags: "blog, tech" },
    { title: "Portfolio Website", content: "A portfolio website to showcase my work.", tags: "portfolio, website" }
  ]
};

// Destructure the data
const {
  aboutMeData,
  whyShouldHireYou,
  projects,
  skills,
  company,
  education,
  interests,
  email,
  password
} = data;

(async () => {
  try {
    // Call the createResume function
    await createResume(
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
    console.log("Resume created successfully!");
  } catch (error) {
    console.error("Error creating resume:", error);
  }
})();
