import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaArrowRight,
  FaEye,
  FaLock,
  FaRegEyeSlash,
  FaRegUser,
} from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, updateUser, refreshUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";
  const imgbbKey = import.meta.env.VITE_IMAGEBB_KEY;

  const handleRegister = async (data) => {
    console.log(data);

    try {
      setShowLoader(true);

      const formData = new FormData();
      formData.append("image", data.image[0]);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadImg = await uploadRes.json();
      const imageUrl = uploadImg.data.url;

      await registerUser(data.email, data.password);
      await updateUser(data.name, imageUrl);

      setShowLoader(false);
      refreshUser();

      Swal.fire({
        title: "Account created!",
        text: "Registration successful.",
        icon: "success",
        timer: 1500,
      });

      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);

      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="py-6 mb-5 flex items-center justify-center">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl/30">
        {/* left Side */}
        <div
          className="hidden md:flex w-1/2 text-white flex-col justify-center items-center p-10 relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='770' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%231e3266'%3e%3c/rect%3e%3cpath d='M1488 560L0 560 L0 367.65Q33.55 281.19%2c 120 314.74Q166.38 289.12%2c 192 335.49Q244.35 315.84%2c 264 368.19Q293.5 277.69%2c 384 307.19Q467.12 270.31%2c 504 353.42Q510.21 287.63%2c 576 293.85Q645.45 243.31%2c 696 312.76Q741.21 285.97%2c 768 331.17Q805.82 248.99%2c 888 286.81Q933.91 260.72%2c 960 306.63Q1011.94 286.57%2c 1032 338.51Q1079.41 313.92%2c 1104 361.34Q1129.95 267.29%2c 1224 293.24Q1302.38 251.62%2c 1344 330Q1394.93 308.94%2c 1416 359.87Q1430.38 302.25%2c 1488 316.62z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M1464 560L0 560 L0 352.5Q68.94 349.44%2c 72 418.39Q142.8 369.19%2c 192 439.98Q230.48 358.46%2c 312 396.93Q355.76 368.69%2c 384 412.46Q458.2 366.66%2c 504 440.87Q519.42 336.29%2c 624 351.71Q661.29 317%2c 696 354.29Q777.19 315.49%2c 816 396.68Q872.41 381.09%2c 888 437.49Q904.49 333.98%2c 1008 350.46Q1051.08 321.54%2c 1080 364.62Q1137.94 350.56%2c 1152 408.5Q1197.06 381.56%2c 1224 426.62Q1250.99 333.61%2c 1344 360.6Q1410.67 307.27%2c 1464 373.95z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M1536 560L0 560 L0 517.54Q36.1 433.63%2c 120 469.73Q165.17 442.9%2c 192 488.08Q235.97 412.05%2c 312 456.03Q361.59 385.62%2c 432 435.21Q485.01 416.22%2c 504 469.23Q532.33 425.56%2c 576 453.88Q659.17 417.05%2c 696 500.22Q717.27 449.5%2c 768 470.77Q783.8 414.56%2c 840 430.36Q881.94 400.3%2c 912 442.24Q995.99 406.23%2c 1032 490.21Q1079.33 465.54%2c 1104 512.87Q1124.51 413.38%2c 1224 433.9Q1289.4 379.3%2c 1344 444.71Q1411.08 439.79%2c 1416 506.87Q1454.36 425.23%2c 1536 463.59z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M1536 560L0 560 L0 552.77Q27.34 508.11%2c 72 535.44Q133 524.44%2c 144 585.44Q168.73 538.17%2c 216 562.9Q248.28 475.18%2c 336 507.46Q388.41 487.87%2c 408 540.27Q459.08 519.35%2c 480 570.42Q485.25 503.66%2c 552 508.91Q619.9 456.82%2c 672 524.72Q728.75 509.47%2c 744 566.22Q770.14 520.36%2c 816 546.5Q832.26 490.76%2c 888 507.02Q932.19 479.21%2c 960 523.4Q980.85 472.25%2c 1032 493.09Q1121.61 462.69%2c 1152 552.3Q1173.08 501.38%2c 1224 522.45Q1274.24 452.7%2c 1344 502.94Q1408.61 495.55%2c 1416 560.16Q1452.74 476.9%2c 1536 513.65z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
          }}
        >
          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome to HomeDish-Hub</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              HomeDish-Hub is a modern single-page website for Food lovers who
              want to eat Delicious and Hygienic meal at their homes from local
              chefs.It lets users explore various items of meal all over the
              country, parches Delicious food, and enjoy at home.
            </p>
            <p className="text-gray-400 text-xs">
              More than 27k people joined — it’s your turn!
            </p>
          </div>
        </div>
        {/* right Side - Sign In Form */}
        <div className="flex-1 max-w-md w-full mx-auto lg:mx-0 backdrop-blur-xl p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl text-black font-semibold tracking-tight">
              Sign up
            </h2>
            <p className="mt-1 text-base text-slate-400">
              Start your trial — no credit card required.
            </p>
          </div>
          {showLoader && (
            <span className="loading loading-spinner text-orange-600"></span>
          )}
          {!showLoader && (
            <div>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-4"
              >
                {/* name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Full name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <FaRegUser className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      {...register("name", { required: "Name is Required" })}
                      id="name"
                      type="text"
                      placeholder="Alex Rivers"
                      className="w-full rounded-xl border border-gray-400 pl-9 pr-3 py-2.5 text-base text-gray-600 placeholder:text-slate-500 outline-none ring-0 transitionfocus:ring-1"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[14px]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Email*
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <IoMdMail className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid Email Formate",
                        },
                      })}
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-gray-400 bg-white pl-9 pr-3 py-2.5 text-gray-600 placeholder:text-slate-500 outline-none ring-0 transition"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[14px] text-red-500">
                      *{errors.email.message}
                    </p>
                  )}
                </div>
                {/* profile image */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Profile Image*
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <FaRegUser className="h-4 w-4 text-slate-500" />
                    </div>

                    <input
                      {...register("image", {
                        required: "Profile Image is Required",
                      })}
                      id="image"
                      type="file"
                      accept="image/*"
                      className="w-full rounded-xl border border-gray-400 bg-white pl-9 pr-3 py-2.5 text-base text-gray-600 outline-none ring-0 file:hidden cursor-pointer"
                    />
                  </div>

                  {errors.image && (
                    <p className="text-red-500 text-[14px]">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                {/* address */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Address*
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <FaRegUser className="h-4 w-4 text-slate-500" />
                    </div>

                    <input
                      {...register("address", {
                        required: "Address is Required",
                      })}
                      id="address"
                      type="text"
                      placeholder="House 12, Road 7, Mirpur DOHS"
                      className="w-full rounded-xl border border-gray-400 bg-white pl-9 pr-3 py-2.5 text-base text-gray-600 placeholder:text-slate-500 outline-none ring-0 transition"
                    />
                  </div>

                  {errors.address && (
                    <p className="text-red-500 text-[14px]">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                {/* password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <FaLock className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      {...register("password", {
                        required: "Password is Required",
                        minLength: {
                          value: 8,
                          message: "min 8 character",
                        },
                        maxLength: {
                          value: 20,
                          message: "max 20 character",
                        },
                      })}
                      autoComplete="true"
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="At least 8 characters"
                      className="w-full rounded-xl border border-slate-800 bg-white pl-9 pr-20 py-2.5 text-base text-gray-600 placeholder:text-slate-500 outline-none ring-0 transition"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-2 top-6 transform -translate-y-1/2 text-lg text-gray-600"
                      >
                        {showPass ? <FaEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-[14px] text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* confirm password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <FaLock className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      {...register("confirmPassword", {
                        required: "Confirm Password is Required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      autoComplete="true"
                      id="confirmPassword"
                      type={showPass ? "text" : "password"}
                      placeholder="Re Type The Password"
                      className="w-full rounded-xl border border-slate-800 bg-white pl-9 pr-20 py-2.5 text-base text-gray-600 placeholder:text-slate-500 outline-none ring-0 transition"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-2 top-6 transform -translate-y-1/2 text-lg text-gray-600"
                      >
                        {showPass ? <FaEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[14px] text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-700 via-black to-gray-700 px-4 py-2.5 text-sm font-semibold tracking-tight text-slate-50 shadow-lg shadow-gray-700 transition hover:from-black hover:via-gray-700 hover:to-black cursor-pointer"
                >
                  <span>Create account</span>
                  <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
              <div className="mt-5 text-center text-xs text-gray-600">
                <span>Already have an account? </span>
                <Link
                  to="/login"
                  type="button"
                  className="font-medium text-black underline decoration-slate-600 underline-offset-2 hover:text-gray-800"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
