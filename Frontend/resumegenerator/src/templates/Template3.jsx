import React from "react";
import company from "../assets/company.png";
import profile from "../assets/profile.png";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
import { useState, useEffect } from "react";
import { useUser } from '../Context/context.jsx'; // Adjust the path as needed

function Template3() {
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
      setImage(resumedata.profile);
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


  const svgElement = <Bgsvg color="#4a5568" />; // Darker color for a modern look
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  const svgDataURL = `data:image/svg+xml;base64,${window.btoa(svgString)}`;

  return (
    <div
      className="print-container w-full flex flex-col items-center justify-center min-h-screen p-2 bg-gray-100"
      style={{
        background: `url(${svgDataURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
        fontSize: "0.8rem", // Smaller font size for compact layout
      }}
    >
      {/* Upper section with profile, title, and company logo */}
      <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md mb-2 w-full">
        <img
          src={image}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-indigo-600 shadow-sm mb-1"
        />
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {companydata.jobtitle} at {companydata.name}
        </h2>
        <img
          src={companydata.logo}
          alt="Company Logo"
          className="w-12 h-auto mb-1"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2">
        {/* Skills section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 text-white rounded-md shadow-sm w-full md:w-1/2">
          <h3 className="text-sm font-bold border-b-2 border-indigo-300 pb-1 mb-1">Skills</h3>
          <ul className="list-disc list-inside text-xs">
            {skills.map((skill, index) => (
              <li key={index} className="mb-1">{skill.name}</li>
            ))}
          </ul>
        </div>

        {/* Experience and Projects section */}
        <div className="bg-white p-2 rounded-md shadow-sm w-full md:w-1/2">
          <h3 className="text-sm font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1">Experience & Projects</h3>
          <ul className="list-none text-xs">
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                <h4 className="text-xs font-semibold text-gray-800 mb-0.5">{item.title}</h4>
                <p className="text-gray-700 mb-0.5">{item.content}</p>
                <div className="flex flex-wrap gap-1 text-xs">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-2 gap-2">
        {/* About Me section */}
        <div className="bg-white p-2 rounded-md shadow-sm w-full md:w-1/2">
          <h3 className="text-sm font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1">About Me</h3>
          <p className="text-gray-700 mb-1">{aboutMe.para1}</p>
          <p className="text-gray-700 mb-1">{aboutMe.para2}</p>
          <div className="mt-1 text-xs">
            <h4 className="font-semibold text-gray-800 mb-0.5">Contact Links:</h4>
            {aboutMe.links&&aboutMe.links.map((element, index) => (
              <p key={index} className="text-blue-600 underline mb-0.5">
{element}
              </p>
            ))}
          </div>
        </div>

        {/* Education section */}
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 p-2 text-white rounded-md shadow-sm w-full md:w-1/2">
          <h3 className="text-sm font-bold border-b-2 border-teal-300 pb-1 mb-1">Education</h3>
          <ul className="list-disc list-inside text-xs">
            {education.map((item, index) => (
              <li key={index} className="mb-1">{item.detail}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md shadow-sm w-full mt-2">
        <h3 className="text-sm font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1">Interests</h3>
        <ul className="list-disc list-inside text-xs">
          {interests.map((interest, index) => (
            <li key={index} className="mb-1">{interest.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-2 rounded-md shadow-sm w-full mt-2">
        <h3 className="text-sm font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1">Why Should You Hire Me?</h3>
        <p className="text-gray-700 text-xs">{whyShouldHireYou.reason}</p>
      </div>
    </div>
  );
}

export default Template3;
