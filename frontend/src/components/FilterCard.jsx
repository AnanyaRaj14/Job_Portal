import React from 'react'
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from './ui/radio-group';


const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-medium text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={item} />
                                            <label>{item}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
