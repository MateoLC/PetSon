import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactBar = () => {
  const barRef = useRef(null);
  const [stats, setStats] = useState({rescues: 0, surgeries: 0, percent: 0, projects: 0});

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: barRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(stats, {
          rescues: 3000,
          surgeries: 350,
          percent: 98,
          projects: 10,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            setStats({
              rescues: Math.floor(stats.rescues),
              surgeries: Math.floor(stats.surgeries),
              percent: Math.floor(stats.percent),
              projects: Math.floor(stats.projects)
            });
          }
        });
      }
    });

    return () => trigger.kill();
  }, [stats]);

  return (
    <section id="impact" className="section-impact" ref={barRef}>
      <div className="impact-grid">
        <div className="impact-item">
          <h2 className="impact-number">+{stats.rescues.toLocaleString('es-CO')}</h2>
          <p className="impact-desc">Mascotas rescatadas y dadas en adopción</p>
        </div>
        <div className="impact-item">
          <h2 className="impact-number">{stats.surgeries}</h2>
          <p className="impact-desc">Madres esterilizadas gratuitamente</p>
        </div>
        <div className="impact-item">
          <h2 className="impact-number">{stats.percent}%</h2>
          <p className="impact-desc">De los rescates en veredas colombianas</p>
        </div>
        <div className="impact-item">
          <h2 className="impact-number">+{stats.projects}</h2>
          <p className="impact-desc">Proyectos sociales y ambientales activos</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactBar;
