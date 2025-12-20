import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import image1 from "../../../assets/banner/banner1-removebg-preview.png";
import image2 from "../../../assets/banner/banner2-removebg-preview.png";
import image3 from "../../../assets/banner/banner3-removebg-preview.png";
import bannerBg from "../../../assets/banner/banner-bg-removebg-preview.png";
import { SiCodechef } from "react-icons/si";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";

const images = [image1, image2, image3];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { dbUser } = useContext(AuthContext);

  const roleConfigBtnOne = {
    chef: {
      text: "Create Meal",
      route: "/dashboard/createMeal",
    },
    admin: {
      text: "Manage Users",
      route: "/dashboard/manageUsers",
    },
    user: {
      text: "Order",
      route: "/dashboard/myOrder",
    },
  };
  const roleConfigBtnTwo = {
    chef: {
      text: "Order Request",
      route: "/dashboard/order",
    },
    admin: {
      text: "Platform Statistics",
      route: "/dashboard/platformStatics",
    },
    user: {
      text: "Favorite Meal",
      route: "/dashboard/favoriteMeal",
    },
  };

  /* Image carousel (fade) */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Typewriter (stable npm-based) */
  const [text] = useTypewriter({
    words: ["Home-Cooked", "Hygienic"],
    loop: true,
    delaySpeed: 2500,
    typeSpeed: 70,
    deleteSpeed: 50,
  });

  return (
    <section
      className="relative min-h-[90vh] flex-col md:flex-row lg:flex p-5 items-center gap-10 justify-center bg-base-100 overflow-hidden bg-center bg-cover bg-no-repeat rounded-2xl mb-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
          url(${bannerBg})
        `,
      }}
    >
      {/* Text content */}
      <div>
        <p className="font-bold text-neutral-content mb-2">
          <span className="text-primary">___</span> We Are The Best.
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Fresh{" "}
          <span className="text-primary">
            {text}
            <Cursor cursorStyle="_" />
          </span>{" "}
          Meals
          <br />
          From <span className="text-primary">HomeDish</span>-Hub
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-xl">
          Discover healthy, affordable, and delicious homemade food prepared
          daily by trusted local chefs near you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            to={roleConfigBtnOne[dbUser?.role]?.route || "/Order"}
            className="
              px-8 py-3 rounded-xl 
              bg-primary text-white font-semibold
              shadow-lg
              transition-all duration-300
              hover:bg-primary/80 hover:shadow-xl
              hover:-translate-y-0.5
              active:translate-y-0 cursor-pointer
            "
          >
            {roleConfigBtnOne[dbUser?.role]?.text || "Order"}
          </Link>

          <Link
            to={roleConfigBtnTwo[dbUser?.role]?.route || "/favoriteMeal"}
            className="
              px-8 py-3 rounded-xl 
              border-2 border-primary text-primary font-semibold
              transition-all duration-300 shadow-lg
              hover:bg-primary hover:text-white
              hover:shadow-xl
              hover:-translate-y-0.5
              active:translate-y-0
              flex items-center gap-3 cursor-pointer
            "
          >
            <SiCodechef />
            {roleConfigBtnTwo[dbUser?.role]?.text || "favoriteMeal"}
          </Link>
        </div>
      </div>

      {/* Food image carousel */}
      <div>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="Food dish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-[320px] h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Banner;
