import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen, Mail, Contact } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["html", "css", "Js", "reactJs", "MongoDB", "ExpressJs", "NodeJs"];

const Profile = () => {
    const isResume = true;
    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Brand-Logos-for-Creative-and-Cool-Companies/orange-electronics-company-by-ions-brandcrowd.png" alt="profile">
                            </AvatarImage>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nesciunt.</p>
                        </div>
                    </div>
                    <Button className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className='h-4 w-4' />
                        <span>ananya@example.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className='h-4 w-4' />
                        <span>63464899739765</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index} >{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='_blank' href='https://youtube.com/@chaiaurcode' className='text-blue-600 w-full hover:underline cursor-pointer'>Chai Aur Code</a> : <span>NA</span>
                    }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1  className='text-xl font-bold p-5'>Applied Jobs</h1>
                    {/* Application Table */}
                    <AppliedJobTable />
                </div>
            </div>
        </div>
    )
}

export default Profile
