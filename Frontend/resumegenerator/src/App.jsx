import { useState, useEffect } from 'react';
import profileImage from './assets/profile.png';

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Replace this URL with your actual data source
      // For demonstration purposes, using static data
      const data = [
        {
          name: 'Professional Resume',
          image: profileImage, // Use imported image directly
          description: 'A clean and professional resume template perfect for job applications.'
        },
        {
          name: 'Creative Portfolio',
          image: 'https://via.placeholder.com/100?text=Portfolio',
          description: 'A visually appealing portfolio template for showcasing your creative work.'
        },
        {
          name: 'Business Card',
          image: 'https://via.placeholder.com/100?text=Card',
          description: 'A stylish and modern business card template for networking.'
        }
      ];
      setTemplates(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Template Selection</h1>
      <div className="flex flex-wrap gap-4">
        {templates.map((template, index) => (
          <div
            key={index}
            onClick={() => setSelectedTemplate(template)}
            className={`cursor-pointer border ${selectedTemplate === template ? 'border-blue-500' : 'border-gray-300'} p-4 m-2 text-center rounded-lg shadow-lg transition-colors duration-300`}
          >
            <img src={template.image} alt={template.name} className="w-24 h-24 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{template.name}</h2>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Selected Template:</h2>
          <img src={selectedTemplate.image} alt={selectedTemplate.name} className="w-48 h-48 object-cover mb-2" />
          <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
          <p className="text-gray-700">{selectedTemplate.description}</p>
        </div>
      )}
    </div>
  );
}
