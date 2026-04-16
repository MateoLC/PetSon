import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartHandshake, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(q('.mv-image-wrapper'),
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
          gsap.fromTo(q('.mv-card'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
            "-=0.5"
          );
          gsap.fromTo(q('.mv-icon'),
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)', delay: 0.4 }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="mision-vision" className="section-standard mv-section" ref={sectionRef}>
      <div className="mv-container">
        <div className="mv-image-wrapper">
          <img src="/assets/img/3.png" alt="PetSon Mission" className="mv-image" />
        </div>
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon-wrapper">
              <HeartHandshake size={32} className="mv-icon" />
            </div>
            <div className="mv-text-content">
              <h3 className="mv-title">Misión</h3>
              <p className="mv-desc">
                Velar, vigilar y proteger a todas las mascotas de Medellín, Colombia y Latinoamérica, realizando actividades de rescate, esterilización y adopción. Dar a conocer las injusticias y el maltrato animal, y crear conciencia sobre el amor, la comprensión y el respeto por todas las especies.
              </p>
            </div>
          </div>
          
          <div className="mv-card">
            <div className="mv-icon-wrapper">
              <Globe size={32} className="mv-icon" />
            </div>
            <div className="mv-text-content">
              <h3 className="mv-title">Visión</h3>
              <p className="mv-desc">
                Ser la primera fundación con cobertura latinoamericana en el rescate y cuidado de mascotas en condiciones extremas, abriendo sedes en los países más afectados por la problemática del abandono y maltrato animal, y promoviendo una cultura socio-animalista basada en el respeto y la ley.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
