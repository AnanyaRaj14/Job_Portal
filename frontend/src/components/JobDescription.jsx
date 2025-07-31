import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Full Stack Developer</h1>
                    <div className='flex items-center gap-2 my-2'>
                        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>12 Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>Full Time</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant={'ghost'}>24LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? "bg-green-600 cursor-not-allowed" : "bg-[#f00d0d] hover:bg-[#fe828e]"}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <div className='my-4'>
                <h1 className='border-b-2 pb-1 border-b-gray-300 font-medium'>Job Description</h1>
            </div>
            <div>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Full Stack</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Kolkata</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, accusantium.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>freshers</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'> 24LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>7</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>30-07-2025</span></h1>
            </div>
        </div>

    )
}

export default JobDescription
