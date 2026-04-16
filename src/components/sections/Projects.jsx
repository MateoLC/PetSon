import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartHandshake, Syringe, Dog, Utensils, Users, Trees, Share2, GraduationCap, Leaf, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  { img: "4.png", icon: HeartHandshake, title: "Rescate de mascotas", desc: "Rescatamos cachorros en veredas colombianas donde el índice de mortalidad es más alto. Más de 3.000 vidas salvadas." },
  { img: "6.png", icon: Syringe, title: "Esterilizaciones gratuitas", desc: "Esterilizamos madres rescatadas. 350 operadas, 160 en una sola jornada en Sopetrán, Antioquia." },
  { img: "7.png", icon: Dog, title: "Adopciones", desc: "Conectamos a cada mascota rescatada con una familia responsable. Cada 1.000 rescates entregamos un cachorro de raza: todos somos iguales." },
  { img: "10.png", icon: Utensils, title: "Come Firulais", desc: "Una vez por semana recorremos Medellín alimentando e hidratando mascotas en condición de calle." },
  { img: "13.png", icon: Users, title: "Red de Rescatistas", desc: "Red de aliados en veredas que reportan casos y transportan alimentos, con apoyo económico de la fundación." },
  { img: "11.png", icon: Trees, title: "Eco Parque y Santuario", desc: "Albergue con capacidad para 150 mascotas, centro de esterilizaciones y zona para fauna silvestre, exótica y doméstica." },
  { img: "12.png", icon: Share2, title: "Apoyo a otras fundaciones", desc: "Cada mes visitamos y apoyamos con donaciones y difusión a fundaciones, albergues y personas naturales." },
  { img: "9.png", icon: GraduationCap, title: "Proyectos educativos", desc: "Programas de educación socio-animalista en instituciones educativas con enfoque humanista y artístico." },
  { img: "15.png", icon: Leaf, title: "PetSon Eco", desc: "Protegemos nacimientos de agua y promovemos el cuidado del planeta. La tierra es un ser vivo." },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(q('.project-card'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-standard bg-noise" ref={sectionRef} style={{ background: 'var(--petson-white)' }}>
      <h2 className="section-title">Nuestros proyectos</h2>
      <p className="section-subtitle">Nueve frentes de acción por el bienestar animal y ambiental.</p>
      
      <div className="projects-grid">
        {projectData.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <div className="project-card" key={idx}>
              <div className="project-image-wrapper">
                <img src={`/assets/img/${proj.img}`} alt={proj.title} className="project-image" />
                <div className="project-icon-float">
                  <Icon size={24} />
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
