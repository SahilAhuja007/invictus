// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Upload, MessageCircle, BookOpen, Users, FileText, Filter } from 'lucide-react';

// const Home: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Mock data for recent papers
//   const recentPapers = [
//     {
//       id: 1,
//       title: "Advances in Quantum Computing",
//       authors: ["Jane Smith", "John Doe"],
//       topic: "Computer Science",
//       date: "2025-04-15"
//     },
//     {
//       id: 2,
//       title: "Climate Change Impact on Marine Ecosystems",
//       authors: ["Robert Johnson", "Emily Chen"],
//       topic: "Environmental Science",
//       date: "2025-04-10"
//     },
//     {
//       id: 3,
//       title: "Neural Networks in Medical Diagnosis",
//       authors: ["Michael Brown", "Sarah Wilson"],
//       topic: "Medical Science",
//       date: "2025-04-05"
//     }
//   ];

//   // Mock data for top researchers
//   const topResearchers = [
//     {
//       id: 1,
//       name: "Dr. Jane Smith",
//       papers: 42,
//       field: "Quantum Physics",
//       image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
//     },
//     {
//       id: 2,
//       name: "Prof. Robert Johnson",
//       papers: 38,
//       field: "Environmental Science",
//       image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
//     },
//     {
//       id: 3,
//       name: "Dr. Emily Chen",
//       papers: 35,
//       field: "Neuroscience",
//       image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
//     }
//   ];

//   // Mock data for research categories
//   const categories = [
//     "Computer Science",
//     "Environmental Science",
//     "Medical Science",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "Psychology",
//     "Economics"
//   ];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle search functionality
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//           <div className="md:flex md:items-center md:justify-between">
//             <div className="md:w-1/2">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Collaborate on Research Papers
//               </h1>
//               <p className="text-lg md:text-xl mb-8">
//                 Connect with researchers worldwide, share your work, and collaborate on groundbreaking research papers.
//               </p>
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <Link
//                   to="/upload"
//                   className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#735DA5] bg-white hover:bg-gray-100"
//                 >
//                   <Upload className="h-5 w-5 mr-2" />
//                   Upload Paper
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#735DA5]"
//                 >
//                   <Users className="h-5 w-5 mr-2" />
//                   Join Community
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden md:block md:w-1/2">
//               <img
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//                 alt="Research Collaboration"
//                 className="rounded-lg shadow-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <form onSubmit={handleSearch}>
//             <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//               <div className="flex-grow relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#735DA5] focus:border-[#735DA5] sm:text-sm"
//                   placeholder="Search for research papers, topics, or authors"
//                 />
//               </div>
//               <div className="flex-shrink-0">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]"
//                 >
//                   Search
//                 </button>
//               </div>
//               <div className="flex-shrink-0">
//                 <button
//                   type="button"
//                   className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]"
//                 >
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filters
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Papers */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="px-6 py-4 bg-[#735DA5] text-white flex items-center">
//                 <FileText className="h-5 w-5 mr-2" />
//                 <h2 className="text-xl font-semibold">Recent Research Papers</h2>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 {recentPapers.map((paper) => (
//                   <div key={paper.id} className="p-6 hover:bg-gray-50">
//                     <h3 className="text-lg font-medium text-[#735DA5]">{paper.title}</h3>
//                     <p className="mt-1 text-sm text-gray-600">
//                       By {paper.authors.join(", ")}
//                     </p>
//                     <div className="mt-2 flex items-center justify-between">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D3C5E5] text-[#735DA5]">
//                         {paper.topic}
//                       </span>
//                       <span className="text-sm text-gray-500">{paper.date}</span>
//                     </div>
//                     <div className="mt-4 flex space-x-2">
//                       <button className="inline-flex items-center px-3 py-1 border border-[#735DA5] text-xs font-medium rounded text-[#735DA5] bg-white hover:bg-[#f8f5fc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]">
//                         View Paper
//                       </button>
//                       <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5]">
//                         <MessageCircle className="h-3 w-3 mr-1" />
//                         Discuss
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="px-6 py-4 bg-gray-50">
//                 <Link
//                   to="/papers"
//                   className="text-[#735DA5] hover:text-[#634d8e] font-medium"
//                 >
//                   View all papers →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-8">
//             {/* Top Researchers */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="px-6 py-4 bg-[#735DA5] text-white flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 <h2 className="text-xl font-semibold">Top Researchers</h2>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 {topResearchers.map((researcher) => (
//                   <div key={researcher.id} className="p-4 flex items-center hover:bg-gray-50">
//                     <img
//                       src={researcher.image}
//                       alt={researcher.name}
//                       className="h-12 w-12 rounded-full object-cover"
//                     />
//                     <div className="ml-4">
//                       <h3 className="text-sm font-medium text-gray-900">{researcher.name}</h3>
//                       <p className="text-xs text-gray-500">{researcher.field}</p>
//                       <p className="text-xs text-[#735DA5]">{researcher.papers} papers</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="px-6 py-4 bg-gray-50">
//                 <Link
//                   to="/researchers"
//                   className="text-[#735DA5] hover:text-[#634d8e] font-medium"
//                 >
//                   View all researchers →
//                 </Link>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="px-6 py-4 bg-[#735DA5] text-white flex items-center">
//                 <BookOpen className="h-5 w-5 mr-2" />
//                 <h2 className="text-xl font-semibold">Research Categories</h2>
//               </div>
//               <div className="p-6">
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((category, index) => (
//                     <Link
//                       key={index}
//                       to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
//                       className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D3C5E5] text-[#735DA5] hover:bg-[#c4b2dc]"
//                     >
//                       {category}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Upload CTA */}
//             <div className="bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] rounded-lg shadow-md p-6 text-white">
//               <h3 className="text-xl font-bold mb-2">Share Your Research</h3>
//               <p className="mb-4">Upload your research paper and collaborate with researchers worldwide.</p>
//               <Link
//                 to="/upload"
//                 className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#735DA5] bg-white hover:bg-gray-100"
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Paper
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">ResearchCollab</h3>
//               <p className="text-gray-300 text-sm">
//                 A platform for researchers to collaborate, share, and discover groundbreaking research papers.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm text-gray-300">
//                 <li><Link to="/" className="hover:text-white">Home</Link></li>
//                 <li><Link to="/about" className="hover:text-white">About</Link></li>
//                 <li><Link to="/papers" className="hover:text-white">Papers</Link></li>
//                 <li><Link to="/researchers" className="hover:text-white">Researchers</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Resources</h3>
//               <ul className="space-y-2 text-sm text-gray-300">
//                 <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
//                 <li><Link to="/guidelines" className="hover:text-white">Submission Guidelines</Link></li>
//                 <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
//                 <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <ul className="space-y-2 text-sm text-gray-300">
//                 <li>Email: contact@researchcollab.com</li>
//                 <li>Phone: +1 (555) 123-4567</li>
//                 <li>Address: 123 Research Ave, Academic City</li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
//             <p>© 2025 ResearchCollab. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { Upload, Users } from "lucide-react";
import ResearchComponent from "../components/ResearchComponent";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Collaborate on Research Papers
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Connect with researchers worldwide, share your work, and
                collaborate on groundbreaking research papers.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#735DA5] bg-white hover:bg-gray-100"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Paper
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#735DA5]"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Research Collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Research Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResearchComponent />
      </div>
    </div>
  );
};

export default Home;
