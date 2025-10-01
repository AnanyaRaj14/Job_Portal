import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>Ananya Mishra</TableCell>
                        <TableCell>ananya@test.com</TableCell>
                        <TableCell>9735264795006847</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell>01/10/2025</TableCell>
                        <TableCell className="float-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                        shortlistingStatus.map((status, index) => {
                                            return (
                                                <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable
