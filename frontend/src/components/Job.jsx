import React from 'react'
import { Button } from './ui/button'
import { Badge, Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>5 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>

                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Brand-Logos-for-Creative-and-Cool-Companies/orange-electronics-company-by-ions-brandcrowd.png" />
                    </Avatar>
                </Button>

                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nesciunt autem nulla reiciendis sapiente porro nam laboriosam perferendis neque debitis.</p>
            </div>
           
            <div className='mt-2'>
                <Button  variant="outline">Details</Button>
                <Button className="bg-[#7209b7] mx-3">Save For Later</Button>
            </div>
        </div>

    )
}

export default Job
