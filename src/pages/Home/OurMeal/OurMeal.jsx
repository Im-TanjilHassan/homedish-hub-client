import axiosPublic from "../../../api/axiosPublic"
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../../../components/FoodCard";

const OurMeal = () => {
     const {
       data: meals = [],
       isLoading,
       isError,
     } = useQuery({
       queryKey: ["home-meals"],
       queryFn: async () => {
         const res = await axiosPublic.get("/meals/home");
         return res.data;
       },
     });

     if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;
    
    console.log(meals);
    
    return (
      <div className="mb-20">
        <div className="text-center space-y-3 mb-30">
          <h2 className="text-primary text-2xl font-bold">Our Meal</h2>
          <p className="text-gray-500 w-[60%] mx-auto">
            Discover delicious home-cooked meals made with care by local chefs.
            Fresh, healthy, and ready to enjoy every day.Simple ingredients,
            authentic taste, and trusted quality.
          </p>
        </div>
        {/* card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20 justify-items-center">
          {meals.map((meal) => (
            <FoodCard key={meal._id} meal={meal}></FoodCard>
          ))}
        </div>
      </div>
    );
};

export default OurMeal;