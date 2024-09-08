import React from "react";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";
import "./Template.css"; // Import your CSS file
import { useUser } from '../Context/context.jsx'; // Adjust the path as needed

function Template2() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [companydata, setCompanyData] = useState({});
  const [aboutMe, setAboutMe] = useState({});
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [image,setImage]=useState();

  const [whyShouldHireYou, setWhyShouldHireYou] = useState({});
  useEffect(() => {

    async function fetchResumeData(id) {
      const response = await fetch(`http://localhost:3000/api/resumedata/${id}`);
      const resumedata = await response.json();
      setImage(resumedata.profile)
      setData(resumedata.projects);
      setAboutMe(resumedata.aboutMe);
      setCompanyData(resumedata.company[0]);
      setEducation(resumedata.education);
      setSkills(resumedata.skills);
      setInterests(resumedata.interest);
      setWhyShouldHireYou(resumedata.whyShouldHireYou);
    }
    if(user&&user.id){
      fetchResumeData(user.id); // Fetch with default ID first
      }
      else{
        fetchResumeData(localStorage.getItem("id"));
      }  }, []);
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
            src={image}
            alt="Profile"
            className="w-16 h-auto rounded-full border-2 border-white shadow-md"
          />
          <h2 className="text-lg text-center font-bold text-white mt-1">
            Applying for {companydata.jobtitle} at {companydata.name}
          </h2>
          <img
            src={companydata.logo}
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
                    {skill.name}
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
              {aboutMe.links&&aboutMe.links.map((value, i) => (
                <li key={i} className="mb-1">
{value}
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
                  {item.detail}
                </li>
              ))}
            </ul>
            <h4 className="text-xs mt-2 font-semibold text-primary-light">Interests:</h4>
            <ul className="text-xs list-disc list-inside mt-1">
              {interests.map((item, i) => (
                <li key={i} className="mb-1">
                  {item.name}
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
          <p className="text-xs" style={{ color: "var(--text-color)" }}>{whyShouldHireYou.reason}</p>
        </div>
      </div>
    </>
  );
}

export default Template2;
