import React from "react";
import company from "../assets/compan3.png";
import profile from "../assets/profile.png";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import {useState,useEffect} from "react"
import "./Template.css"; // Import your CSS file

function Template1() {
  useEffect(()=>{
//     async function fetchResumeData(email){
// const response =await fetch(`http:localhost:3000/resumedata/${email}`);
// const resumedata =await response.json();
// setData(resumedata.data);
// setAboutMe(resumedata.aboutMe);
// setCompanyData(resumedata.companyData)
// setEducation(resumedata.education);
// setSkills(resumedata.skills)
// setInterests(resumedata.interests)
// setWhyShouldHireYou(resumedata.whyShouldHireYou)
//     }
//     fetchResumeData(email)
Object.keys(aboutMe.links)
  },[]);


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
    name: "SewingCircle",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-vector%2Fcompany-logo-design_1155791.htm&psig=AOvVaw3p1XwVW4zZ2k7x2D7V9y7U&ust=1633666229833000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjYjJXJ0fMCFQAAAAAdAAAAABAD",
    jobtitle: "Full Stack Developer",
  });

  const [aboutMe, setAboutMe] = useState({
    para1: "Hello! I’m a passionate student at NUST who has rapidly acquired a strong skill set in full stack development in less than a year. My love for knowledge has driven me to master a variety of technologies, including React, Node.js, and various databases. This swift learning curve reflects my dedication to continuous growth and problem-solving.",
    para2: "I thrive in environments where I can leverage my skills and enthusiasm to contribute to meaningful projects. My journey in tech is characterized by a commitment to learning and adapting, which fuels my ability to tackle new challenges and stay ahead in the ever-evolving field of technology.",
    links: {
    link1:["github Link:","https://github.com/AdeelTahir-SE"],
    link2:["Linkedin Link:","https://www.linkedin.com/in/adeel-tahir-41ba212b9/"],
    link3:["Email:","adeeltahir6a@gmail.com"]
    }
  });

  const [skills, setSkills] = useState([
    "CSS",
    "MongoDB",
    "tailwindcss",
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
    "Self-taught in Full Stack Development in less than a year",
    "Enthusiastic about Continuous Learning and Growth",
    "Passionate about Exploring New Technologies",
  ]);

  const [interests, setInterests] = useState([
    "Exploring New Technologies",
    "Traveling and Learning About Different Cultures",
    "Playing and Analyzing Strategy Games",
    "Participating in Coding Competitions",
  ]);

  const [whyShouldHireYou, setWhyShouldHireYou] = useState(
    "I am a highly motivated Full Stack Developer with a strong foundation in both front-end and back-end technologies. My experience with React, Node.js, and various databases equips me to tackle complex problems and deliver robust solutions. My rapid learning ability and enthusiasm for technology make me a valuable asset for any team."
  );
   const svgColor = getComputedStyle(document.documentElement).getPropertyValue('--svgcolor').trim();

  const svgElement = <Bgsvg color={svgColor} />;
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  const svgDataURL = `data:image/svg+xml;base64,${window.btoa(svgString)}`;


  return (
    <>
     <div
  className="print-container w-full flex flex-col items-center justify-center min-h-screen p-2"
  style={{
    background: `url(${svgDataURL}) no-repeat center center`,
    backgroundSize: "cover", // or "cover" depending on your needs
    fontFamily: "Arial, sans-serif",
  }}
>
        {/* Upper section with profile, title, and company logo */}
        <div className="upper flex flex-row justify-around items-center w-full mb-2 bg-white p-2 rounded-xl shadow-lg transform hover:scale-95 transition-transform duration-500 ease-in-out">
          <img
            src={profile}
            alt="Profile"
            className="w-16 h-auto rounded-full border-4 border-[color:var(--primary-color)] shadow-md"
          />
          <h2 className="text-lg text-center w-2/3 font-bold text-[color:var(--text-color)]">
            Applying for {companydata.jobtitle} at {companydata.name}
          </h2>
          <img
            src={company}
            alt="Company Logo"
            className="max-w-16 shadow-md border-4 "
          />
        </div>

        <div className="flex flex-row w-full gap-2">
          {/* Skills section */}
          <div className="skills bg-gradient-to-r from-[color:var(--primary-color)] to-[color:var(--primary-dark)] p-1 w-1/3 text-white rounded-lg shadow-2xl">
            <h3 className="text-lg mb-2 font-bold border-b-2 pb-1 border-[color:var(--primary-light)] text-center">
              Skills
            </h3>
            <ul className="list-disc list-inside text-xs ">
              {skills.length > 0 ? (
                skills.map((v, i) => (
                  <li
                    key={i}
                    className="mb-1 transition-transform transform hover:scale-95"
                  >
                    {v}
                  </li>
                ))
              ) : (
                <li>No skills listed.</li>
              )}
            </ul>
          </div>

          {/* Experience and Projects section */}
          <div className="others p-2 w-full bg-white rounded-lg shadow-2xl">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Experience & Projects
            </h3>
            <ul className="list-none text-xs">
              {data.length > 0 ? (
                data.map((v, i) => (
                  <li key={i} className="mb-2">
                    <h4 className="text-md font-semibold text-gray-800">
                      {v.title}
                    </h4>
                    <p className="text-gray-700 text-xs">{v.content}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {v.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                ))
              ) : (
                <li>No experience or projects listed.</li>
              )}
            </ul>
          </div>

          <div className="about-me p-4 bg-white rounded-lg shadow-2xl w-1/2">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              About Me
            </h3>
            <p className="text-xs text-gray-700">{aboutMe.para1}</p>
            <p className="text-xs text-gray-700 mt-2">{aboutMe.para2}</p>
            <ul className="text-xs text-gray-700 mt-2 list-disc p-2">
  {Object.keys(aboutMe.links).map((key) => (
    <li key={key}>
      {aboutMe.links[key][0]}{" "}
      <a className="text-green-800 font-bold" href={aboutMe.links[key][1]}>
        {aboutMe.links[key][1]}
      </a>
    </li>
  ))}
</ul>
             
          </div>
        </div>

        <div className="flex flex-row w-full mt-2 gap-4">
          {/* Education & Interests section */}
          <div className="education-interests p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Education
            </h3>

            <ul className="list-disc list-inside text-xs">
              {education &&
                education.map((element) => {
                  return <li className="mb-1">{element}</li>;
                })}
            </ul>
          </div>

          {/* Interests section */}
          <div className="interests p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Interests
            </h3>
            <ul className="list-disc list-inside text-xs">
              {interests &&
                interests.map((element) => {
                  return <li className="mb-1">{element}</li>;
                })}
            </ul>
          </div>

          {/* Why We Should Hire You section */}
          <div className="why-hire p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Why We Should Hire You
            </h3>
            <p className="text-xs text-gray-700">{whyShouldHireYou}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Template1;
