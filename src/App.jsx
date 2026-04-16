import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Adopciones from './pages/Adopciones';
import CompanionDock from './components/CompanionDock/CompanionDock';
import WhatsAppFloat from './components/WhatsAppFloat';

import { useCompanion } from './context/CompanionContext';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis Smooth Scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopciones" element={<Adopciones />} />
      </Routes>
      <CompanionDock />
      <WhatsAppFloat />
    </>
  );
}

export default App;
