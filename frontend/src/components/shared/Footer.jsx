import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] border-t border-gray-200 shadow-inner backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-12">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Elevate<span className="text-[#F83002]">Hire</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
            Connecting ambitious minds with incredible opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Explore</h2>
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-3 text-sm font-medium text-gray-600">
            <li>
              <a
                href="/"
                className="hover:text-[#6A38C2] transition-all duration-300 inline-block hover:-translate-y-0.5"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/jobs"
                className="hover:text-[#6A38C2] transition-all duration-300 inline-block hover:-translate-y-0.5"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="/browse"
                className="hover:text-[#6A38C2] transition-all duration-300 inline-block hover:-translate-y-0.5"
              >
                Browse
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Connect</h2>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/AnanyaRaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-110 hover:shadow-md p-2 rounded-full backdrop-blur-md"
              title="Twitter"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://linkedin.com/in/ananya-raj-796409297/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110 hover:shadow-md p-2 rounded-full backdrop-blur-md"
              title="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/AnanyaRaj14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black transition-transform transform hover:scale-110 hover:shadow-md p-2 rounded-full backdrop-blur-md"
              title="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} ElevateHire. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
