import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/adopciones.css';

gsap.registerPlugin(ScrollTrigger);

const mockPets = [
  { id: "luna-01", nombre: "Luna", especie: "perro", edad: "2 años", genero: "hembra", tamaño: "mediano", descripcion: "Juguetona y cariñosa, lista para correr en el parque.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Luna", disponible: true },
  { id: "tom-02", nombre: "Tom", especie: "gato", edad: "1 año", genero: "macho", tamaño: "pequeño", descripcion: "Curioso y tranquilo, adora las tardes soleadas.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Tom", disponible: true },
  { id: "max-03", nombre: "Max", especie: "perro", edad: "4 años", genero: "macho", tamaño: "grande", descripcion: "Protector y leal, el mejor compañero de aventuras.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Max", disponible: true },
  { id: "mia-04", nombre: "Mía", especie: "gato", edad: "6 meses", genero: "hembra", tamaño: "pequeño", descripcion: "Pequeña traviesa, le encanta jugar con pelotas.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Mia", disponible: true },
  { id: "rocky-05", nombre: "Rocky", especie: "perro", edad: "3 años", genero: "macho", tamaño: "mediano", descripcion: "Alegre y lleno de energía, ideal para familias activas.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Rocky", disponible: true },
  { id: "coco-06", nombre: "Coco", especie: "gato", edad: "2 años", genero: "hembra", tamaño: "mediano", descripcion: "Dulce y dormilona, perfecta para tardes de series.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Coco", disponible: true },
  { id: "toby-07", nombre: "Toby", especie: "perro", edad: "1 año", genero: "macho", tamaño: "pequeño", descripcion: "Pequeño gran valiente, siempre dispuesto a recibir abrazos.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Toby", disponible: true },
  { id: "nina-08", nombre: "Nina", especie: "gato", edad: "3 años", genero: "hembra", tamaño: "pequeño", descripcion: "Independiente pero muy cariñosa cuando toma confianza.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Nina", disponible: true },
  { id: "simon-09", nombre: "Simón", especie: "perro", edad: "5 años", genero: "macho", tamaño: "grande", descripcion: "Un gigante gentil, paciente y muy amoroso con niños.", foto: "https://placehold.co/400x400/1E85E8/FFFFFF?text=Simon", disponible: true }
];

const Adopciones = () => {
  const [filter, setFilter] = useState('todos');

  const filteredPets = mockPets.filter(pet => {
    if (filter === 'todos') return true;
    return pet.especie === filter;
  });

  useEffect(() => {
    // Reveal animation
    gsap.fromTo('.pet-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.adopciones-grid',
          start: 'top 85%'
        }
      }
    );
  }, [filter]);

  return (
    <>
      <Header />
      <main className="adopciones-page">
        <section className="adopciones-hero">
          <h1>Adopta un ángel de cuatro paticas</h1>
          <p>Conoce a los peluditos que están esperando una familia.</p>
        </section>

        <section className="adopciones-content">
          <div className="filters-wrapper">
            <button className={`chip ${filter === 'todos' ? 'active' : ''}`} onClick={() => setFilter('todos')}>Todos</button>
            <button className={`chip ${filter === 'perro' ? 'active' : ''}`} onClick={() => setFilter('perro')}>Perros</button>
            <button className={`chip ${filter === 'gato' ? 'active' : ''}`} onClick={() => setFilter('gato')}>Gatos</button>
          </div>

          <div className="adopciones-grid">
            {filteredPets.map(pet => (
              <div className="pet-card" key={pet.id}>
                <div className="pet-img-wrapper">
                  <img src={pet.foto} alt={pet.nombre} />
                </div>
                <div className="pet-info">
                  <h2>{pet.nombre}</h2>
                  <div className="pet-badges">
                    <span className="badge">{pet.edad}</span>
                    <span className="badge">{pet.genero}</span>
                    <span className="badge">{pet.tamaño}</span>
                  </div>
                  <p>{pet.descripcion}</p>
                  <button className="btn-primary card-btn">Quiero conocer{pet.genero==='hembra' ? 'la' : 'lo'}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="adopciones-cta">
          <h2>¿No encuentras a tu compañero?</h2>
          <p>Escríbenos y te ayudamos a encontrar el match perfecto.</p>
          <a href="/#contact" className="btn-secondary">Contáctanos</a>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Adopciones;
