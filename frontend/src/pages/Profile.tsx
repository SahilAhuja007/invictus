import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  FileText,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { AtSign } from "lucide-react";
import { API_BASE_URL } from "../config/api";

interface ProfileProps {
  user: any;
  isLoggedIn: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchUserPapers();
    }
  }, [isLoggedIn, user]);

  const fetchUserPapers = async () => {
    if (!user || !user.userName) {
      setError("User information is missing.");
      return;
    }

    const url = `${API_BASE_URL}/MyPappers?userName=${encodeURIComponent(
      user.userName
    )}`;
    console.log("Fetching Papers from:", url); // 🔍 Debugging

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Papers:", data); // 🔍 Debugging
      setPapers(data.papers || []);
    } catch (err) {
      setError(`Failed to fetch papers: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaper = async (paperId: string) => {
    if (!confirm("Are you sure you want to delete this paper?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/papper/delete/${paperId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Remove the deleted paper from the state
        setPapers(papers.filter((paper: any) => paper._id !== paperId));
      } else {
        setError(data.message || "Failed to delete paper");
      }
    } catch (err) {
      setError("An error occurred while deleting the paper");
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] h-32"></div>
          <div className="px-6 py-4 flex flex-col md:flex-row">
            <div className="-mt-16 md:mr-6">
              <img
                src={
                  user.image ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                }
                alt={user.firstName}
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="mt-4 md:mt-0 flex-grow">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center text-gray-600 mt-1">
                <AtSign className="h-4 w-4 mr-1" />
                <span>{user.userName}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="h-4 w-4 mr-1" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => navigate("/edit-profile")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-[#735DA5] text-white flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">My Research Papers</h2>
            </div>
            <button
              onClick={() => navigate("/upload")}
              className="inline-flex items-center px-3 py-1 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-[#735DA5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Upload New Paper
            </button>
          </div>

          {error && (
            <div className="p-6 bg-red-50 border-b border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">Loading your papers...</p>
            </div>
          ) : papers.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">
                You haven't uploaded any research papers yet.
              </p>
              <button
                onClick={() => navigate("/upload")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]"
              >
                Upload Your First Paper
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {papers.map((paper: any) => (
                <div
                  key={paper._id}
                  className="p-6 bg-white rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-medium text-[#735DA5]">
                        {paper.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {paper.info}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D3C5E5] text-[#735DA5]">
                          {paper.topic}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {new Date(paper.createdAt).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {paper.pdf?.endsWith(".pdf") ? "PDF" : "DOCX"}
                        </span>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 border border-[#735DA5] text-xs font-medium rounded text-[#735DA5] bg-white hover:bg-[#f8f5fc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open in Tab
                        </a>
                        <button
                          onClick={() => handleDeletePaper(paper._id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 md:mt-0 md:w-1/2">
                      <iframe
                        src={paper.pdf}
                        width="100%"
                        height="500px"
                        className="rounded border"
                        title={`Paper - ${paper.title}`}
                      />
                    </div>
                  </div>

                  {paper.collaborators && paper.collaborators.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">
                        Collaborators:
                      </h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {paper.collaborators.map((userName: string) => (
                          <span
                            key={userName}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {userName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
