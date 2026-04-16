import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCompanion } from '../../context/CompanionContext';
import { RefreshCcw } from 'lucide-react';
import './dock.css';

gsap.registerPlugin(ScrollTrigger);

const dockMessages = {
  impact: { luna: "¡Somos +3.000 historias! 🐾", milo: "Cada número es una vida." },
  projects: { // Esterilizaciones / Come Firulais en proyectos
    luna: "¡Gracias por cuidarnos! Nadie debería tener hambre.",
    milo: "Así protegemos a las madres y la calle también es nuestro hogar."
  },
  adopciones: { luna: "¿Y si tu compañero real te está esperando?", milo: "Un clic puede cambiarlo todo." },
  contact: { luna: "¡Escríbeles, son geniales!", milo: "El primer paso es decir hola." }
};

const CompanionDock = () => {
  const { companion, selectCompanion } = useCompanion();
  const dockRef = useRef(null);
  const bubbleRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    if (!companion) return;

    // Entry animation
    gsap.fromTo(dockRef.current, 
      { y: 100, scale: 0.5, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.5)' }
    );

    // Idle animation
    const idleTween = gsap.to(dockRef.current, {
      scale: 1.04,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: 'sine.inOut'
    });

    // ScrollTriggers for sections
    const triggers = [];
    Object.keys(dockMessages).forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (el) {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            onEnter: () => showMessage(dockMessages[sectionId][companion]),
            onEnterBack: () => showMessage(dockMessages[sectionId][companion])
          })
        );
      }
    });

    return () => {
      idleTween.kill();
      triggers.forEach(t => t.kill());
    };
  }, [companion]);

  const showMessage = (msg) => {
    if (!msg) return;
    setCurrentMessage(msg);
    setBubbleVisible(true);
    
    // Clear previous hiding timers
    gsap.killTweensOf(bubbleRef.current);
    
    gsap.fromTo(bubbleRef.current, 
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
    );

    // Hide after 3 seconds
    gsap.to(bubbleRef.current, {
      opacity: 0,
      y: 10,
      scale: 0.9,
      duration: 0.3,
      delay: 3,
      onComplete: () => setBubbleVisible(false)
    });
  };

  const handleHover = () => {
    gsap.to(dockRef.current, { scale: 1.1, duration: 0.3 });
    if (!bubbleVisible) {
      showMessage(companion === 'luna' ? "¡Guau! ¿Seguimos explorando?" : "Miau... estoy contigo.");
    }
  };

  const handleLeave = () => {
    gsap.to(dockRef.current, { scale: 1, duration: 0.3 });
  };

  const handleClick = () => {
    gsap.fromTo(dockRef.current, 
      { scale: 1.2 }, 
      { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
    );
  };

  const handleChangeCompanion = () => {
    gsap.to(dockRef.current, {
      y: 100,
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        selectCompanion(null);
      }
    });
  };

  if (!companion) return null;

  return (
    <div className="companion-dock-wrapper" style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 50 }}>
      
      {currentMessage && (
        <div 
          ref={bubbleRef} 
          className="dock-bubble" 
          style={{ visibility: bubbleVisible ? 'visible' : 'hidden' }}
          aria-live="polite"
        >
          {currentMessage}
        </div>
      )}

      <div className="dock-container">
        <div 
          className={`dock-avatar is-${companion}`}
          ref={dockRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleClick}
        >
          <img 
            src={`https://placehold.co/80x80/${companion === 'luna' ? '1E85E8' : '0F5FB8'}/FFFFFF?text=${companion}`} 
            alt={companion} 
          />
        </div>
        
        <div className="dock-controls">
          <div className="dock-badge">{companion.charAt(0).toUpperCase() + companion.slice(1)}</div>
          <button className="dock-change-btn" onClick={handleChangeCompanion} aria-label="Cambiar compañero">
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanionDock;
