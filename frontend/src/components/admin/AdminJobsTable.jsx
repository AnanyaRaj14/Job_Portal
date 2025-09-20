import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableRow, TableCell, TableHead, TableHeader } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useSelector } from 'react-redux'

const AdminJobsTable = ({ filterText }) => {
    // const [companies, setCompanies] = useState([]);
    const {allAdminJobs = [] } = useSelector(store=>store.job || {});

    // useEffect(() => {
    //     const getCompanies = async () => {
    //         try {
    //             const res = await axios.get(`${COMPANY_API_END_POINT}/get`);
    //             setCompanies(Array.isArray(res.data) ? res.data : res.data.companies || []);
    //         } catch (error) {
    //             console.error("Error fetching companies:", error);
    //             setCompanies([]);
    //         }
    //     };
    //     getCompanies();
    // }, []);

    // Apply filtering (check title or company name)
    const filteredJobs = (allAdminJobs || []).filter(job =>
    job.title?.toLowerCase().includes(filterText.toLowerCase()) ||
    job.company?.name?.toLowerCase().includes(filterText.toLowerCase())
);


    return (
        <div>
            <Table>
                <TableCaption>List of your posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job.company?.name}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.createdAt?.slice(0, 10)}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
