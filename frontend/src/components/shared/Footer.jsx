import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner backdrop-blur-sm transition-colors duration-300 pb-16">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

        {/* Brand */}
        <div className="text-center lg:text-left space-y-3">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            Elevate<span className="text-purple-600 dark:text-purple-400">Hire</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto lg:mx-0">
            Connecting ambitious minds with incredible opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Explore</h2>
          <ul className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 inline-block hover:-translate-y-0.5">Home</a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 inline-block hover:-translate-y-0.5">Jobs</a>
            </li>
            <li>
              <a href="/browse" className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 inline-block hover:-translate-y-0.5">Browse</a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center lg:items-end gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Connect</h2>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/AnanyaRaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-full backdrop-blur-md"
              title="Twitter"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://linkedin.com/in/ananya-raj-796409297/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-full backdrop-blur-md"
              title="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/AnanyaRaj14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-transform transform hover:scale-110 hover:shadow-lg p-2 rounded-full backdrop-blur-md"
              title="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 py-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-semibold">ElevateHire</span>. All rights reserved.
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </footer>
  );
};

export default Footer;
