import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Volume2, VolumeX } from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { ANIM } from '../../config/animation';
import { ParticleBackground } from './ParticleBackground';

import rawLogo from '../../assets/logo-petson.svg?raw';

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

    // Tagline text splitting (Fraunces italic)
    const taglineText = new SplitType('.intro-tagline', { types: 'words', tagName: 'span' });
    
    tl.set('#part-1, #part-2, #part-3, #part-4 path, #part-5', { opacity: 0 });
    tl.set('.intro-tagline .word', { opacity: 0, y: 10 });
    tl.set('.intro-cta-wrapper', { opacity: 0, scale: 0.9 });
    
    // Setup initial states
    tl.set('#part-1', { x: -100, y: -50, rotation: -15 });
    tl.set('#part-2', { scale: 0.6, transformOrigin: 'center center' });
    tl.set('#part-3', { y: 40 });
    tl.set('#part-4 path', { y: 20, scale: 0.8, transformOrigin: 'bottom center' });
    tl.set('#part-5', { scaleX: 0.9, transformOrigin: 'left center' });

    // Begin Animation Sequence
    const durationM = prefersReducedMotion ? 0.0 : 1;

    // Frame 1 (1.0s): Cigüeña entra
    tl.to('#part-1', {
      x: 0, y: 0, rotation: 0,
      opacity: 1,
      duration: 0.9 * durationM,
      ease: ANIM.ease.smooth
    }, 'start+=1.0');

    // Frame 2 (1.0 - 1.6): Bultito
    tl.to('#part-2', {
      scale: 1,
      opacity: 1,
      duration: 0.6 * durationM,
      ease: ANIM.ease.bounce,
      onComplete: () => {
        if (!prefersReducedMotion) {
          gsap.to('#part-2', {
            rotation: 3,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            ease: 'sine.inOut'
          });
        }
      }
    }, 'start+=1.3');

    // Idle Ciguena (alas) - we can't easily animate wings without IDs, so we'll just float the whole bird slightly
    if (!prefersReducedMotion) {
      gsap.to('#part-1', { y: -3, rotation: 2, yoyo: true, repeat: -1, duration: 2, ease: 'sine.inOut', delay: 2 });
    }

    // Frame 3 (1.5 - 2.1): Gato
    tl.to('#part-3', {
      y: 0,
      opacity: 1,
      duration: 0.6 * durationM,
      ease: 'power2.out'
    }, 'start+=1.5');

    // Frame 4 (2.0 - 2.8): PetSon text
    tl.to('#part-4 path', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8 * durationM,
      stagger: ANIM.stagger.tight * durationM,
      ease: ANIM.ease.elastic
    }, 'start+=2.0');

    // Frame 5 (2.7 - 3.2): Fundacion text
    tl.to('#part-5', {
      scaleX: 1,
      opacity: 1,
      duration: 0.5 * durationM,
      ease: 'power2.out'
    }, 'start+=2.7');

    // Frame 6: Tagline
    tl.to('.intro-tagline .word', {
      y: 0,
      opacity: 1,
      duration: 0.6 * durationM,
      stagger: ANIM.stagger.normal * durationM,
      ease: 'back.out(1.2)'
    }, 'start+=3.3');

    // Frame 7: CTA
    tl.to('.intro-cta-wrapper', {
      opacity: 1,
      scale: 1,
      duration: 0.8 * durationM,
      ease: 'back.out(1.5)'
    }, 'start+=4.0');

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
          <div className="svg-container" dangerouslySetInnerHTML={{ __html: rawLogo }} />
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
