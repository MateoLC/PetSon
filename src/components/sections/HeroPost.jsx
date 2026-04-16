import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCompanion } from '../../context/CompanionContext';
import { Link } from 'react-router-dom';
import '../../styles/sections.css';

gsap.registerPlugin(ScrollTrigger);

const HeroPost = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.hero-fade', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo('.underline-path', 
        { strokeDasharray: 300, strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToHelp = (e) => {
    e.preventDefault();
    const el = document.getElementById('ayudar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section-hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title hero-fade">
          Rescatamos, esterilizamos y damos una 
          <span className="highlight-wrapper">
             {' '}segunda oportunidad.
            <svg className="underline-svg" viewBox="0 0 300 20" preserveAspectRatio="none">
              <path className="underline-path" d="M5,15 Q150,5 295,15" fill="none" stroke="var(--petson-blue)" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="hero-subtitle hero-fade">
          Somos la Fundación PetSon. Trabajamos por las mascotas de las veredas colombianas, 
          porque para nosotros son <strong>ángeles de cuatro paticas</strong> que merecen amor, respeto y una familia.
        </p>
        <div className="hero-actions hero-fade">
          <Link to="/adopciones" className="btn-primary">Quiero adoptar</Link>
          <button onClick={handleScrollToHelp} className="btn-secondary">Hacer una donación</button>
        </div>
      </div>
      <div className="hero-image-wrapper hero-fade">
        <img src="/assets/img/logoPetson2.png" alt="Logo PetSon Principal" className="hero-logo-float" />
      </div>
    </section>
  );
};

export default HeroPost;
