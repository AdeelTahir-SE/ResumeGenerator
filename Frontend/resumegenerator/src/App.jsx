import React from "react";
import company from "./assets/compan3.png";
import profile from "./assets/profile.png";
import Bgsvg from "./components/bgsvg";
import ReactDOMServer from "react-dom/server";

import './App.css'; // Import your CSS file

function App() {
  const data = [
    {
      title: "Weather Frontend",
      content: "A weather application frontend built with React, utilizing an API to fetch weather data.",
      tags: ["React", "API"],
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
  ];

  const skills = [
    "CSS",
    "MongoDB",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "React",
    "JavaScript",
  ];
  const svgElement = <Bgsvg color='#14532d' />;
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  const svgDataURL = `data:image/svg+xml;base64,${window.btoa(svgString)}`;

  return (
    <>
        <div
      className="print-container w-full flex flex-col items-center justify-center min-h-screen p-2"
      style={{
        background: `url(${svgDataURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: 'Poppins, sans-serif',
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
            Applying for Full Stack Developer at Company1
          </h2>
          <img
            src={company}
            alt="Company Logo"
            className="max-w-16 shadow-md border-4 "
          />
        </div>

        <div className="flex flex-row w-full gap-2">
          {/* Skills section */}
          <div className="skills bg-gradient-to-r from-[color:var(--primary-color)] to-[color:var(--primary-dark)] p-2 w-1/4 text-white rounded-lg shadow-2xl">
            <h3 className="text-lg mb-2 font-bold border-b-2 pb-1 border-[color:var(--primary-light)]">
              Skills
            </h3>
            <ul className="list-disc list-inside text-xs">
              {skills.length > 0 ? (
                skills.map((v, i) => (
                  <li key={i} className="mb-1 transition-transform transform hover:scale-95">
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
                    <p className="text-gray-700 text-xs">
                      {v.content}
                    </p>
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
            <p className="text-xs text-gray-700">
              Hello! I’m a dedicated Full Stack Developer with a strong background in both front-end and back-end technologies. My journey began with a passion for solving problems and creating innovative solutions through code. Over the years, I’ve honed my skills in React, Node.js, and various databases, which allows me to build robust and scalable applications.
            </p>
            <p className="text-xs text-gray-700 mt-2">
              I thrive in collaborative environments where I can contribute to team goals while also taking on individual responsibilities. My experience with diverse technologies such as PostgreSQL, MongoDB, and Prisma enables me to approach challenges from multiple angles and deliver high-quality solutions. I’m also committed to continuous learning and staying current with industry trends, which fuels my enthusiasm for tackling new projects and exploring emerging technologies.
            </p>
          </div>
        </div>

        <div className="flex flex-row w-full mt-2 gap-4">
          {/* Education & Interests section */}
          <div className="education-interests p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Education & Interests
            </h3>
            <ul className="list-disc list-inside text-xs">
              <li className="mb-1">Bachelor's Degree in Computer Science</li>
              <li className="mb-1">Certified Full Stack Developer</li>
              <li className="mb-1">Enthusiastic about Open Source Projects</li>
              <li className="mb-1">Passionate about Learning New Technologies</li>
            </ul>
          </div>

          {/* Interests section */}
          <div className="interests p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Interests
            </h3>
            <ul className="list-disc list-inside text-xs">
              <li className="mb-1">Exploring New Technologies</li>
              <li className="mb-1">Traveling and Learning About Different Cultures</li>
              <li className="mb-1">Playing and Analyzing Strategy Games</li>
              <li className="mb-1">Participating in Coding Competitions</li>
            </ul>
          </div>

          {/* Why We Should Hire You section */}
          <div className="why-hire p-4 bg-white rounded-lg shadow-2xl w-1/3">
            <h3 className="text-lg mb-2 font-bold text-[color:var(--text-color)] border-b-2 pb-1 border-gray-300">
              Why We Should Hire You
            </h3>
            <p className="text-xs text-gray-700">
      I am a highly motivated Full Stack Developer with a strong foundation in both front-end and back-end technologies. My experience with React, Node.js, and various databases equips me to tackle complex problems and deliver robust solutions. 
    </p>
  </div>
</div>

      </div>
    </>
  );
}

export default App;
