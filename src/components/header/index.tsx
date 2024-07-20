// components/Header.js
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`w-full p-4 bg-gradient-to-r from-violet-800 to-indigo-950 text-white ${inter.className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Arep&apos;s Holding</h1>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-violet-800 to-indigo-950 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 left-4 p-2"
          aria-label="Close menu"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <nav className="mt-16">
          <ul className="flex flex-col space-y-4 p-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
