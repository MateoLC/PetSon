import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Volume2, VolumeX } from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { ANIM } from '../../config/animation';
import { ParticleBackground } from './ParticleBackground';

import './intro.css';

const Intro = () => {
  const { markIntroSeen, audioEnabled, toggleAudio } = useCompanion();
  const introRef = useRef(null);
  const canvasRef = useRef(null);
  const tlRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Optional ThreeJS Background
    let particles = null;
    if (!prefersReducedMotion && canvasRef.current) {
      particles = new ParticleBackground(canvasRef.current);
    }

    // GSAP Timeline setup
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Loading counter animation (mock)
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(progressObj.val))
    });

    const taglineText = new SplitType('.intro-tagline', { types: 'words', tagName: 'span' });
    
    tl.set('.intro-logo-image', { opacity: 0, scale: 0.9, y: 30 });
    tl.set('.intro-tagline .word', { opacity: 0, y: 20 });
    tl.set('.intro-cta-wrapper', { opacity: 0, y: 20 });

    const durationM = prefersReducedMotion ? 0.0 : 1;

    tl.to('.intro-logo-image', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2 * durationM,
      ease: 'power3.out'
    }, 'start+=0.5');

    if (!prefersReducedMotion) {
      gsap.to('.intro-logo-image', {
        y: -12,
        yoyo: true,
        repeat: -1,
        duration: 3,
        ease: 'sine.inOut',
        delay: 1.5
      });
    }

    tl.to('.intro-tagline .word', {
      y: 0,
      opacity: 1,
      duration: 0.8 * durationM,
      stagger: ANIM.stagger.normal * durationM,
      ease: 'back.out(1.2)'
    }, 'start+=1.2');

    tl.to('.intro-cta-wrapper', {
      opacity: 1,
      y: 0,
      duration: 0.8 * durationM,
      ease: 'power2.out'
    }, 'start+=2.0');

    return () => {
      tl.kill();
      if (particles) particles.destroy();
      taglineText.revert();
    };
  }, []);

  const handleStart = () => {
    // Salida animada
    if (tlRef.current) tlRef.current.kill();
    
    gsap.to(introRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        markIntroSeen();
      }
    });
  };

  return (
    <div className="intro-container bg-noise" ref={introRef}>
      <canvas ref={canvasRef} className="intro-canvas" />
      
      <div className="intro-audio-toggle">
        <button onClick={toggleAudio} aria-label={audioEnabled ? "Silenciar" : "Activar sonido"}>
          {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          <span>{audioEnabled ? 'Silenciar' : 'Activar sonido'}</span>
        </button>
      </div>

      <div className="intro-content">
        <div className="intro-logo-wrapper">
          <img src="/assets/img/logoPetson2.png" alt="PetSon Logo" className="intro-logo-image" />
        </div>

        <h1 className="intro-tagline">
          Cada vida merece un hogar.<br/>Cada historia, un comienzo.
        </h1>

        <div className="intro-cta-wrapper">
          <button className="btn-primary" onClick={handleStart}>
            Comienza tu recorrido
            <span className="arrow">→</span>
          </button>
          <button className="btn-link skip-link" onClick={handleStart}>
            Saltar introducción →
          </button>
        </div>
      </div>

      <div className="intro-loading">
        Cargando la experiencia {progress}%
      </div>
    </div>
  );
};

export default Intro;
