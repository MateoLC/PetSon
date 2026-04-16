import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const textSplit = new SplitType('.about-text p', { types: 'lines' });
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(textSplit.lines, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
        gsap.fromTo('.about-gallery',
          { x: 50, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
      }
    });

    return () => {
      trigger.kill();
      textSplit.revert();
    };
  }, []);

  return (
    <section id="nosotros" className="section-standard about-section" ref={sectionRef}>
      <div className="about-content">
        <div className="about-text fade-up">
          <h2 className="section-title">¿Quiénes somos?</h2>
          <p>
            PetSon es una fundación sin ánimo de lucro formada por un grupo de jóvenes emprendedores e innovadores que nos preocupamos por el bienestar de las mascotas, los animales y todos los seres sintientes de nuestro planeta.
          </p>
          <p>
            Nacimos para mitigar una problemática real y creciente en las veredas colombianas: el alto índice de mortalidad de cachorros, el abandono y la reproducción descontrolada. Cada rescate es una vida salvada, cada esterilización es un futuro sin sufrimiento.
          </p>
        </div>
        
        <div className="about-gallery fade-up">
          <img src="/assets/img/1.png" alt="Equipo PetSon principal" className="gallery-img img-main" />
          <img src="/assets/img/2.png" alt="Equipo PetSon equipo" className="gallery-img img-accent" />
          <div className="gallery-decoration"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
