import React from "react";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect,useMemo } from "react";
import "./Template.css"; // Import your CSS file
import { useUser } from "../Context/context"; // Adjust the path as needed

function Template1() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [image,setImage]=useState();
  const [companydata, setCompanyData] = useState({});
  const [aboutMe, setAboutMe] = useState({});
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [whyShouldHireYou, setWhyShouldHireYou] = useState(``);
  
  useEffect(() => {
   
    async function fetchResumeData(id) {
      const response = await fetch(`http://localhost:3000/api/resumedata/${id}`);
      const resumedata = await response.json();
      setImage(resumedata.profile);
      setData(resumedata.projects);
      setAboutMe(resumedata.aboutMe);
      setCompanyData(resumedata.company[0]);
      setEducation(resumedata.education);
      setSkills(resumedata.skills);
      setInterests(resumedata.interest);
      setWhyShouldHireYou(resumedata.whyShouldHireYou.reason);
    }
    if(user&&user.id){
    fetchResumeData(user.id); // Fetch with default ID first
    }
    else{
      fetchResumeData(localStorage.getItem("id"));
      
    }
  }, []);
  

  const svgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--svgcolor")
    .trim();

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
        <div className="upper flex flex-row justify-around items-center w-full mb-2 bg-white p-2 rounded-xl shadow-lg transform hover:scale-95 transition-transform duration-500 ease-in-out">
          <img
            src={image}
            alt="Profile"
            className="w-16 h-auto rounded-full border-4 border-[color:var(--primary-color)] shadow-md"
          />
          <h2 className="text-lg text-center w-2/3 font-bold text-[color:var(--text-color)]">
            Applying for {companydata.jobtitle} at {companydata.name}
          </h2>
          <img
            src={companydata.logo}
            alt="Company Logo"
            className="max-w-16 shadow-md border-4 "
          />
        </div>

        <div className="flex flex-row w-full gap-2">
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
                    {v.name}
                  </li>
                ))
              ) : (
                <li>No skills listed.</li>
              )}
            </ul>
          </div>

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
            <ul className="list-none list-inside text-xs space-y-1 p-2 text-blue-400">
  {aboutMe.links && aboutMe.links.map((element, index) => (
    <li 
      key={index} 
      className="hover:text-blue-500 transition-colors duration-200"
    >
      {element}
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
                  return <li className="mb-1">{element.detail}</li>;
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
                  return <li className="mb-1">{element.name}</li>;
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
