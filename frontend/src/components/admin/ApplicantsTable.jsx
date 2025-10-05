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

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  if (!applicants || !applicants.applications?.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-6">
        No applicants found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableCaption className="text-gray-500 dark:text-gray-400 mb-2">
          List of recently applied users
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.applications.map((item) => (
            <TableRow key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.applicant.profile.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-500"
                        onClick={() => statusHandler(status, item._id)}
                      >
                        <span>{status}</span>
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
