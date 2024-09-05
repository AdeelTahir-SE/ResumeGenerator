import React from "react";
import company from "../assets/company.png";
import profile from "../assets/profile.png";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";
import "./Template.css"; // Import your CSS file

function Template2() {
  useEffect(() => {
    // Simulate fetching data
    Object.keys(aboutMe.links);
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
    name: "SewingCircle",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-vector%2Fcompany-logo-design_1155791.htm&psig=AOvVaw3p1XwVW4zZ2k7x2D7V9y7U&ust=1633666229833000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjYjJXJ0fMCFQAAAAAdAAAAABAD",
    jobtitle: "Full Stack Developer",
  });

  const [aboutMe, setAboutMe] = useState({
    para1: "Hello! I’m a passionate student at NUST who has rapidly acquired a strong skill set in full stack development in less than a year. My love for knowledge has driven me to master a variety of technologies, including React, Node.js, and various databases. This swift learning curve reflects my dedication to continuous growth and problem-solving.",
    para2: "I thrive in environments where I can leverage my skills and enthusiasm to contribute to meaningful projects. My journey in tech is characterized by a commitment to learning and adapting, which fuels my ability to tackle new challenges and stay ahead in the ever-evolving field of technology.",
    links: {
      link1: ["GitHub Link:", "https://github.com/AdeelTahir-SE"],
      link2: ["LinkedIn Link:", "https://www.linkedin.com/in/adeel-tahir-41ba212b9/"],
      link3: ["Email:", "adeeltahir6a@gmail.com"]
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
        <div className="upper flex flex-col items-center justify-center w-full mb-2 p-1 rounded-xl shadow-lg" style={{ background: "var(--primary-color)" }}>
          <img
            src={profile}
            alt="Profile"
            className="w-16 h-auto rounded-full border-2 border-white shadow-md"
          />
          <h2 className="text-lg text-center font-bold text-white mt-1">
            Applying for {companydata.jobtitle} at {companydata.name}
          </h2>
          <img
            src={company}
            alt="Company Logo"
            className="w-16 h-auto mt-1"
          />
        </div>

        <div className="flex flex-row w-full gap-1 mb-1">
          {/* Skills section */}
          <div className="skills p-1 w-1/3 text-white rounded-lg shadow-2xl" style={{ background: "var(--primary-dark)" }}>
            <h3 className="text-sm mb-1 font-bold border-b-2 pb-1 border-primary-light text-center">
              Skills
            </h3>
            <ul className="list-disc list-inside text-xs">
              {skills.length > 0 ? (
                skills.map((skill, i) => (
                  <li
                    key={i}
                    className="mb-1 transition-transform transform hover:scale-95"
                  >
                    {skill}
                  </li>
                ))
              ) : (
                <li>No skills listed.</li>
              )}
            </ul>
          </div>

          {/* Experience and Projects section */}
          <div className="others p-1 w-2/3 bg-white rounded-lg shadow-2xl">
            <h3 className="text-sm mb-1 font-bold" style={{ color: "var(--primary-color)", borderBottom: "2px solid var(--primary-light)" }}>
              Experience & Projects
            </h3>
            <ul className="list-none text-xs">
              {data.length > 0 ? (
                data.map((item, i) => (
                  <li key={i} className="mb-2">
                    <h4 className="text-sm font-semibold" style={{ color: "var(--text-color)" }}>
                      {item.title}
                    </h4>
                    <p style={{ color: "var(--text-color)" }}>{item.content}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
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
        </div>

        <div className="flex flex-row w-full gap-1">
          {/* About Me section */}
          <div className="about-me p-1 bg-white rounded-lg shadow-2xl w-1/2">
            <h3 className="text-sm mb-1 font-bold" style={{ color: "var(--primary-color)", borderBottom: "2px solid var(--primary-light)" }}>
              About Me
            </h3>
            <p className="text-xs" style={{ color: "var(--text-color)" }}>{aboutMe.para1}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-color)" }}>{aboutMe.para2}</p>
            <ul className="text-xs mt-1 list-disc list-inside" style={{ color: "var(--text-color)" }}>
              {Object.entries(aboutMe.links).map(([key, [label, link]], i) => (
                <li key={i} className="mb-1">
                  {label} <a href={link} className="text-blue-600">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Education and Interests section */}
          <div className="education-interests p-1 w-1/2 text-white rounded-lg shadow-2xl" style={{ background: "var(--primary-dark)" }}>
            <h3 className="text-sm mb-1 font-bold border-b-2 pb-1 border-primary-light text-center">
              Education & Interests
            </h3>
            <ul className="text-xs list-disc list-inside">
              {education.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
            <h4 className="text-xs mt-2 font-semibold text-primary-light">Interests:</h4>
            <ul className="text-xs list-disc list-inside mt-1">
              {interests.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Should You Hire Me section */}
        <div className="why-hire-you p-1 mt-2 bg-white rounded-lg shadow-2xl w-full">
          <h3 className="text-sm mb-1 font-bold" style={{ color: "var(--primary-color)", borderBottom: "2px solid var(--primary-light)" }}>
            Why Should You Hire Me?
          </h3>
          <p className="text-xs" style={{ color: "var(--text-color)" }}>{whyShouldHireYou}</p>
        </div>
      </div>
    </>
  );
}

export default Template2;
