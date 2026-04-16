import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Camera } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-col brand">
          <img src="/assets/img/logoPetson2.png" alt="PetSon Logo" style={{ height: '80px', objectFit: 'contain', marginBottom: '1.5rem' }} />
          <p>Rescatamos, esterilizamos y damos una segunda oportunidad a los ángeles de cuatro paticas.</p>
        </div>
        <div className="footer-col links">
          <h4>Enlaces Rápidos</h4>
          <a href="/#nosotros">Nosotros</a>
          <a href="/#projects">Proyectos</a>
          <Link to="/adopciones">Adopciones</Link>
          <a href="/#ayudar">Cómo ayudar</a>
          <a href="/#contact">Contacto</a>
        </div>
        <div className="footer-col social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/FundacionPetSon/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Share2 size={24} />
            </a>
            <a href="https://www.instagram.com/petsonmde/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Camera size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fundación PetSon. Todos los derechos reservados.</p>
        <p className="made-with">Medellín, Colombia. Hecho con <span className="heart pulse">💙</span> para nuestras mascotas.</p>
      </div>
    </footer>
  );
};

export default Footer;
