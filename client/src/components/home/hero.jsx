import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Star, Clock3, Bike } from "lucide-react";

import heroFood from "../../assets/hero.png";

const Hero = ({ search, setSearch }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-red-50 pt-32 pb-24">
      {/* Background Blur */}
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {" "}
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            🔥 Fastest Food Delivery in Nepal
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            Delicious Food
            <span className="block text-orange-500">Delivered To</span>
            Your Door
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Order from your favourite restaurants with lightning-fast delivery.
            Fresh meals, amazing offers and real-time order tracking—all in one
            place.
          </p>

         

          {/* Search */}
<div className="mt-10 flex w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">

  <div className="flex flex-1 items-center px-5">
    <Search className="text-orange-500" size={22} />

    <input
      type="text"
      placeholder="Search restaurants, foods..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-transparent px-4 py-5 text-lg outline-none placeholder:text-gray-400"
    />
  </div>

  <button
    className="flex items-center gap-2 bg-orange-500 px-8 text-white font-semibold transition hover:bg-orange-600"
  >
    <Search size={20} />
    Search
  </button>
</div>


          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-5">
            <button className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-orange-600">
              Order Now
              <ArrowRight size={20} />
            </button>

            <button className="rounded-full border-2 border-orange-500 px-8 py-4 font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white">
              Explore Menu
            </button>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-orange-500">500+</h2>
              <p className="text-gray-600">Restaurants</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">20K+</h2>
              <p className="text-gray-600">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">30 Min</h2>
              <p className="text-gray-600">Average Delivery</p>
            </div>
          </div>
        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Orange Background Circle */}
          <div className="absolute h-125 w-125 rounded-full bg-linear-to-br from-orange-200 via-orange-300 to-orange-400 opacity-90 blur-sm"></div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-130 w-130 rounded-full bg-linear-to-br from-orange-400 to-orange-500"></div>

            <motion.img
              src={heroFood}
              alt="Food"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative z-10 w-105 object-contain"
            />
          </div>

          {/* Rating Card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-0 top-12 z-20 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Star className="fill-yellow-400 text-yellow-400" size={22} />
              <div>
                <h3 className="font-bold text-gray-800">4.9 Rating</h3>
                <p className="text-sm text-gray-500">12k Reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Delivery Card */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute right-0 top-1/2 z-20 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Bike className="text-orange-500" size={22} />
              <div>
                <h3 className="font-bold text-gray-800">Free Delivery</h3>
                <p className="text-sm text-gray-500">Above Rs.999</p>
              </div>
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity }}
            className="absolute bottom-10 left-16 z-20 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Clock3 className="text-orange-500" size={22} />
              <div>
                <h3 className="font-bold text-gray-800">20–30 Min</h3>
                <p className="text-sm text-gray-500">Fast Delivery</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
