import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from './ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Data Analyst","Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md transition-colors duration-300'>
            <h1 className='font-bold text-xl text-gray-900 dark:text-gray-100 mb-3'>Filter Jobs</h1>
            <hr className='border-gray-300 dark:border-gray-600 mb-4' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="flex flex-col gap-5">
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-md sm:text-lg'>{data.filterType}</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div 
                                        key={idx} 
                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                                    >
                                        <RadioGroupItem value={item} id={itemId} />
                                        <label htmlFor={itemId} className='text-gray-700 dark:text-gray-300'>{item}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard
