import React from "react";
import HeroSection from "./elements/HeroSection";
import Navbar from "./elements/Navbar";
import Videoplayer from "./elements/Videoplayer";
import Footer from "./elements/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Videoplayer />
      <Footer />
    </>
  );
}

export default Home;
