import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen, Mail, Contact } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    console.log('user', user);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />

            {/* Profile Card */}
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-5 p-6 sm:p-8 transition-colors duration-300'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl sm:text-2xl text-gray-900 dark:text-gray-100'>{user?.fullname}</h1>
                            <p className='text-gray-600 dark:text-gray-300 mt-1'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className='self-end sm:self-auto'
                        variant='outline'>
                        <Pen />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className='my-5 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2'>
                    <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 text-gray-600 dark:text-gray-300' />
                        <span className='text-gray-700 dark:text-gray-200'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Contact className='h-4 w-4 text-gray-600 dark:text-gray-300' />
                        <span className='text-gray-700 dark:text-gray-200'>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-5'>
                    <h1 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">{item}</Badge>)
                            : <span className='text-gray-500 dark:text-gray-400'>NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className="grid w-full max-w-sm items-start gap-1.5">
                    <Label className="text-md font-bold text-gray-800 dark:text-gray-200">Resume</Label>
                    {isResume 
                        ? <a target='_blank' rel="noreferrer" href={user?.profile?.resume} className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate'>{user?.profile?.resumeOriginalName}</a>
                        : <span className='text-gray-500 dark:text-gray-400'>NA</span>
                    }
                </div>
            </div>

            {/* Applied Jobs */}
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl mt-6 transition-colors duration-300'>
                <h1 className='text-xl sm:text-2xl font-bold p-5 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
