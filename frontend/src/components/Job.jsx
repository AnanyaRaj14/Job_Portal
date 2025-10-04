import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div 
            className="
                p-5 rounded-xl shadow-lg bg-white dark:bg-gray-800 
                border border-gray-100 dark:border-gray-700 
                transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] 
                flex flex-col justify-between 
                h-full min-h-[340px] max-h-[360px] 
                w-full
            "
        >
            {/* Top Section */}
            <div className="flex flex-col flex-grow">
                {/* Header */}
                <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                    <p>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                    <Button variant="outline" className="rounded-full p-2" size="icon">
                        <Bookmark />
                    </Button>
                </div>

                {/* Company Info */}
                <div className='flex items-center gap-3 my-3'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                    <div>
                        <h2 className='font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100'>
                            {job?.company ? job.company.name : "Company Not Provided"}
                        </h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
                    </div>
                </div>

                {/* Job Title & Description */}
                <div className='mb-3 flex-1 overflow-hidden'>
                    <h3 className='font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100'>
                        {job?.title}
                    </h3>
                    <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3'>
                        {job?.description}
                    </p>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap gap-2 mt-auto'>
                    <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                    <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                    <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-3 mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className='w-full sm:w-auto'
                >
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white w-full sm:w-auto hover:bg-purple-800 transition-colors duration-300">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job
