import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import lottie from 'lottie-web';
import { useCompanion } from '../../context/CompanionContext';
import './selector.css';

const CompanionCard = ({ id, name, title, description, accentColor, imagePath, onSelect, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Fade in from bottom
    gsap.fromTo(cardRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay }
    );

    // 3D Tilt Effect
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
        duration: 0.8
      });
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay]);

  return (
    <div 
      className={`companion-card companion-${id}`} 
      ref={cardRef}
      style={{ '--accent': accentColor }}
      onClick={() => onSelect(id, cardRef.current)}
      tabIndex="0"
      role="button"
      aria-label={`Elegir a ${name}, ${title}, como compañero de viaje`}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onSelect(id, cardRef.current); }}
    >
      <div className="card-bg"></div>
      <div className="card-image-wrapper">
         <img src={imagePath} alt={`Ilustración de ${name}`} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-name">{name}</h2>
        <h3 className="card-title font-accent">{title}</h3>
        <p className="card-description">{description}</p>
        <button className="btn-primary card-cta" style={{ backgroundColor: accentColor }}>
          ELEGIR A {name.toUpperCase()} <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

const Selector = () => {
  const { selectCompanion } = useCompanion();
  const containerRef = useRef(null);

  const handleSelect = (id, cardElement) => {
    // 1. Zoom in & flash selected card
    const tl = gsap.timeline();
    const otherCardClass = id === 'luna' ? '.companion-milo' : '.companion-luna';
    
    tl.to(otherCardClass, {
      opacity: 0,
      x: id === 'luna' ? 50 : -50,
      filter: 'blur(10px)',
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

    tl.to(cardElement, {
      scale: 1.15,
      duration: 0.4,
      ease: 'power2.out',
      boxShadow: `0 0 40px rgba(255,255,255,0.8)`
    }, 0);

    // 2. Confetti
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E85E8', '#BFE0FF', '#0F5FB8']
      });
    }

    // 3. Move to dock corner
    tl.to(cardElement, {
      scale: 0.2,
      x: () => -window.innerWidth / 2 + 80, // Approximate dock position
      y: () => window.innerHeight / 2 - 80,
      rotation: -10,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.inOut'
    }, '+=0.3');

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        selectCompanion(id);
      }
    }, '-=0.5');
  };

  return (
    <section className="selector-container bg-noise" ref={containerRef}>
      <header className="selector-header">
        <h1 className="selector-title">Elige tu compañero de viaje</h1>
        <p className="selector-subtitle">Te acompañará mientras exploras las historias de PetSon</p>
      </header>

      <div className="cards-wrapper">
        <CompanionCard 
          id="luna"
          name="Luna"
          title="La Perrita Valiente"
          description="&quot;Leal, juguetona y con un corazón enorme. Luna te acompañará con la energía de quien cree que cada día es una aventura.&quot;"
          accentColor="var(--petson-blue)"
          imagePath="/assets/img/luna.png"
          onSelect={handleSelect}
          delay={0.2}
        />
        <CompanionCard 
          id="milo"
          name="Milo"
          title="El Gatico Curioso"
          description="&quot;Observador, independiente y sabio. Milo te guiará con la calma de quien sabe que todo gran viaje empieza observando.&quot;"
          accentColor="var(--petson-blue-deep)"
          imagePath="/assets/img/milo.png"
          onSelect={handleSelect}
          delay={0.4}
        />
      </div>
    </section>
  );
};

export default Selector;
