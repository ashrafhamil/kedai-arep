// components/FirstSection.js
import React from 'react';
import { Inter } from 'next/font/google';
import { Button } from '@nextui-org/react';
import BlackHole from '../blackHole';

const inter = Inter({ subsets: ['latin'] });

const FirstSection = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center h-screen bg-black">
      <BlackHole />
      <div className="relative z-10 flex flex-col items-center text-center pt-36 pb-10 text-white">
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
