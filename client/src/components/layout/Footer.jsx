import { Link } from "react-router-dom";


const Footer = () => {
  const links = [
    { name: "Home", path: "/" },
   ,
    { name: "Restaurants", path: "/restaurants" },
    { name: "About", path: "/aboutus" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-purple-500">Foodie</h2>

          <p className="mt-3 text-sm">
            Delicious food delivered to your doorstep.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <div className="grid grid-cols-2 gap-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-purple-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>

          
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
