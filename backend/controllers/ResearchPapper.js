const ResearchPaper = require("../models/ResearchPapper");
const User = require("../models/User"); // Ensure this is correctly imported
const cloudinary = require("cloudinary").v2;
const { PDFDocument } = require("pdf-lib");
const fs = require("fs-extra");
const path = require("path");

async function uploadFileToCloudinary(filePath, folder) {
  const fileName = path.parse(filePath).name;

  const options = {
    folder,
    public_id: fileName,
    resource_type: "raw",
  };

  return await cloudinary.uploader.upload(filePath, options);
}

exports.postPaper = async (req, res) => {
  try {
    let { collaborators, title, info, topic } = req.body;

    if (!title || !collaborators || !info || !topic) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (typeof collaborators === "string") {
      collaborators = JSON.parse(collaborators);
    }

    const users = await User.find({ userName: { $in: collaborators } }, "_id");

    if (!users || users.length !== collaborators.length) {
      return res.status(400).json({
        success: false,
        message: "One or more usernames not found",
      });
    }

    const collaboratorIds = users.map((user) => user._id);
    const file = req.files.file;

    // Validate file type
    if (file.mimetype !== "application/pdf") {
      return res
        .status(400)
        .json({ success: false, message: "Only PDF files are allowed" });
    }

    let uploadedUrl;

    const response = await uploadFileToCloudinary(
      file.tempFilePath,
      "research_papers"
    );
    uploadedUrl = response.secure_url;

    console.log("Uploaded URL:", uploadedUrl); // Debugging

    const newPaper = await ResearchPaper.create({
      title,
      info,
      topic,
      collaborators: collaboratorIds,
      pdf: uploadedUrl,
    });

    res.status(201).json({
      success: true,
      message: "Research paper uploaded successfully",
      paper: newPaper,
    });
  } catch (e) {
    console.error("Error uploading paper:", e); // Debugging
    res.status(500).json({
      success: false,
      message: "Issue while posting paper",
      error: e.message,
    });
  }
};

exports.getMyPaper = async (req, res) => {
  try {
    console.log("Query Parameters:", req.query); // Debugging

    const userName =
      req.query.userName || req.token?.userName || req.cookies?.userName;

    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "userName is required",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist. Please sign up.",
      });
    }

    // Fetch papers where the user is the creator OR a collaborator
    const papers = await ResearchPaper.find({
      $or: [{ owner: user._id }, { collaborators: user._id }],
    });

    res.status(200).json({
      success: true,
      papers,
    });
  } catch (e) {
    console.error("Error fetching papers:", e); // Debugging
    res.status(500).json({
      success: false,
      message: "Issue while fetching papers. Please try again later.",
      error: e.message,
    });
  }
};

// exports.getMyPaper = async (req, res) => {
//   try {
//     console.log("Query Parameters:", req.query); // 🔍 Debugging

//     const userName =
//       req.query.userName || req.token?.userName || req.cookies?.userName;

//     if (!userName) {
//       return res.status(400).json({
//         success: false,
//         message: "userName is required",
//       });
//     }

//     const user = await User.findOne({ userName });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist. Please sign up.",
//       });
//     }

//     // Fetch papers where the user is the creator OR a collaborator
//     const papers = await ResearchPaper.find({
//       $or: [{ owner: user._id }, { collaborators: user._id }],
//     });

//     res.status(200).json({
//       success: true,
//       papers,
//     });
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       message: "Issue while fetching papers. Please try again later.",
//       error: e.message,
//     });
//   }
// };

// exports.topicPaper = async (req, res) => {
//     try {
//         const { topic } = req.body;

//         if (!topic) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Topic is required",
//             });
//         }

//         const supported = ["games", "healthcare", "financial", "Data Science"];
//         const matchedTopic = supported.find(t => t.toLowerCase() === topic.toLowerCase());

//         if (!matchedTopic) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Topic should be one of: games, healthcare, financial, Data Science",
//             });
//         }
//         const papers = await ResearchPaper.find({ topic: matchedTopic });

//         res.status(200).json({
//             success: true,
//             message: `Papers found for topic: ${matchedTopic}`,
//             papers,
//         });

//     } catch (e) {
//         res.status(500).json({
//             success: false,
//             message: "Issue while retrieving topic-wise papers",
//             error: e.message,
//         });
//     }
// };

const axios = require("axios");

const CORE_API_KEY = process.env.CORE_API_KEY;
const SCOPUS_API_KEY = process.env.SCOPUS_API_KEY;

// Fetch local research papers from MongoDB
async function getLocalPapers(topic) {
  return await ResearchPaper.find({
    topic: { $regex: topic, $options: "i" },
  }).select("title info pdf collaborators");
}

// Fetch from arXiv
async function fetchArxivPapers(topic) {
  try {
    const response = await axios.get(
      `http://export.arxiv.org/api/query?search_query=all:${topic}&start=0&max_results=10`
    );
    const xml = response.data;

    const parser = new (require("xml2js").Parser)();
    const parsed = await parser.parseStringPromise(xml);
    const entries = parsed.feed.entry || [];

    return entries.map((entry) => ({
      title: entry.title?.[0] || "No Title",
      author: entry.author?.[0]?.name?.[0] || "Unknown Author",
      url: entry.id?.[0] || "#",
      source: "arXiv",
    }));
  } catch (error) {
    console.error("Error fetching from arXiv:", error.message);
    return [];
  }
}

// Fetch from CORE
async function fetchCorePapers(topic) {
  if (!CORE_API_KEY) return [];
  try {
    const response = await axios.get(
      `https://api.core.ac.uk/v3/search/works?q=${topic}&limit=10`,
      {
        headers: { Authorization: `Bearer ${CORE_API_KEY}` },
      }
    );

    return response.data.results.map((paper) => ({
      title: paper.title || "No Title",
      author: paper.authors?.[0]?.name || "Unknown Author",
      url: paper.identifiers?.[0] || "#",
      source: "CORE",
    }));
  } catch (error) {
    console.error("Error fetching from CORE:", error.message);
    return [];
  }
}

// Fetch from Semantic Scholar
async function fetchSemanticScholarPapers(topic) {
  try {
    const response = await axios.get(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${topic}&limit=10`
    );
    return response.data.data.map((paper) => ({
      title: paper.title || "No Title",
      author: paper.authors?.[0]?.name || "Unknown Author",
      url: `https://www.semanticscholar.org/paper/${paper.paperId}` || "#",
      source: "Semantic Scholar",
    }));
  } catch (error) {
    console.error("Error fetching from Semantic Scholar:", error.message);
    return [];
  }
}

// Fetch from Scopus
// async function fetchScopusPapers(topic) {
//     if (!SCOPUS_API_KEY) return [];
//     try {
//         const response = await axios.get(`https://api.elsevier.com/content/search/scopus?query=${topic}&apiKey=${SCOPUS_API_KEY}`, {
//             headers: { Accept: "application/json" },
//         });

//         return response.data["search-results"].entry.map(paper => ({
//             title: paper["dc:title"] || "No Title",
//             author: paper["dc:creator"] || "Unknown Author",
//             url: `https://www.scopus.com/record/display.uri?eid=${paper["dc:identifier"]?.replace("SCOPUS_ID:", "")}`,
//             source: "Scopus",
//         }));
//     } catch (error) {
//         console.error("Error fetching from Scopus:", error.message);
//         return [];
//     }
// }

// API to get research papers by topic
exports.topicPaper = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // Fetch local papers
    const localPapers = await getLocalPapers(topic);

    // Fetch external papers
    const arxivPapers = await fetchArxivPapers(topic);
    const corePapers = await fetchCorePapers(topic);
    const semanticScholarPapers = await fetchSemanticScholarPapers(topic);
    // const scopusPapers = await fetchScopusPapers(topic);

    // Combine all results
    const allPapers = [
      ...localPapers,
      ...arxivPapers,
      ...corePapers,
      ...semanticScholarPapers,
      // ...scopusPapers
    ];

    res.status(200).json({
      success: true,
      message: `Papers found for topic: ${topic}`,
      papers: allPapers,
    });
  } catch (error) {
    console.error("Error fetching papers:", error.message);
    res.status(500).json({
      success: false,
      message: "Issue while retrieving research papers",
      error: error.message,
    });
  }
};

exports.editPaper = async (req, res) => {
  try {
    let { collaborators, title, info, topic } = req.body;
    const { id } = req.body || req.token._id || req.cookie.id;

    if (!title || !collaborators || !info || !topic || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.files || !req.files.pdf) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const supportedTopics = [
      "games",
      "healthcare",
      "financial",
      "Data Science",
    ];
    if (!supportedTopics.includes(topic)) {
      return res.status(400).json({
        success: false,
        message:
          "Topic should be one of: games, healthcare, financial, Data Science",
      });
    }

    if (typeof collaborators === "string") {
      collaborators = JSON.parse(collaborators);
    }

    const users = await User.find({ userName: { $in: collaborators } }, "_id");

    if (!users || users.length !== collaborators.length) {
      return res.status(400).json({
        success: false,
        message: "One or more usernames not found",
      });
    }

    const collaboratorIds = users.map((user) => user._id);

    const pdf = req.files.pdf;
    if (pdf.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF format is supported",
      });
    }

    const compressedPath = await compressPDF(pdf.tempFilePath || pdf.path);
    const response = await uploadFileToCloudinary(
      compressedPath,
      "research_papers"
    );

    const newPaper = await ResearchPaper.findByIdAndUpdate(id, {
      title: title,
      info: info,
      topic: topic,
      collaborators: collaboratorIds,
      pdf: response.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Research paper uploaded successfully",
      paper: newPaper,
    });

    await fs.unlink(compressedPath);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Issue while posting paper",
      error: e.message,
    });
  }
};

exports.deletePaper = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Paper ID is required",
      });
    }

    const deletedPaper = await ResearchPaper.findByIdAndDelete(id);

    if (!deletedPaper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Paper deleted successfully",
      deletedPaper,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Issue while deleting paper",
      error: e.message,
    });
  }
};
