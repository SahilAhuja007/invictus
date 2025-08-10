// import React from 'react';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ExternalLink, Search } from "lucide-react";

// const sources = ["arXiv", "CORE", "Semantic Scholar", "Scopus"];

// const fetchArxivPapers = async (query) => {
//     const response = await fetch(`https://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=5`);
//     const text = await response.text();

//     const parser = new DOMParser();
//     const xml = parser.parseFromString(text, "text/xml");
//     const entries = Array.from(xml.getElementsByTagName("entry"));

//     return entries.map(entry => ({
//         title: entry.getElementsByTagName("title")[0]?.textContent || "No Title",
//         author: entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Unknown Author",
//         url: entry.getElementsByTagName("id")[0]?.textContent || "#",
//         source: "arXiv"
//     }));
// };

// const fetchCorePapers = async (query) => {
//     const apiKey = ""; // Replace with actual key
//     if (!apiKey) return [];

//     try {
//         const response = await fetch(`https://api.core.ac.uk/v3/search/works?q=${query}&limit=5`, {
//             headers: { "Authorization": `Bearer ${apiKey}` }
//         });
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

//         const data = await response.json();
//         return data.results?.map(paper => ({
//             title: paper.title || "No Title",
//             author: paper.authors?.[0]?.name || "Unknown Author",
//             url: paper.identifiers?.[0] || "#",
//             source: "CORE"
//         })) || [];
//     } catch {
//         return [];
//     }
// };

// const fetchSemanticScholarPapers = async (query) => {
//     const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&limit=5`);
//     const data = await response.json();
//     return data.data?.map(paper => ({
//         title: paper.title || "No Title",
//         author: paper.authors?.[0]?.name || "Unknown Author",
//         url: `https://www.semanticscholar.org/paper/${paper.paperId}` || "#",
//         source: "Semantic Scholar"
//     })) || [];
// };

// const fetchScopusPapers = async (query) => {
//     const apiKey = "7d96303381f38d04069b84533367e399";
//     if (!apiKey) return [];

//     try {
//         const response = await fetch(`https://api.elsevier.com/content/search/scopus?query=${query}&apiKey=${apiKey}`, {
//             headers: { "Accept": "application/json" }
//         });

//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();

//         return data["search-results"]?.entry?.map(paper => ({
//             title: paper["dc:title"] || "No Title",
//             author: paper["dc:creator"] || "Unknown Author",
//             scopusId: paper["dc:identifier"].replace("SCOPUS_ID:", ""),
//             source: "Scopus"
//         })) || [];
//     } catch {
//         return [];
//     }
// };

// export default function ResearchComponent() {
//     const [query, setQuery] = useState("");
//     const [papers, setPapers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedSources, setSelectedSources] = useState(["arXiv"]);
//     const navigate = useNavigate();

//     const handleSearch = async () => {
//         if (!query.trim()) return;
//         setLoading(true);
//         let results = [];

//         if (selectedSources.includes("arXiv")) {
//             results = results.concat(await fetchArxivPapers(query));
//         }
//         if (selectedSources.includes("CORE")) {
//             results = results.concat(await fetchCorePapers(query));
//         }
//         if (selectedSources.includes("Semantic Scholar")) {
//             results = results.concat(await fetchSemanticScholarPapers(query));
//         }
//         if (selectedSources.includes("Scopus")) {
//             results = results.concat(await fetchScopusPapers(query));
//         }

//         setPapers(results);
//         setLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-white text-gray-900 p-6 flex flex-col items-center">
//             <motion.div className="w-full max-w-3xl bg-blue-50 p-6 rounded-xl shadow-md flex flex-col gap-4 border border-blue-300">
//                 <div className="flex items-center gap-4">
//                     <input
//                         type="text"
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         placeholder="Search research papers..."
//                         className="w-full p-3 text-lg bg-white border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                     <motion.button
//                         onClick={handleSearch}
//                         className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold shadow-md text-white flex items-center gap-2"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         <Search size={20} /> Search
//                     </motion.button>
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                     {sources.map(source => (
//                         <button
//                             key={source}
//                             className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//                                 selectedSources.includes(source) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
//                             }`}
//                             onClick={() => setSelectedSources(prev => prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source])}
//                         >
//                             {source}
//                         </button>
//                     ))}
//                 </div>
//             </motion.div>
//             {loading && <p className="text-blue-500 text-lg mt-6">Fetching research papers...</p>}
//             <div className="w-full max-w-5xl mt-8">
//                 {papers.length > 0 ? (
//                     <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {papers.map((paper, index) => (
//                             <motion.div
//                                 key={index}
//                                 onClick={() => paper.source === "Scopus" ? navigate(`/elsevier/${paper.scopusId}`) : window.open(paper.url, "_blank")}
//                                 className="relative bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md border border-blue-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col gap-2"
//                                 whileHover={{ scale: 1.03 }}
//                             >
//                                 <h3 className="text-xl font-bold text-blue-900">{paper.title}</h3>
//                                 <p className="text-blue-600 mt-2">{paper.author}</p>
//                                 <span className="text-gray-500 text-sm">{paper.source}</span>
//                                 <div className="absolute top-4 right-4 text-blue-500">
//                                     <ExternalLink size={20} />
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 ) : (!loading && <p className="text-gray-600 text-lg mt-6">No research papers found.</p>)}
//             </div>
//         </div>
//     );
// }

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";

const sources = ["Semantic Scholar", "Scopus"];

const fetchArxivPapers = async (query) => {
  const response = await fetch(
    `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=5`
  );
  const text = await response.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");
  const entries = Array.from(xml.getElementsByTagName("entry"));

  return entries.map((entry) => ({
    title: entry.getElementsByTagName("title")[0]?.textContent || "No Title",
    author:
      entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]
        ?.textContent || "Unknown Author",
    url: entry.getElementsByTagName("id")[0]?.textContent || "#",
    source: "arXiv",
  }));
};

const fetchCorePapers = async (query) => {
  const apiKey = "";
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `https://api.core.ac.uk/v3/search/works?q=${query}&limit=5`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    return (
      data.results?.map((paper) => ({
        title: paper.title || "No Title",
        author: paper.authors?.[0]?.name || "Unknown Author",
        url: paper.identifiers?.[0] || "#",
        source: "CORE",
      })) || []
    );
  } catch {
    return [];
  }
};

const fetchSemanticScholarPapers = async (query) => {
  const response = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&limit=5`
  );
  const data = await response.json();
  return (
    data.data?.map((paper) => ({
      title: paper.title || "No Title",
      author: paper.authors?.[0]?.name || "Unknown Author",
      url: `https://www.semanticscholar.org/paper/${paper.paperId}` || "#",
      source: "Semantic Scholar",
    })) || []
  );
};

const fetchScopusPapers = async (query) => {
  const apiKey = "7d96303381f38d04069b84533367e399";
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `https://api.elsevier.com/content/search/scopus?query=${query}&apiKey=${apiKey}`,
      {
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();

    return (
      data["search-results"]?.entry?.map((paper) => ({
        title: paper["dc:title"] || "No Title",
        author: paper["dc:creator"] || "Unknown Author",
        scopusId: paper["dc:identifier"].replace("SCOPUS_ID:", ""),
        source: "Scopus",
      })) || []
    );
  } catch {
    return [];
  }
};

export default function ResearchComponent() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSources, setSelectedSources] = useState(["arXiv"]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    let results = [];

    if (selectedSources.includes("Semantic Scholar")) {
      results = results.concat(await fetchSemanticScholarPapers(query));
    }
    if (selectedSources.includes("Scopus")) {
      results = results.concat(await fetchScopusPapers(query));
    }

    setPapers(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] text-white p-6 flex flex-col items-center">
      <motion.div className="w-full max-w-3xl bg-blue-50 p-6 rounded-xl shadow-md flex flex-col gap-4 border border-blue-300">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research papers..."
            className="w-full p-3 text-lg bg-white border border-[#735DA5] rounded-xl text-[#4B2C5D] focus:ring-2 focus:ring-[#735DA5] outline-none"
          />
          <motion.button
            onClick={handleSearch}
            className="bg-[#735DA5] hover:bg-[#5a3e88] px-6 py-3 rounded-xl text-lg font-semibold shadow-md text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} /> Search
          </motion.button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sources.map((source) => (
            <button
              key={source}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedSources.includes(source)
                  ? "bg-[#735DA5] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() =>
                setSelectedSources((prev) =>
                  prev.includes(source)
                    ? prev.filter((s) => s !== source)
                    : [...prev, source]
                )
              }
            >
              {source}
            </button>
          ))}
        </div>
      </motion.div>
      {loading && (
        <p className="text-[#735DA5] text-lg mt-6">
          Fetching research papers...
        </p>
      )}
      <div className="w-full max-w-5xl mt-8">
        {papers.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                onClick={() =>
                  paper.source === "Scopus"
                    ? navigate(`/elsevier/${paper.scopusId}`)
                    : window.open(paper.url, "_blank")
                }
                className="relative bg-[#f0f4ff] p-6 rounded-2xl shadow-md border border-[#8a8acb] hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col gap-2"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-bold text-[#4a47a3]">
                  {paper.title}
                </h3>{" "}
                {/* Dark blue-violet for title */}
                <p className="text-[#5f5f7a] mt-2">{paper.author}</p>{" "}
                {/* Muted slate for author */}
                <span className="text-[#8a8acb] text-sm">
                  {paper.source}
                </span>{" "}
                {/* Soft lavender for source */}
                <div className="absolute top-4 right-4 text-[#4a47a3]">
                  <ExternalLink size={20} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            <p className="text-gray-200 text-lg mt-6">
              No research papers found.
            </p>
          )
        )}
      </div>
    </div>
  );
}
