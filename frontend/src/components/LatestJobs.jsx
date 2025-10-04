import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          Discover the most recent and trending job opportunities tailored for
          developers, analysts, and tech professionals.
        </p>
      </div>

      {/* Job Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
        transition-all duration-300"
      >
        {allJobs.length <= 0 ? (
          <span className="text-gray-600 dark:text-gray-300 text-center col-span-full">
            No available jobs right now.
          </span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>

      {/* Subtle Glow Divider */}
      <div className="mt-16 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-[#6A38C2]/70 via-[#9B5DE5]/50 to-transparent rounded-full"></div>

      {/* Explore All Jobs Button */}
      <div className="text-center mt-8">
        <Button
          onClick={() => navigate('/jobs')}
          className="bg-[#6A38C2] hover:bg-[#5b2fa8] text-white font-semibold px-6 py-2 rounded-full transition-transform duration-200 hover:scale-105"
        >
          Explore All Jobs →
        </Button>
      </div>
    </div>
  )
}

export default LatestJobs
