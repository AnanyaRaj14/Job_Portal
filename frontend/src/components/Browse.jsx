import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-gray-100">
            Search Results{' '}
            <span className="text-[#6A38C2]">({allJobs.length})</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 sm:mt-0">
            Explore all opportunities that match your interest
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length <= 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                No jobs found. Try searching with different keywords.
              </p>
            </div>
          ) : (
            allJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>

        {/* Divider */}
        <div className="mt-16 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-[#6A38C2]/70 via-[#9B5DE5]/40 to-transparent rounded-full"></div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Showing {allJobs.length} job
          {allJobs.length === 1 ? '' : 's'} matching your search.
        </div>
      </div>
    </div>
  )
}

export default Browse
