import { FaTelegramPlane } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative py-12 pt-10 mt-10 overflow-hidden bg-black">
      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-90"></div>
        <div className="absolute w-72 h-72 md:w-100 md:h-100 rounded-full bg-sigma-glow top-[-10%] right-[-10%] opacity-20"></div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 md:px-2 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Logo */}

          <div className="flex items-center gap-0">
            <img
              src="/DeepTrace-new-logo3.png"
              alt="Hashfor Logo"
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
            />

            <h2 className="font-exo-2 text-white text-lg sm:text-xl md:text-2xl font-bold gradient-text ml-1 sm:ml-2 leading-none">
              DeepTrace
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            {[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "About Us",
                link: "/aboutus",
              },
              {
                name: "Contact Us",
                link: "/contactus",
              },
              {
                name: "Blog",
                link: "/blogs",
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="font-inter text-white/60 hover:text-white text-base md:text-sm transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[
              { icon: FaTelegramPlane, link: "https://t.me/yourusername" },
              {
                icon: FaLinkedin,
                link: "https://www.linkedin.com/in/hashfor-seo-2888a83a0/",
              },
              { icon: RiTwitterXFill, link: "https://x.com/hashfor38" },
              // { icon: FaRedditAlien, link: "https://reddit.com/user/yourusername" },
            ].map(({ icon: Icon, link }, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Icon className="text-2xl" />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 mt-6 text-center md:text-left font-inter">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Link
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Terms & Conditions | Privacy Policy
            </Link>
            <Link
              href="https://www.bawdicsoft.com/"
              target="blank"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              © 2025 BawdicSoft. All rights reserved.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
