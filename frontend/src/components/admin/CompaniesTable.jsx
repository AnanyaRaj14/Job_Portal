import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = ({ filterText }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`);
        setCompanies(
          Array.isArray(res.data) ? res.data : res.data.companies || []
        );
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      }
    };
    getCompanies();
  }, []);

  // Apply filtering
  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
      <Table className="min-w-full text-sm sm:text-base">
        <TableCaption className="text-gray-600 dark:text-gray-400 py-4">
          List of your registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
            <TableHead className="font-semibold">Logo</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow
                key={company._id || company.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <TableCell>
                  <Avatar className="h-10 w-10 border border-gray-300 dark:border-gray-600">
                    <AvatarImage
                      src={company.logo}
                      alt={company.name || "Company Logo"}
                    />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                  {company.name}
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-300">
                  {company.createdAt?.slice(0, 10) || "—"}
                </TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <div className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                        <Edit2 className="w-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-gray-700 dark:text-gray-200">
                          Edit
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 dark:text-gray-400 py-6"
              >
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
