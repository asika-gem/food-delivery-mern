import {
  UtensilsCrossed,
  Truck,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,

} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h1 className="text-5xl font-bold text-orange-600 mb-4">
              About Foodie
            </h1>

            <p className="text-gray-600 text-lg leading-8">
              Foodie is your trusted online food delivery platform. We
              connect customers with the best local restaurants and reliable
              delivery riders to make food ordering simple, fast, and enjoyable.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700"
            alt="Food"
            className="rounded-2xl shadow-lg w-full h-87.5 object-cover"
          />
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <Truck className="mx-auto text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Quick and reliable doorstep delivery.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <UtensilsCrossed
                className="mx-auto text-orange-500 mb-4"
                size={40}
              />
              <h3 className="font-semibold">Fresh Food</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Delicious meals prepared by trusted restaurants.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <ShieldCheck className="mx-auto text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Safe and secure payment methods.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <MapPin className="mx-auto text-orange-500 mb-4" size={40} />
              <h3 className="font-semibold">Local Restaurants</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Discover the best restaurants near you.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow p-8 mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>

          <p className="text-gray-600 leading-8">
            Our mission is to make food ordering convenient and enjoyable by
            connecting customers, restaurants, and delivery riders through a
            reliable and easy-to-use platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-orange-500 text-white rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold">50+</h2>
            <p>Restaurants</p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold">500+</h2>
            <p>Food Items</p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold">5K+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold">10K+</h2>
            <p>Orders Delivered</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:aashikaadhikari815@gmail.com"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <Mail />
            gmail
            </a>

            <a
              href="tel:+9779812345678"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <Phone />
            phone
            </a>

            <a
              href="https://github.com/asika-gem"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-orange-500"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
