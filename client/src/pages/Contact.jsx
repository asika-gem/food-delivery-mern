import { Mail, Phone, MapPin, Clock3 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-orange-600">Contact Us</h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions or need assistance? We'd love to hear from you. Reach
            out using the information below or send us a message.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <MapPin className="mx-auto text-orange-500 mb-3" size={35} />
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600 text-sm">Pokhara, Nepal</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <Phone className="mx-auto text-orange-500 mb-3" size={35} />
            <h3 className="font-semibold mb-2">Phone</h3>

            <a
              href="tel:+9779812345678"
              className="text-gray-600 hover:text-orange-500"
            >
              +977 9812345678
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <Mail className="mx-auto text-orange-500 mb-3" size={35} />
            <h3 className="font-semibold mb-2">Email</h3>

            <a
              href="mailto:support@foodexpress.com"
              className="text-gray-600 hover:text-orange-500"
            >
              support@foodexpress.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <Clock3 className="mx-auto text-orange-500 mb-3" size={35} />
            <h3 className="font-semibold mb-2">Working Hours</h3>

            <p className="text-gray-600 text-sm">
              Sun - Fri
              <br />
              9:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

            <p className="text-gray-600 mb-6 leading-7">
              Have a question, feedback, or need support? Click the button below
              to send us an email. Your default email application will open with
              our email address already filled in.
            </p>

            <a
              href="mailto:support@foodexpress.com?subject=FoodExpress Inquiry"
              className="inline-flex items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </a>
          </div>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Location"
              src="https://www.google.com/maps?q=Pokhara,Nepal&output=embed"
              className="w-full h-full min-h-125"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Follow Us</h2>

          <div className="flex justify-center gap-6 text-3xl">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 p-4 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 p-4 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 p-4 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-100 p-4 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
