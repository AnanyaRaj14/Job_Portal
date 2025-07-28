import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
const Job = () => {
    return (
        <div>
            <div>
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
                    <h1>Company Name</h1>
                    <p>India</p>
                </div>

            </div>



            {/* <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div> */}
        </div>

    )
}

export default Job
