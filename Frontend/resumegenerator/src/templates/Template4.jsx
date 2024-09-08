import React from "react";
import company from "../assets/company.png";
import profile from "../assets/profile.png";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";
import { useUser } from '../Context/context.jsx'; // Adjust the path as needed

function Template4() {
  const { user,setUser } = useUser();
  const [data, setData] = useState([]);
  const [companydata, setCompanyData] = useState({});
  const [aboutMe, setAboutMe] = useState({});
  const [education, setEducation] = useState([]);
  const [image,setImage]=useState();

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
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
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-white shadow-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-1">{companydata.name}</h2>
            <h3 className="text-sm mb-2">{companydata.jobtitle}</h3>
            <img
              src={companydata.logo}
              alt="Company Logo"
              className="w-16 h-auto mb-2"
            />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">Contact</h4>
            {aboutMe.links&&aboutMe.links.map((value, index) => (
              <p key={index} className="text-xs mb-1">
{value}
              </p>
            ))}
          </div>
          <section className="bg-white p-3 mt-2 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Why Should Hire You</h3>
            <p className="text-gray-700 text-xs">{whyShouldHireYou.reason}</p>
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
                    <li key={index} className="mb-1">{skill.name}</li>
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
                    <li key={index} className="mb-1">{item.detail}</li>
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
                    <li key={index} className="mb-1">{interest.name}</li>
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
