import React from 'react'
import { Table, TableBody, TableCaption, TableRow, TableCell, TableHead, TableHeader } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = ({ filterText }) => {
    const { allAdminJobs = [] } = useSelector(store => store.job || {});
    const navigate = useNavigate();

    const filteredJobs = (allAdminJobs || []).filter(job =>
        job.title?.toLowerCase().includes(filterText.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
            <Table className="min-w-full">
                <TableCaption className="text-gray-500 dark:text-gray-400 text-sm py-2">
                    List of your posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                        <TableHead className="px-4 py-2 text-left">Company Name</TableHead>
                        <TableHead className="px-4 py-2 text-left">Role</TableHead>
                        <TableHead className="px-4 py-2 text-left">Date</TableHead>
                        <TableHead className="px-4 py-2 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <TableCell className="px-4 py-2">{job.company?.name}</TableCell>
                                <TableCell className="px-4 py-2">{job.title}</TableCell>
                                <TableCell className="px-4 py-2">{job.createdAt?.slice(0, 10)}</TableCell>
                                <TableCell className="px-4 py-2 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white dark:bg-gray-700 rounded-md shadow-md border border-gray-200 dark:border-gray-600 p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer px-2 py-1 mt-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-4">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable
