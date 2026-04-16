# PetSon Fundación 🐾

Proyecto interactivo y dinámico para PetSon Fundación. Una experiencia web con transiciones fluidas, GSAP ScrollTrigger y una identidad visual cálida de tono azul y crema.

## Requerimientos

- Node.js (v18+)
- npm o pnpm

## Instalación

1. Clona el repositorio e instala las dependencias:
```bash
npm install
```

2. Corre el servidor de desarrollo local:
```bash
npm run dev
```

3. Visita \`http://localhost:5173\` en tu navegador.

## Scripts

- \`npm run dev\`: Inicia servidor local de desarrollo.
- \`npm run build\`: Empaqueta para producción (dist).
- \`npm run lint\`: Verifica estilo de código.
- \`npm run preview\`: Sirve proyecto de producción de forma local.

## Características

- **Selector de Compañero**: Elige a Milo o a Luna, quienes te acompañarán como dock interactivo durante el scroll por la página principal.
- **Micro-interacciones Fluidas**: Animaciones vía **GSAP 3** e integraciones Lottie.
- **Scroll Suave**: Implementado con `@studio-freight/lenis` dando un toque cinemático y control del frame-rate.
- **Responsive**: Totalmente adaptado de móvil a escritorio.
- **Accesibilidad**: Respeta las normativas de \`prefers-reduced-motion\` desactivando partículas y efectos 3D cuando el usuario lo exige en su S.O.
- **SEO Optimizado**: Etiquetas JSON-LD instaladas en el index estático.

## Estructura

El código se encuentra en \`/src\`:
- \`/components\`: Secciones individuales \`/sections/...\`, el \`/Intro/\` y \`/Selector/\`. 
- \`/context\`: Estado global (\`CompanionContext\`).
- \`/styles\`: CSS modular importado en \`global.css\`.
- \`/pages\`: \`Home.jsx\`, \`Adopciones.jsx\`.

¡Hecho con 💙 para nuestras mascotas!
