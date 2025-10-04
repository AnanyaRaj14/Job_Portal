import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if(query.trim() !== ""){
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  const trendingJobs = ["Frontend", "Backend", "Data Analyst", "UI/UX", "Full Stack", "DevOps"];

  const trendingClickHandler = (term) => {
    setQuery(term);
    dispatch(setSearchedQuery(term));
    navigate("/browse");
  };

  return (
    <section className="text-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-5 sm:gap-6 max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-[#F83002] font-semibold text-sm shadow-sm"
        >
          India’s Leading Career Launchpad
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug text-gray-900 dark:text-gray-100"
        >
          Discover, Connect & <br /> Land Your{" "}
          <span className="text-[#6A38C2]">Perfect Role</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-lg"
        >
          Unlock endless opportunities, connect with top companies, and shape your future with confidence.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex w-full sm:w-[85%] lg:w-[65%] shadow-md border border-gray-200 dark:border-gray-600 pl-4 pr-1 py-1 rounded-full items-center gap-3 mx-auto bg-white dark:bg-gray-800"
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm sm:text-base px-2 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] p-2 sm:p-3 transition-all duration-300"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>

        {/* Trending Searches */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-4"
        >
          {trendingJobs.map((job) => (
            <button
              key={job}
              onClick={() => trendingClickHandler(job)}
              className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm hover:bg-[#6A38C2] hover:text-white transition-colors duration-300 shadow-sm"
            >
              {job}
            </button>
          ))}
        </motion.div> */}

      </motion.div>
    </section>
  )
}

export default HeroSection
