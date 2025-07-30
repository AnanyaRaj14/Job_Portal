import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { Badge } from './ui/badge'
const AppliedJobTable = () => {
    return (
        <div>
            <Table className="bg-white border border-gray-200">
                <TableCaption className="my-2">Your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4,5].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>30-07-2025</TableCell>
                                <TableCell>Full Stack</TableCell>
                                <TableCell>Amazon</TableCell>
                                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
