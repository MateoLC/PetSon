import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Coins, UsersRound, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HowToHelp = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(q('.help-card'),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ayudar" className="section-standard" ref={sectionRef} style={{ background: 'var(--petson-cream)' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 className="section-title">¿Cómo puedes ayudar?</h2>
        <p className="section-subtitle">Hay muchas formas de transformar una vida.</p>
      </div>

      <div className="help-grid">
        <div className="help-card">
          <Heart className="help-icon" size={40} />
          <h3>Adopta</h3>
          <p>Dale un hogar a un ángel de cuatro paticas.</p>
          <Link to="/adopciones" className="btn-primary">Ver mascotas</Link>
        </div>
        
        <div className="help-card">
          <Coins className="help-icon" size={40} />
          <h3>Dona</h3>
          <p>Tu aporte, grande o pequeño, salva vidas.</p>
          <button className="btn-secondary">Hacer una donación</button>
        </div>
        
        <div className="help-card">
          <UsersRound className="help-icon" size={40} />
          <h3>Sé voluntario o rescatista</h3>
          <p>Únete a nuestra red en veredas y zonas rurales.</p>
          <a href="#contact" className="btn-primary">Quiero unirme</a>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;
