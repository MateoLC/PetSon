import React from 'react';
import { useCompanion } from '../context/CompanionContext';
import Intro from '../components/Intro/Intro';
import Selector from '../components/Selector/Selector';

// Sections
import HeroPost from '../components/sections/HeroPost';
import ImpactBar from '../components/sections/ImpactBar';
import About from '../components/sections/About';
import MissionVision from '../components/sections/MissionVision';
import Projects from '../components/sections/Projects';
import HowToHelp from '../components/sections/HowToHelp';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { companion, introSeen } = useCompanion();

  // Si no ha visto el intro, mostramos el Intro
  if (!introSeen) {
    return <Intro />;
  }

  // Si ya vio el intro, pero no ha elegido compañero, mostramos el Selector
  if (!companion) {
    return <Selector />;
  }

  // Sitio completo revelado
  return (
    <>
      <Header />
      <main>
        <HeroPost />
        <ImpactBar />
        <About />
        <MissionVision />
        <Projects />
        <HowToHelp />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
