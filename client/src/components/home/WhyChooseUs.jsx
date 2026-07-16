import { motion } from "framer-motion";
import {
  Bike,
  Utensils,
  BadgeDollarSign,
  Clock,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description:
      "Get your favorite meals delivered quickly with our reliable delivery partners.",
    icon: Bike,
  },

  {
    id: 2,
    title: "Fresh Food",
    description:
      "We partner with trusted restaurants to provide fresh and quality food.",
    icon: Utensils,
  },

  {
    id: 3,
    title: "Best Price",
    description:
      "Enjoy affordable meals, special discounts, and amazing offers every day.",
    icon: BadgeDollarSign,
  },

  {
    id: 4,
    title: "On Time Delivery",
    description:
      "Real-time tracking helps you know exactly when your order arrives.",
    icon: Clock,
  },

  {
    id: 5,
    title: "Secure Ordering",
    description:
      "Your orders and payments are protected with secure technology.",
    icon: ShieldCheck,
  },

  {
    id: 6,
    title: "24/7 Support",
    description: "Our support team is always ready to help you anytime.",
    icon: Headphones,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We make food ordering simple, fast and enjoyable with the best
            restaurants around you.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
        "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
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
                  group
                  rounded-3xl
                  bg-white
                  p-8
                  shadow-md
                  transition
                  hover:shadow-xl
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-100
                    text-orange-500
                    transition
                    group-hover:bg-orange-500
                    group-hover:text-white
                  "
                >
                  <Icon size={32} />
                </div>

                {/* Text */}

                <h3
                  className="
                  mt-6
                  text-xl
                  font-bold
                  text-gray-900
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                  mt-3
                  leading-7
                  text-gray-600
                  "
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
