import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { setSingleCompany } from '@/redux/companySlice'; // Kept as is

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const [cookies] = useCookies();

    const decoded = jwtDecode(cookies.token);
    const userId = decoded.userId;

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name.");
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
                { companyName, userId }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company)); // unchanged
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(error.response.data.message); // Duplicate company
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>
                        What would you like to name your company? You can change this later.
                    </p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Google, Microsoft, Paytm etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies/")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
