import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    profileImage: "",
    company: {
      name: "",
      logo: "",
      jobtitle: ""
    },
    aboutMeData: {
      para1: "",
      para2: "",
      links: []
    },
    whyShouldHireYou: {
      reason: ""
    },
    password: "dsadasd",
    email: "adsad",
    skills: [{ name: "" }],
    education: [{ details: "" }],
    interests: [{ name: "" }],
    projects: [{ title: "", content: "", tags: "" }]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    
    if (name.startsWith('company-')) {
      const [, fieldName] = name.split('-');
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          [fieldName]: value
        }
      });
    } else if (name.startsWith('aboutMeData-')) {
      const [, fieldName] = name.split('-');
      setFormData({
        ...formData,
        aboutMeData: {
          ...formData.aboutMeData,
          [fieldName]: value
        }
      });
    } else if (name === 'links') {
      setFormData({
        ...formData,
        aboutMeData: {
          ...formData.aboutMeData,
          links: value.split(',').map(item => item.trim())
        }
      });
    } else if (name.startsWith('whyShouldHireYou-')) {
      const [, fieldName] = name.split('-');
      setFormData({
        ...formData,
        whyShouldHireYou: {
          ...formData.whyShouldHireYou,
          [fieldName]: value
        }
      });
    } else if (name.startsWith('skills-')) {
      const [, idx, field] = name.split('-');
      const updatedSkills = formData.skills.map((skill, i) => 
        i === Number(idx) ? { ...skill, [field]: value } : skill
      );
      setFormData({
        ...formData,
        skills: updatedSkills
      });
    } else if (name.startsWith('education-')) {
      const [, idx, field] = name.split('-');
      const updatedEducation = formData.education.map((edu, i) => 
        i === Number(idx) ? { ...edu, [field]: value } : edu
      );
      setFormData({
        ...formData,
        education: updatedEducation
      });
    } else if (name.startsWith('interests-')) {
      const [, idx, field] = name.split('-');
      const updatedInterests = formData.interests.map((interest, i) => 
        i === Number(idx) ? { ...interest, [field]: value } : interest
      );
      setFormData({
        ...formData,
        interests: updatedInterests
      });
    } else if (name.startsWith('projects-')) {
      const [, idx, field] = name.split('-');
      const updatedProjects = formData.projects.map((project, i) => 
        i === Number(idx) ? { ...project, [field]: value } : project
      );
      setFormData({
        ...formData,
        projects: updatedProjects
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
        Object.keys(formData[key]).forEach(subKey => {
          if (!formData[key][subKey] && subKey !== 'links') {
            newErrors[`${key}-${subKey}`] = `${subKey.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.`;
          }
        });
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          Object.keys(item).forEach(subKey => {
            if (!item[subKey]) {
              newErrors[`${key}-${index}-${subKey}`] = `${subKey.replace(/([A-Z])/g, ' $1').toUpperCase()} is required for item ${index + 1}.`;
            }
          });
        });
      } else if (!formData[key] && key !== 'links') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`http://localhost:3000/api/resumedata/${formData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'An error occurred. Please try again.'}`);
      } else {
        const responseData = await response.json();
        alert("Resume created successfully!");
        navigate("/template1");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="form-page p-4 bg-gradient-to-r from-purple-800 via-purple-300 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform ">
        <div className="bg-purple-600 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-3xl font-extrabold tracking-tight">Fill Your Details</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Profile Image */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Profile Image URL:</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors.profileImage ? 'border-red-500' : ''}`}
            />
            {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage}</p>}
          </div>
          
          {/* Company Information */}
          {['name', 'logo', 'jobtitle'].map((field) => (
            <div key={field} className="form-group mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Company {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
              <input
                type="text"
                name={`company-${field}`}
                value={formData.company[field]}
                onChange={handleChange}
                className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`company-${field}`] ? 'border-red-500' : ''}`}
              />
              {errors[`company-${field}`] && <p className="text-red-500 text-sm">{errors[`company-${field}`]}</p>}
            </div>
          ))}

          {/* About Me Data */}
          {['para1', 'para2'].map((field) => (
            <div key={field} className="form-group mb-4">
              <label className="block text-gray-700 font-semibold mb-1">About Me {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
              <textarea
                name={`aboutMeData-${field}`}
                value={formData.aboutMeData[field]}
                onChange={handleChange}
                className={`border border-gray-300 rounded-lg p-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`aboutMeData-${field}`] ? 'border-red-500' : ''}`}
              />
              {errors[`aboutMeData-${field}`] && <p className="text-red-500 text-sm">{errors[`aboutMeData-${field}`]}</p>}
            </div>
          ))}
          
          {/* Links */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Links (comma-separated):</label>
            <input
              type="text"
              name="links"
              value={formData.aboutMeData.links.join(', ')}
              onChange={handleChange}
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors.links ? 'border-red-500' : ''}`}
            />
            {errors.links && <p className="text-red-500 text-sm">{errors.links}</p>}
          </div>
          
          {/* Why Should Hire You */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Why Should We Hire You?</label>
            <textarea
              name="whyShouldHireYou-reason"
              value={formData.whyShouldHireYou.reason}
              onChange={handleChange}
              className={`border border-gray-300 rounded-lg p-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors['whyShouldHireYou-reason'] ? 'border-red-500' : ''}`}
            />
            {errors['whyShouldHireYou-reason'] && <p className="text-red-500 text-sm">{errors['whyShouldHireYou-reason']}</p>}
          </div>
          
          {/* Skills */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Skills:</label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-2 flex space-x-2">
                <input
                  type="text"
                  name={`skills-${index}-name`}
                  value={skill.name}
                  onChange={(e) => handleChange(e, index, 'name')}
                  className={`border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`skills-${index}-name`] ? 'border-red-500' : ''}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedSkills = formData.skills.filter((_, i) => i !== index);
                      setFormData({ ...formData, skills: updatedSkills });
                    }}
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors['skills'] && <p className="text-red-500 text-sm">{errors['skills']}</p>}
          </div>
          
          {/* Add Skill Button */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, skills: [...formData.skills, { name: "" }] })}
            className="bg-purple-800 hover:bg-purple-500 text-white rounded-lg px-4 py-2"
          >
            Add Skill
          </button>

          {/* Education */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Education:</label>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-2 flex space-x-2">
                <input
                  type="text"
                  name={`education-${index}-details`}
                  value={edu.details}
                  onChange={(e) => handleChange(e, index, 'details')}
                  className={`border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`education-${index}-details`] ? 'border-red-500' : ''}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedEducation = formData.education.filter((_, i) => i !== index);
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors['education'] && <p className="text-red-500 text-sm">{errors['education']}</p>}
          </div>
          
          {/* Add Education Button */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, education: [...formData.education, { details: "" }] })}
            className="bg-purple-800 hover:bg-purple-500 text-white rounded-lg px-4 py-2"
          >
            Add Education
          </button>
          
          {/* Interests */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Interests:</label>
            {formData.interests.map((interest, index) => (
              <div key={index} className="mb-2 flex space-x-2">
                <input
                  type="text"
                  name={`interests-${index}-name`}
                  value={interest.name}
                  onChange={(e) => handleChange(e, index, 'name')}
                  className={`border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`interests-${index}-name`] ? 'border-red-500' : ''}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedInterests = formData.interests.filter((_, i) => i !== index);
                      setFormData({ ...formData, interests: updatedInterests });
                    }}
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors['interests'] && <p className="text-red-500 text-sm">{errors['interests']}</p>}
          </div>
          
          {/* Add Interest Button */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, interests: [...formData.interests, { name: "" }] })}
            className="bg-purple-800 hover:bg-purple-500 text-white rounded-lg px-4 py-2"
          >
            Add Interest
          </button>
          
          {/* Projects */}
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Projects:</label>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name={`projects-${index}-title`}
                  value={project.title}
                  onChange={(e) => handleChange(e, index, 'title')}
                  className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`projects-${index}-title`] ? 'border-red-500' : ''}`}
                />
                <textarea
                  name={`projects-${index}-content`}
                  value={project.content}
                  onChange={(e) => handleChange(e, index, 'content')}
                  className={`border border-gray-300 rounded-lg p-2 w-full h-24 resize-none mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`projects-${index}-content`] ? 'border-red-500' : ''}`}
                />
                <input
                  type="text"
                  name={`projects-${index}-tags`}
                  value={project.tags}
                  onChange={(e) => handleChange(e, index, 'tags')}
                  className={`border border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-500 ease-in-out transform hover:scale-105 ${errors[`projects-${index}-tags`] ? 'border-red-500' : ''}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedProjects = formData.projects.filter((_, i) => i !== index);
                      setFormData({ ...formData, projects: updatedProjects });
                    }}
                    className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors['projects'] && <p className="text-red-500 text-sm">{errors['projects']}</p>}
          </div>
          
          {/* Add Project Button */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, projects: [...formData.projects, { title: "", content: "", tags: "" }] })}
            className="bg-purple-800 hover:bg-purple-500 text-white rounded-lg px-4 py-2"
          >
            Add Project
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-500 text-white rounded-lg px-4 py-2 w-full mt-4 hover:bg-purple-600 transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

