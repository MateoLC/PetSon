import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <nav className="header-nav" style={{ width: '100%', justifyContent: 'center' }}>
          <a href="/#nosotros">Nosotros</a>
          <a href="/#projects">Proyectos</a>
          <Link to="/adopciones">Adopciones</Link>
          <a href="/#ayudar">Cómo ayudar</a>
          <a href="/#contact" className="btn-primary-small">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
