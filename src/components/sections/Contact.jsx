import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Share2, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(q('.contact-content'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section-standard" ref={sectionRef} style={{ background: 'var(--petson-sky)' }}>
      <div className="contact-content" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="section-title">Contáctanos</h2>
        <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>¿Tienes alguna pregunta o quieres sumarte a la causa? Escríbenos directamente a nuestras líneas de atención.</p>
        
        <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--petson-blue-deep)' }}>
            <MapPin className="info-icon" style={{ opacity: 0.7 }} />
            <span>Medellín, Antioquia, Colombia</span>
          </div>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--petson-blue-deep)' }}>
            <Mail className="info-icon" style={{ opacity: 0.7 }} />
            <span>hola@fundacionpetson.org</span>
          </div>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--petson-blue-deep)' }}>
            <Phone className="info-icon" style={{ opacity: 0.7 }} />
            <span>+57 300 000 0000</span>
          </div>
        </div>

        <div className="social-links" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="https://www.facebook.com/FundacionPetSon/" target="_blank" rel="noreferrer" aria-label="Facebook" className="btn-primary" style={{ padding: '1rem', borderRadius: '50%', display: 'flex' }}>
            <Share2 />
          </a>
          <a href="https://www.instagram.com/petsonmde/" target="_blank" rel="noreferrer" aria-label="Instagram" className="btn-primary" style={{ padding: '1rem', borderRadius: '50%', display: 'flex' }}>
            <Camera />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
