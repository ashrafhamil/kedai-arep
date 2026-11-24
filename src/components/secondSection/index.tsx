import React from "react";
import { Image } from '@nextui-org/react';

const SecondSection = () => {
    return (
        <div className="container mx-auto text-black flex flex-col md:flex-row">
            <div className="md:basis-1/2 text-justify md:pr-20 pb-10 md:pb-0">
                <h1 className="text-4xl">About Arep</h1>
                <br />
                <p>My name is Arep Encem and I am a personal coach. My goal is to assist people identify and overcome obstacles in their lives and to maximize their potential. Through my coaching, I help people set goals, build the confidence and skills they need to achieve success and develop a positive mindset and a sense of self-worth.
                </p>
                <br />
                <p>
                    As Arep himself once said: “Ha ha hu ha hu.” “Cepatlah aku nak kena duel dah ni.” “Dah janji dah, sharp pukul 11 aku tenong.” “Cepat, masa saya tak lama.” “Mari... sebelum saya kena duel.” Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be. If we do our best, we are a success.
                </p>
            </div>
            <div className="md:basis-1/2 text-center flex items-center">
                <Image
                    isZoomed
                    width="100%"
                    height="100%"
                    alt="Enigma"
                    src="/enigma.jpg"
                />
            </div>
        </div>
    )
}

export default SecondSection;
