import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X, Plus, Info } from "lucide-react";
import axios from "axios";

interface UploadPaperProps {
  user: any;
  isLoggedIn: boolean;
}

const UploadPaper: React.FC<UploadPaperProps> = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    info: "",
    topic: "",
    collaborators: [""],
    file: null as File | null,
  });

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/papper/userNames")
      .then((response) => {
        if (response.data.success) {
          setUsernames(response.data.usernames);
        }
      })
      .catch((error) => console.error("Error fetching usernames:", error));
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCollaboratorChange = (index: number, value: string) => {
    const updatedCollaborators = [...formData.collaborators];
    updatedCollaborators[index] = value;
    setFormData({
      ...formData,
      collaborators: updatedCollaborators,
    });
  };

  const addCollaborator = () => {
    setFormData({
      ...formData,
      collaborators: [...formData.collaborators, ""],
    });
  };

  const removeCollaborator = (index: number) => {
    const updatedCollaborators = formData.collaborators.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      collaborators: updatedCollaborators,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;

      if (
        fileType !== "application/pdf" &&
        fileType !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setError("Only PDF and DOCX formats are supported");
        return;
      }

      setFormData({
        ...formData,
        file,
      });
      setFileName(file.name);
      setError("");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { title, info, topic, collaborators, file } = formData;

    const filteredCollaborators = collaborators.filter((c) => c.trim() !== "");

    if (
      !title ||
      !info ||
      !topic ||
      filteredCollaborators.length === 0 ||
      !file
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("info", info);
      formDataToSend.append("topic", topic);
      formDataToSend.append(
        "collaborators",
        JSON.stringify(filteredCollaborators)
      );
      formDataToSend.append("file", file);

      const response = await axios.post(
        "http://localhost:8000/papper/papper/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        setError(response.data.message || "Upload failed");
        return;
      }

      setSuccess("Research paper uploaded successfully!");

      setTimeout(() => {
        setFormData({
          title: "",
          info: "",
          topic: "",
          collaborators: [""],
          file: null,
        });
        setFileName("");
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError("An error occurred during upload. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-[#735DA5] text-white">
            <h1 className="text-2xl font-bold">Upload Research Paper</h1>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="m-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="m-6 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Paper Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#735DA5] focus:border-[#735DA5] sm:text-sm"
                placeholder="Enter the title of your research paper"
              />
            </div>

            <div>
              <label
                htmlFor="info"
                className="block text-sm font-medium text-gray-700"
              >
                Abstract/Description
              </label>
              <textarea
                id="info"
                name="info"
                rows={4}
                value={formData.info}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#735DA5] focus:border-[#735DA5] sm:text-sm"
                placeholder="Provide a brief abstract or description of your research"
              />
            </div>

            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700"
              >
                Research Topic/Field
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#735DA5] focus:border-[#735DA5] sm:text-sm"
                placeholder="e.g., Computer Science, Biology, Physics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collaborators (Usernames){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center">
                    <select
                      value={collaborator}
                      onChange={(e) =>
                        handleCollaboratorChange(index, e.target.value)
                      }
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#735DA5] focus:border-[#735DA5] sm:text-sm"
                    >
                      <option value="">Select a collaborator</option>
                      {usernames.map((username) => (
                        <option key={username} value={username}>
                          {username}
                        </option>
                      ))}
                    </select>
                    {formData.collaborators.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCollaborator(index)}
                        className="ml-2 p-1 rounded-full text-gray-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCollaborator}
                className="mt-2 inline-flex items-center px-3 py-1 border border-[#735DA5] text-sm font-medium rounded-md text-[#735DA5] bg-white hover:bg-[#f8f5fc]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Collaborator
              </button>

              <p className="mt-1 text-xs text-gray-500 flex items-start">
                <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                Select at least one collaborator who worked on this paper.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Paper (PDF or DOCX)
              </label>
              <div
                onClick={triggerFileInput}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${
                  fileName
                    ? "border-[#735DA5] bg-[#f8f5fc]"
                    : "border-gray-300 hover:border-[#735DA5]"
                }`}
              >
                <div className="space-y-1 text-center">
                  {fileName ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-12 w-12 text-[#735DA5]" />
                      <p className="text-sm text-gray-700 mt-2">{fileName}</p>
                      <p className="text-xs text-gray-500">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600 mt-2">
                        Click to upload your research paper
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF or DOCX up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5] ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Uploading..." : "Upload Research Paper"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPaper;
