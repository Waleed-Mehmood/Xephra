import { React, useRef } from "react";
import Navbar from "../components/HomePageComponents/Navbar";
import Herosection from "../components/HomePageComponents/Herosection";
import GamesCards from "../components/HomePageComponents/GamesCards";
import Tournaments from "../components/HomePageComponents/Tournaments";
import Prices from "../components/HomePageComponents/Prices";

export default function Home() {
  const homeRef = useRef(null);
  const gameRef = useRef(null);
  const tournamentsRef = useRef(null);
  const priceRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <Navbar
        scrollToSection={scrollToSection}
        refs={{
          homeRef,
          gameRef,
          tournamentsRef,
          priceRef,
        }}
      />
      <div ref={homeRef}>
        <Herosection />
      </div>
      <div ref={gameRef}>
        <GamesCards />
      </div>
      <div ref={tournamentsRef}>
        <Tournaments />
      </div>
      <div ref={priceRef}>
        <Prices />
      </div>
    </>
  );
}
