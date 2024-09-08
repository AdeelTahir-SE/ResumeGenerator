import { useState, useEffect } from "react";
import output1 from "../assets/outputresume1.jpeg";
import output2 from "../assets/outputresume2.jpeg";
import output3 from "../assets/outputresume3.jpeg";
import output4 from "../assets/outputresume4.jpeg";
import Bgsvg from "../components/bgsvg";
import ReactDOMServer from "react-dom/server";
export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [disable, setDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          name: "Template1",
          image: output1,
          description:
            "A clean and professional resume template perfect for job applications.",
          customizable: true,
        },
        {
          name: "Template2",
          image: output2,
          description:
            "A clean and professional resume template perfect for job applications.",
          customizable: true,
        },
        {
          name: "Template3",
          image: output3,
          description:
            "A visually appealing portfolio template for showcasing your creative work.",
          customizable: false,
        },
        {
          name: "Template4",
          image: output4,
          description:
            "A stylish and modern business card template for networking.",
          customizable: false,
        },
      ];
      setTemplates(data);
    };

    fetchData();
  }, []);

  const handleExport = async () => {
    setDisable((dis) => {
      return !dis;
    });
    setLoader(true);
    const id = selectedTemplate.name.split("e")[2];

    const response = await fetch(
      `http://localhost:3000/api/templates/pdf/${id}`
    );
    const a = document.createElement("a");
    a.href = `src/assets/outputresume${id}.pdf`;
    a.download = `outputresume${id}.pdf`;
    a.click();
    if (response)
      setDisable((dis) => {
        return !dis;
      });
    setLoader(false);
  };
  const svgElement = <Bgsvg color="#6c00da" />;
  const svgString = ReactDOMServer.renderToStaticMarkup(svgElement);
  const svgDataURL = `data:image/svg+xml;base64,${window.btoa(svgString)}`;
  return (
    <div className="p-8 bg-gray-50 min-h-screen" style={{
      background: `url(${svgDataURL}) no-repeat center center`,
      backgroundSize: "cover", // or "cover" depending on your needs
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Template Selection
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {templates.map((template, index) => (
          <div
            key={index}
            onClick={() => setSelectedTemplate(template)}
            className={`cursor-pointer border ${
              selectedTemplate === template
                ? "border-blue-500"
                : "border-gray-300"
            } p-6 m-4 text-center rounded-lg shadow-xl transition-transform transform hover:scale-105 ${
              template.customizable ? "bg-white" : "bg-gray-200"
            }`}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-40 h-40 object-cover mb-4 rounded-lg shadow-md"
            />
            <h2
              className={`text-2xl font-semibold mb-2 ${
                template.customizable ? "text-blue-800" : "text-gray-700"
              }`}
            >
              {template.name}
            </h2>
            {template.customizable && (
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Customizable
              </span>
            )}
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="mt-10 p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            Selected Template
          </h2>
          <img
            src={selectedTemplate.image}
            alt={selectedTemplate.name}
            className="w-full h-auto object-cover mb-4 rounded-lg shadow-md"
          />
          <h3 className="text-2xl font-semibold mb-2">
            {selectedTemplate.name}
          </h3>
          <p className="text-gray-800 mb-6">{selectedTemplate.description}</p>
          {!selectedTemplate.customizable && (
            <p className="mt-4 text-red-600 font-semibold">
              This template is not customizable.
            </p>
          )}
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={handleExport}
              disabled={disable} // Control disabled state here
              className={`mt-4 px-6 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 ${
                disable
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Styles when disabled
                  : "bg-blue-600 text-white hover:bg-blue-700" // Styles when enabled
              }`}
            >
              Export
            </button>
            {loader && (
              <div class="text-center">
                <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-500 mx-auto"></div>
                <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p class="text-zinc-600 dark:text-zinc-400"></p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
