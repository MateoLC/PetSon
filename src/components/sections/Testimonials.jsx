import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(q('.testimonial-feature'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out' }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonios" className="section-standard bg-noise" ref={sectionRef} style={{ background: 'var(--petson-white)' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Historias que cambian vidas</h2>
      
      <div className="testimonial-feature">
        <div className="tf-image-wrapper">
          <img src="/assets/img/5.png" alt="Familia feliz con su mascota PetSon" className="tf-image" />
          <div className="tf-decoration"></div>
        </div>
        <div className="tf-content">
          <Quote size={60} className="tf-quote-icon" />
          <p className="tf-quote">"PetSon no solo rescató a nuestro perrito de las calles, sino que trajo una alegría inmensa a nuestra casa. El proceso de adopción fue transparente, organizado y lleno de amor. Ahora es el rey indiscutible de la familia."</p>
          <div className="tf-author">
            <div className="tf-author-info">
              <h4>Familia Pérez</h4>
              <p>Adoptantes en Medellín, Antioquia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-feature tf-reverse" style={{ marginTop: '6rem' }}>
        <div className="tf-image-wrapper">
          <img src="/assets/img/14.png" alt="Actividades de rescate PetSon" className="tf-image" />
          <div className="tf-decoration" style={{ background: 'var(--petson-blue)', left: 'auto', right: '0' }}></div>
        </div>
        <div className="tf-content">
          <Quote size={60} className="tf-quote-icon" />
          <p className="tf-quote">"Acompañarlos al campo y ver el nivel de compromiso que tienen con estos animales desamparados te transforma la vida. Se respira pura vocación. Unirse a esta causa como rescatista es lo mejor que he hecho."</p>
          <div className="tf-author">
            <div className="tf-author-info">
              <h4>Red de Rescatistas</h4>
              <p>Voluntariado en Zona Rural</p>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-feature" style={{ marginTop: '6rem' }}>
        <div className="tf-image-wrapper">
          <img src="/assets/img/8.png" alt="Jornada de atención PetSon" className="tf-image" />
          <div className="tf-decoration"></div>
        </div>
        <div className="tf-content">
          <Quote size={60} className="tf-quote-icon" />
          <p className="tf-quote">"Cada aporte que recibimos nos permite llegar a los rincones más olvidados de la ciudad. Ver cómo la comunidad se une para cambiar el destino de un cachorro o de una mascota adulta es lo que nos impulsa a seguir adelante sin detenernos."</p>
          <div className="tf-author">
            <div className="tf-author-info">
              <h4>Aliado Estratégico</h4>
              <p>Soporte de Donaciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
