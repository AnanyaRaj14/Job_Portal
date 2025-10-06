import React from 'react'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  return (
    <div className="w-full overflow-x-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
      <Table className="w-full min-w-[600px]">
        <TableCaption className="my-4 text-gray-600 dark:text-gray-300 text-base font-medium">
          Your Applied Jobs
        </TableCaption>

        <TableHeader className="bg-[#6A38C2]/10 dark:bg-[#6A38C2]/20">
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Date
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Job Role
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Company
            </TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-200 font-semibold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-600 dark:text-gray-300"
              >
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs?.map((appliedJob, index) => (
              <TableRow
                key={appliedJob._id}
                className={`transition-colors duration-200 ${index % 2 === 0
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-50 dark:bg-gray-900'
                  } hover:bg-[#6A38C2]/5 dark:hover:bg-[#6A38C2]/20`}
              >
                <TableCell className="text-gray-800 dark:text-gray-200">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-white font-semibold px-3 py-1 rounded-full ${appliedJob?.status === 'rejected'
                        ? 'bg-red-500'
                        : appliedJob.status === 'pending'
                          ? 'bg-gray-500'
                          : 'bg-green-500'
                      }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
