import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "Amazing food quality and super fast delivery. I always order from this platform!",
  },

  {
    id: 2,
    name: "Priya Thapa",
    role: "Food Lover",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "The restaurant choices are great and the ordering process is very easy.",
  },

  {
    id: 3,
    name: "Rohan Gurung",
    role: "Happy Customer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    review:
      "Fast delivery and affordable prices. Best food delivery experience.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="mb-14 text-center"
        >
          <h2
            className="
          text-4xl
          font-extrabold
          text-gray-900
          "
          >
            What Our Customers Say
          </h2>

          <p
            className="
          mt-3
          text-gray-500
          "
          >
            Thousands of customers trust us for their daily meals
          </p>
        </motion.div>

        {/* Reviews */}

        <div
          className="
        grid
        gap-8
        md:grid-cols-3
        "
        >
          {reviews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                rounded-3xl
                bg-orange-50
                p-8
                shadow-sm
                hover:shadow-xl
                "
            >
              {/* User */}

              <div
                className="
                flex
                items-center
                gap-4
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    h-14
                    w-14
                    rounded-full
                    object-cover
                    "
                />

                <div>
                  <h3
                    className="
                    font-bold
                    text-gray-900
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    "
                  >
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Stars */}

              <div
                className="
                mt-5
                flex
                gap-1
                "
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="
                        fill-yellow-400
                        text-yellow-400
                        "
                  />
                ))}
              </div>

              {/* Review */}

              <p
                className="
                mt-5
                leading-7
                text-gray-600
                "
              >
                "{item.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
