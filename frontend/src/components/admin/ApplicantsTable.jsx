import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const applications = applicants?.applications || [];

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    if (applications.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400">No applicants found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full border border-gray-200 dark:border-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                    A list of your recent applied users
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applications.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
                            <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                            <TableCell>
                                {item?.applicant?.profile?.resume ? (
                                    <a
                                        href={item.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 underline"
                                    >
                                        {item.applicant.profile.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell>{item?.applicant?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white dark:bg-gray-800 border dark:border-gray-700">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(status, item._id)}
                                                className="flex items-center w-fit my-2 cursor-pointer text-gray-800 dark:text-gray-200"
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
