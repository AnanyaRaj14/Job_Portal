import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            Elevate<span className="text-[#F83002]">Hire</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Connecting ambitious minds with incredible opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-gray-800 mb-2">Explore</h2>
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-3 text-sm font-medium text-gray-600">
            <li><a href="/" className="hover:text-[#6A38C2]">Home</a></li>
            <li><a href="/jobs" className="hover:text-[#6A38C2]">Jobs</a></li>
            <li><a href="/browse" className="hover:text-[#6A38C2]">Browse</a></li>
            {/* <li><a href="#" className="hover:text-[#6A38C2]">Contact</a></li> */}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex gap-6 justify-center mb-4">
          <a
            href="https://twitter.com/AnanyaRaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-110"
            title="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com/in/ananya-raj-796409297/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/AnanyaRaj14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-400 transition-transform transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub size={24} />
          </a>
         
        </div>

      </div>
    </footer>
  );
};

export default Footer; 