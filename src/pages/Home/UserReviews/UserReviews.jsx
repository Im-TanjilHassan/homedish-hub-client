import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from '../../../api/axiosPublic';

const UserReviews = () => {
    const { data: reviews = [], isLoading } = useQuery({
      queryKey: ["homeReviews"],
      queryFn: async () => {
        const res = await axiosPublic.get("/reviews");
        return res.data.slice(0, 6);
      },
    });

     if (isLoading) {
       return (
         <div className="flex justify-center py-16">
           <span className="loading loading-spinner loading-lg"></span>
         </div>
       );
    }
    
    console.log(reviews);
    
    return (
      <div className="mb-20">
        <div>
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">What Our Customers Say</h2>
            <p className="text-gray-500 mt-2">
              Real reviews from people who ordered our meals
            </p>
          </div>
        </div>
      </div>
    );
};

export default UserReviews;