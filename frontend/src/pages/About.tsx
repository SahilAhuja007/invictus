import React from 'react';
import { BookOpen, Users, MessageCircle, Search, Upload, Globe, Shield, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#735DA5] to-[#D3C5E5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About ResearchCollab
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Connecting researchers worldwide to foster collaboration, innovation, and the advancement of knowledge.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ResearchCollab aims to break down barriers in academic research by providing a platform where researchers from around the world can connect, collaborate, and share their work freely and efficiently.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Open Access</h3>
            <p className="text-gray-600">
              Making research accessible to everyone, regardless of institutional affiliation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Connecting researchers with complementary skills and interests to work together.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discussion</h3>
            <p className="text-gray-600">
              Facilitating meaningful conversations around research topics and findings.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discovery</h3>
            <p className="text-gray-600">
              Making it easy to find relevant research and potential collaborators.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies the research collaboration process from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#735DA5] text-white flex items-center justify-center font-bold text-lg mr-3">
                  1
                </div>
                <h3 className="text-xl font-semibold">Create Profile</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Sign up and create your researcher profile with your expertise, interests, and previous work.
              </p>
              <div className="text-center">
                <Upload className="h-16 w-16 text-[#735DA5] mx-auto" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#735DA5] text-white flex items-center justify-center font-bold text-lg mr-3">
                  2
                </div>
                <h3 className="text-xl font-semibold">Connect & Collaborate</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Find researchers with complementary skills, connect with them, and start collaborating on projects.
              </p>
              <div className="text-center">
                <Users className="h-16 w-16 text-[#735DA5] mx-auto" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#735DA5] text-white flex items-center justify-center font-bold text-lg mr-3">
                  3
                </div>
                <h3 className="text-xl font-semibold">Share & Discover</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload your research papers, get feedback from the community, and discover new research in your field.
              </p>
              <div className="text-center">
                <Globe className="h-16 w-16 text-[#735DA5] mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do at ResearchCollab.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex">
            <div className="mr-4">
              <div className="h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We believe research should be accessible to everyone, regardless of their location, institution, or background. Our platform breaks down barriers to knowledge sharing.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex">
            <div className="mr-4">
              <div className="h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We uphold the highest standards of academic integrity and ethics. Our platform promotes transparency, proper attribution, and ethical research practices.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex">
            <div className="mr-4">
              <div className="h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe that the best research happens when diverse minds work together. Our platform is designed to foster meaningful collaboration across disciplines and borders.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex">
            <div className="mr-4">
              <div className="h-12 w-12 rounded-full bg-[#D3C5E5] text-[#735DA5] flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We're committed to pushing the boundaries of what's possible in research collaboration. Our platform continuously evolves to meet the changing needs of researchers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals behind ResearchCollab who are dedicated to transforming how research is shared and collaborated on.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Michael Chen</h3>
                <p className="text-[#735DA5] mb-3">Founder & CEO</p>
                <p className="text-gray-600">
                  Former research scientist with a passion for making academic research more accessible and collaborative.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-[#735DA5] mb-3">Chief Research Officer</p>
                <p className="text-gray-600">
                  Experienced researcher with a background in interdisciplinary collaboration and open science initiatives.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">James Wilson</h3>
                <p className="text-[#735DA5] mb-3">CTO</p>
                <p className="text-gray-600">
                  Tech innovator with expertise in building platforms that connect people and facilitate knowledge sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#735DA5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Sign up today and start collaborating with researchers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#735DA5] bg-white hover:bg-gray-100"
            >
              Sign Up Now
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#735DA5]"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ResearchCollab</h3>
              <p className="text-gray-300 text-sm">
                A platform for researchers to collaborate, share, and discover groundbreaking research papers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/papers" className="hover:text-white">Papers</a></li>
                <li><a href="/researchers" className="hover:text-white">Researchers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/help" className="hover:text-white">Help Center</a></li>
                <li><a href="/guidelines" className="hover:text-white">Submission Guidelines</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: contact@researchcollab.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Research Ave, Academic City</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© 2025 ResearchCollab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;