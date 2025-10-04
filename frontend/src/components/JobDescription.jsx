import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {

    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant==user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant == user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0'>
                <div>
                    <h1 className='font-bold text-xl sm:text-2xl'>{singleJob?.title}</h1>
                    <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                        {singleJob?.company?.name || "Company Not Provided"}
                    </p>
                    <div className='flex flex-wrap items-center gap-2 my-2'>
                        <Badge className='text-blue-700 font-bold' variant='ghost'>
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold' variant='ghost'>
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold' variant='ghost'>
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg w-full sm:w-auto py-2 ${isApplied
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-[#f00d0d] hover:bg-[#fe828e]"
                        }`}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            {/* Job Description Title */}
            <div className='my-4'>
                <h1 className='border-b-2 pb-1 border-b-gray-300 dark:border-b-gray-600 font-medium text-lg sm:text-xl'>
                    Job Description
                </h1>
            </div>

            {/* Job Details */}
            <div className='flex flex-col gap-2'>
                {[
                    { label: "Role", value: singleJob?.title },
                    { label: "Company", value: singleJob?.company?.name || "Not Provided" },
                    { label: "Location", value: singleJob?.location || "Not Provided" },
                    { label: "Description", value: singleJob?.description },
                    { label: "Experience", value: `${singleJob?.experienceLevel || "Not Provided"} yrs` },
                    { label: "Salary", value: `${singleJob?.salary} LPA` },
                    { label: "Total Applicants", value: singleJob?.applications?.length || 0 },
                    { label: "Posted Date", value: singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "" },
                ].map((item, index) => (
                    <h1 key={index} className='font-bold my-1 text-gray-900 dark:text-gray-100 text-sm sm:text-base'>
                        {item.label}:{" "}
                        <span className='pl-2 font-normal text-gray-700 dark:text-gray-300'>
                            {item.value}
                        </span>
                    </h1>
                ))}
            </div>
        </div>
    )
}

export default JobDescription
