import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {

    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)}  
            className="p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full"
        >
            {/* Company Info */}
            <div>
                <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
            </div>

            {/* Job Info */}
            <div className='mt-3 flex-1'>
                <h1 className='font-bold text-lg my-2 text-gray-800 dark:text-gray-200'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-3'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold dark:text-blue-400' variant="ghost">{job?.position}</Badge>
                <Badge className='text-red-700 font-bold dark:text-red-400' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-violet-700 font-bold dark:text-violet-400' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
