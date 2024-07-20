// components/Header.js
import React from 'react';
import { Inter } from 'next/font/google';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
  return (
    <header className={`w-full p-4 bg-gradient-to-r from-violet-800 to-indigo-950 text-white ${inter.className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Arep&apos;s Holding</h1>
        <nav>
          <ul className="flex space-x-4">
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
