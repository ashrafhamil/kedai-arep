// components/Header.js
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [overHero, setOverHero] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  // The hero is a full-screen black section; past it the page is white, so the clear header needs dark text.
  useEffect(() => {
    const update = () => setOverHero(window.scrollY < window.innerHeight - 64);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header className={`fixed top-0 z-40 w-full p-4 transition-colors duration-300 ${overHero ? 'text-white' : 'text-gray-900'} ${inter.className}`}>
      {/* Glass layer is a sibling of the drawer: backdrop-filter on an ancestor would trap the fixed drawer. */}
      <div className={`absolute inset-0 -z-10 backdrop-blur-md border-b transition-colors duration-300 ${overHero ? 'bg-white/5 border-white/10' : 'bg-white/60 border-black/5'}`} />
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Arep&apos;s Holding</h1>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
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
            <li><a href="#home" onClick={toggleMenu} className="hover:underline">Home</a></li>
            <li><a href="#about" onClick={toggleMenu} className="hover:underline">About</a></li>
            <li><a href="#services" onClick={toggleMenu} className="hover:underline">Services</a></li>
            <li><a href="#contact" onClick={toggleMenu} className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
