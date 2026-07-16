import { motion } from "framer-motion";

import pizza from "../../assets/pizza.png";
import burger from "../../assets/burger.jpg";
import momo from "../../assets/pizza.png";
import noodles from "../../assets/pizza.png";
import chicken from "../../assets/pizza.png";
import drinks from "../../assets/pizza.png";
import dessert from "../../assets/desert.jpg";
import biryani from "../../assets/desert.jpg";
const categories = [
  {
    name: "Pizza",
    items: "25+ Items",
    image: pizza,
  },
  {
    name: "Burger",
    items: "18+ Items",
    image: burger,
  },
  {
    name: "Momos",
    items: "15+ Items",
    image: momo,
  },
  {
    name: "Noodles",
    items: "20+ Items",
    image: noodles,
  },
  {
    name: "Chicken",
    items: "30+ Items",
    image: chicken,
  },
  {
    name: "Drinks",
    items: "15+ Items",
    image: drinks,
  },
  {
    name: "Desserts",
    items: "22+ Items",
    image: dessert,
  },
  {
    name: "Biryani",
    items: "18+ Items",
    image: biryani,
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Browse By Category
          </h2>

          <p className="mt-3 text-gray-500">
            Choose your favourite food category
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              className="
              group
              cursor-pointer
              rounded-3xl
              bg-orange-50
              p-6
              text-center
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-3
              hover:bg-orange-500
              hover:shadow-xl
              "
            >
              {/* Image */}

              <div
                className="
                mx-auto
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
                transition
                duration-300
                group-hover:scale-110
                "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                  h-20
                  w-20
                  object-contain
                  "
                />
              </div>

              {/* Name */}

              <h3
                className="
                mt-5
                text-xl
                font-bold
                text-gray-900
                group-hover:text-white
                "
              >
                {category.name}
              </h3>

              {/* Items */}

              <p
                className="
                mt-2
                text-sm
                text-gray-500
                group-hover:text-orange-100
                "
              >
                {category.items}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
