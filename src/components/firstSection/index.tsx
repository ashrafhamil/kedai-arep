// components/FirstSection.js
import React from 'react';
import { Inter } from 'next/font/google';
import { Button } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

const FirstSection = () => {
  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{
        backgroundImage: `
          radial-gradient(circle at top, #000 35%, #3b0073 45%, #000 75%)
        `
      }}
    >
      <div className="flex flex-col items-center text-center pt-36 pb-10 text-white">
      <p className="text-8xl font-extrabold pb-4 glowing-text">BUAT SAMPE JADI</p>
        <p className="text-sm font-light text-center pb-10 opacity-30">Tak jadi, kami lari</p>
        <Button className='custom-button'>
          Book!
        </Button>
      </div>
    </div>
  );

};

export default FirstSection;
