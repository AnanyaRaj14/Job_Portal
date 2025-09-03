import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#6A38C2] via-[#7B47D1] to-[#6A38C2] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-10">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold mb-2 tracking-wide">
            Elevate<span className="text-[#F83002]">Hire</span>
          </h1>
          <p className="text-sm text-gray-200 max-w-xs mx-auto md:mx-0 leading-relaxed">
            🚀 Connecting ambitious minds with incredible opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Explore</h2>
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-3 text-sm font-medium">
            <li>
              <a
                href="/"
                className="hover:text-yellow-300 transition-all duration-300 inline-block hover:translate-x-1"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/jobs"
                className="hover:text-yellow-300 transition-all duration-300 inline-block hover:translate-x-1"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="/browse"
                className="hover:text-yellow-300 transition-all duration-300 inline-block hover:translate-x-1"
              >
                Browse
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h2 className="text-lg font-semibold">Connect</h2>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/AnanyaRaj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-blue-400 hover:text-white hover:bg-blue-500 transition-transform transform hover:scale-110 shadow-md p-2 rounded-full"
              title="Twitter"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://linkedin.com/in/ananya-raj-796409297/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-blue-600 hover:text-white hover:bg-blue-700 transition-transform transform hover:scale-110 shadow-md p-2 rounded-full"
              title="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/AnanyaRaj14"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-gray-300 hover:text-white hover:bg-gray-800 transition-transform transform hover:scale-110 shadow-md p-2 rounded-full"
              title="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-200 border-t border-white/20 py-4">
        &copy; {new Date().getFullYear()} <span className="font-semibold">ElevateHire</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
