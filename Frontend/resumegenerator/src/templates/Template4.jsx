import React from "react";
import company from "../assets/company.png";
import profile from "../assets/profile.png";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";

function Template4() {
  useEffect(() => {
    // Example of data fetch (not used in this static example)
    // async function fetchResumeData(email) {
    //   const response = await fetch(`http://localhost:3000/resumedata/${email}`);
    //   const resumedata = await response.json();
    //   setData(resumedata.data);
    //   setAboutMe(resumedata.aboutMe);
    //   setCompanyData(resumedata.companyData);
    //   setEducation(resumedata.education);
    //   setSkills(resumedata.skills);
    //   setInterests(resumedata.interests);
    //   setWhyShouldHireYou(resumedata.whyShouldHireYou);
    // }
    // fetchResumeData(email);
  }, []);

  const [data, setData] = useState([
    {
      title: "Weather App",
      content: "A weather application frontend built with React, utilizing an API to fetch weather data.",
      tags: ["React", "API", "Node.js", "Express.js", "Redis"],
    },
    {
      title: "GitHub API CLI",
      content: "A command-line interface application for interacting with GitHub's API, created using Node.js.",
      tags: ["Node.js", "GitHub API", "Express.js"],
    },
    {
      title: "Task Tracker CLI",
      content: "A command-line tool for managing tasks, built with Node.js and CLI libraries.",
      tags: ["Node.js", "CLI", "Express.js"],
    },
    {
      title: "Restaurant App",
      content: "A web application for managing restaurant orders and menu, developed with React and backend technologies.",
      tags: ["React", "Backend", "Express.js", "Node.js"],
    },
    {
      title: "Blogging App and API",
      content: "A blogging platform with a custom API, built with React for the frontend and Node.js for the backend.",
      tags: ["React", "Node.js", "API", "Express.js", "Prisma"],
    },
    {
      title: "Resume Generator",
      content: "A tool for generating resumes, designed with a user-friendly interface and export functionality.",
      tags: ["Export Functionality", "Express.js", "Node.js", "React"],
    },
  ]);

  const [companydata, setCompanyData] = useState({
    name: "TechFusion",
    logo: "https://www.example.com/logo3.png",
    jobtitle: "Senior Software Engineer",
  });

  const [aboutMe, setAboutMe] = useState({
    para1: "I’m a highly skilled Full Stack Developer with extensive experience in building scalable web applications. My technical expertise spans both frontend and backend technologies, allowing me to deliver complete solutions with a focus on performance and user experience.",
    para2: "My passion for technology drives me to continuously learn and adapt to new challenges. I excel in collaborative environments and am committed to delivering high-quality results in all my projects.",
    links: {
      link1: ["GitHub:", "https://github.com/AdeelTahir-SE"],
      link2: ["LinkedIn:", "https://www.linkedin.com/in/adeel-tahir-41ba212b9/"],
      link3: ["Email:", "adeeltahir6a@gmail.com"],
    },
  });

  const [skills, setSkills] = useState([
    "CSS",
    "MongoDB",
    "Tailwind CSS",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "React",
    "JavaScript",
    "HTML",
    "Express.js",
    "REST APIs",
    "Redis",
    "API Integration",
  ]);

  const [education, setEducation] = useState([
    "Student at NUST",
    "Self-taught in Full Stack Development",
    "Dedicated to Continuous Learning",
    "Passionate about Exploring New Technologies",
  ]);

  const [interests, setInterests] = useState([
    "Exploring New Technologies",
    "Traveling and Learning About Different Cultures",
    "Playing and Analyzing Strategy Games",
    "Participating in Coding Competitions",
  ]);

  const [whyShouldHireYou, setWhyShouldHireYou] = useState(
    "I bring a strong combination of technical skills and a proactive approach to problem-solving. My background in full stack development, along with my commitment to continuous improvement, makes me a valuable addition to any team. I am driven to deliver impactful solutions and thrive in dynamic environments."
  );

  const svgElement = <Bgsvg color="#34d399" />; // Green color for a fresh look
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  const svgDataURL = `data:image/svg+xml;base64,${window.btoa(svgString)}`;

  return (
    <div
      className="print-container w-full flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"
      style={{
        background: `url(${svgDataURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Main container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full md:w-1/4 p-4">
          <div className="flex flex-col items-center">
            <img
              src={profile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-white shadow-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-1">{companydata.name}</h2>
            <h3 className="text-sm mb-2">{companydata.jobtitle}</h3>
            <img
              src={company}
              alt="Company Logo"
              className="w-16 h-auto mb-2"
            />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">Contact</h4>
            {Object.entries(aboutMe.links).map(([key, [label, url]], index) => (
              <p key={index} className="text-xs mb-1">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:underline">{label} {url}</a>
              </p>
            ))}
          </div>
          <section className="bg-white p-3 mt-2 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Why Should Hire You</h3>
            <p className="text-gray-700 text-xs">{whyShouldHireYou}</p>
          </section>
        </aside>

        {/* Main Content */}
        <main className="p-4 w-full md:w-3/4">
          {/* About Me Section */}
          <section className="bg-white p-3 rounded-lg shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-700 text-xs mb-2">{aboutMe.para1}</p>
            <p className="text-gray-700 text-xs">{aboutMe.para2}</p>
          </section>

          {/* Skills and Experience Sections */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Skills Section */}
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-3 text-white rounded-lg shadow-sm w-full md:w-1/2">
              <h3 className="text-sm font-semibold mb-2">Skills</h3>
              <ul className="list-disc list-inside text-xs">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <li key={index} className="mb-1">{skill}</li>
                  ))
                ) : (
                  <li>No skills listed.</li>
                )}
              </ul>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-3 rounded-lg shadow-sm w-full md:w-1/2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Experience & Projects</h3>
              <ul className="list-none text-xs">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <li key={index} className="mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-700 mb-1">{item.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-gray-200 text-gray-900 px-1 py-0.5 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No experience listed.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Education and Interests Sections */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Education Section */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 text-white rounded-lg shadow-sm w-full md:w-1/2">
              <h3 className="text-sm font-semibold mb-2">Education</h3>
              <ul className="list-disc list-inside text-xs">
                {education.length > 0 ? (
                  education.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))
                ) : (
                  <li>No education information available.</li>
                )}
              </ul>
            </div>

            {/* Interests Section */}
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 text-white rounded-lg shadow-sm w-full md:w-1/2">
              <h3 className="text-sm font-semibold mb-2">Interests</h3>
              <ul className="list-disc list-inside text-xs">
                {interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <li key={index} className="mb-1">{interest}</li>
                  ))
                ) : (
                  <li>No interests listed.</li>
                )}
              </ul>
            </div>
          </div>

         
        </main>
      </div>
    </div>
  );
}

export default Template4;
