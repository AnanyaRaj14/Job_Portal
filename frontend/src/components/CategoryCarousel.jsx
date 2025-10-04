import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Data Analyst",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-4xl mx-auto my-10 relative">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center md:basis-1/2 lg:basis-1/3 px-2">
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full sm:w-auto rounded-full px-4 py-2 text-sm sm:text-base"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Left arrow */}
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 z-10" />

                {/* Right arrow */}
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 z-10" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
