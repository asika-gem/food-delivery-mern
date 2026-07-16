import{ useState,useEffect } from "react";
import {api} from "../services/api";

import Categories from "../components/home/categories";
import FeaturedRestaurants from "../components/home/FeaturedResturants";
import Hero from "../components/home/hero";
import PopularFoods from "../components/home/PopularFoods";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Navbar from "../components/layout/Navbar";


const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");

        // If backend returns { restaurants: [...] }
        setRestaurants(res.data.restaurants || []);

        // If backend returns array directly use:
        // setRestaurants(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const filteredRestaurants = restaurants.filter((restaurant) => {
      const keyword = search.toLowerCase();

      return (
        restaurant.name?.toLowerCase().includes(keyword) ||
        restaurant.description?.toLowerCase().includes(keyword) ||
        restaurant.address?.toLowerCase().includes(keyword)
      );
    });

  return (
    <>
      <Navbar />
      <Hero search={search} setSearch={setSearch} />

      <FeaturedRestaurants restaurants={filteredRestaurants} />
      <Categories />
      <PopularFoods />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default Home;
