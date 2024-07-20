// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-violet-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 pr-10">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              We are a team dedicated to providing the best services for our clients.
              Our goal is to deliver exceptional quality and exceed expectations.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400">
                <FaFacebookF />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <FaTwitter />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                <FaInstagram />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Arep Encem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
