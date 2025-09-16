import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableRow, TableCell, TableHead, TableHeader } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'

const AdminJobsTable = ({ filterText }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`);
                setCompanies(Array.isArray(res.data) ? res.data : res.data.companies || []);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setCompanies([]);
            }
        };
        getCompanies();
    }, []);

    // Apply filtering
    const filteredCompanies = companies.filter(company =>
        company.name?.toLowerCase().includes(filterText.toLowerCase())
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
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => (
                            <TableRow key={company._id || company.id}>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt?.slice(0, 10)}</TableCell>
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
                                No companies found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
