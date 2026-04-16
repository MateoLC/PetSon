# PROMPT MAESTRO — ANTIGRAVITY
## Proyecto: PetSon Fundación — Landing Animada Completa

**Versión:** 2.0 (consolidada)
**Cliente:** Fundación PetSon — Medellín, Colombia
**Tipo:** Sitio web institucional con experiencia animada inmersiva

---

## 🎯 CONTEXTO DEL PROYECTO

Soy el director creativo de **PetSon Fundación**, una fundación animalista sin ánimo de lucro con sede en Medellín, Colombia. Rescatamos cachorros en veredas, esterilizamos madres, damos mascotas en adopción y protegemos seres sintientes.

Necesito construir una **landing page completa** con una experiencia animada inmersiva, inspirada conceptualmente en la RSPCA "Animal Futures" (https://www.rspca.org.uk/webContent/animalfutures/), pero con nuestra propia identidad visual cálida y enfocada en el vínculo emocional perro/gato.

**Filosofía del proyecto:**
- El sitio NO es una página web tradicional de fundación. Es una **experiencia emocional** que transforma al visitante en embajador.
- La narrativa se construye con un "compañero virtual" (perrito o gatico) que acompaña al usuario durante toda la navegación.
- Cada sección se desbloquea con animación al hacer scroll, convirtiendo la exploración en un pequeño viaje.

**Alcance de este sprint:** Sitio completo (landing one-page con scroll narrativo + subpágina de adopciones), 100% responsive, con animaciones en 60fps.

---

## 🎬 FLUJO DE LA EXPERIENCIA COMPLETA

```
┌───────────────────────────────────────────────────────────────┐
│ FASE 1: INTRO ANIMADO (4.5–6s)                                │
│ Logo se arma pieza por pieza → tagline emotivo → CTA          │
└───────────────────────────────────────────────────────────────┘
                              ↓ Click "Comienza tu recorrido"
┌───────────────────────────────────────────────────────────────┐
│ FASE 2: SELECTOR DE COMPAÑERO                                 │
│ Luna (perra) ⚡ Milo (gato) — usuario elige uno              │
└───────────────────────────────────────────────────────────────┘
                              ↓ Compañero elegido vuela al dock
┌───────────────────────────────────────────────────────────────┐
│ FASE 3: SCROLL NARRATIVO (con Companion Dock fijo)            │
│ Hero post-selector → Impacto → Nosotros → Misión/Visión       │
│ → Proyectos → Cómo Ayudar → Testimonios → Contacto → Footer   │
│ El Companion Dock muestra burbujas contextuales al hacer      │
│ scroll por secciones clave.                                   │
└───────────────────────────────────────────────────────────────┘
                              ↓ Link "Ver mascotas en adopción"
┌───────────────────────────────────────────────────────────────┐
│ FASE 4: PÁGINA /adopciones                                    │
│ Grid filtrable de mascotas disponibles + formulario interés   │
└───────────────────────────────────────────────────────────────┘
```

---

## 🖼️ ASSETS

Ya están en el workspace:

```
./logoPetson.png   ← Logo principal (NO sobrescribir)
```

**Descripción del logo:** Cigüeña en vuelo cargando un bultito con un cachorro, junto a un gato sentado, con el texto "PetSon Fundación" — azul vibrante sobre fondo blanco.

**IMPORTANTE:** El logo es el protagonista del intro. Debe ser **vectorizado a SVG** con capas separadas (cigüeña, alas, bultito, cachorro, gato, texto "PetSon", texto "FUNDACIÓN") para poder animarlo pieza por pieza. Si el agente no puede automatizar la vectorización, debe **recrear el logo manualmente en SVG** respetando fielmente el original.

---

## 🎨 SISTEMA DE DISEÑO

### Paleta de color (extraída del logo, extendida con cream para calidez)

```css
:root {
  --petson-blue: #1E85E8;        /* Azul principal del logo */
  --petson-blue-deep: #0F5FB8;   /* Azul profundo para profundidad */
  --petson-blue-soft: #5BA8F0;   /* Azul intermedio para hover/degradados */
  --petson-sky: #BFE0FF;         /* Azul cielo para fondos suaves */
  --petson-cream: #FFF9F2;       /* Crema cálido (contraste orgánico) */
  --petson-ink: #0A1628;         /* Azul casi negro para texto */
  --petson-warm: #F5A623;        /* Acento cálido (solo CTAs secundarios y corazones) */
  --petson-white: #FFFFFF;
  --petson-gray: #6B7280;        /* Texto secundario */
  --petson-border: #E5E7EB;      /* Divisores */
}
```

**Uso estricto:** La paleta es monocromática azul + cream + warm de acento. **NO introducir** verdes, morados, ni gradientes con colores ajenos.

### Tipografía

- **Display (títulos, hero, CTAs):** `Fraunces` (serif expresiva editorial con carácter cálido).
- **Body (texto corrido):** `Manrope` o `Plus Jakarta Sans` (sans moderna y humana).
- **Acento decorativo (handwritten):** `Caveat` o `Kalam` para toques emotivos puntuales (ej. "con 💙 por Medellín", firma tipo manual).

**Evitar terminantemente:** Inter, Roboto, Arial, Open Sans, Poppins. Buscamos carácter editorial, NO estética "default de AI".

Importar desde Google Fonts con `font-display: swap`.

### Dirección estética

> **"Editorial cálido con toques orgánicos digitales"**

- Serif expresiva + microanimaciones juguetonas.
- Fondos con **grano sutil** (SVG noise a 4% opacidad) + **gradient mesh** suave azul→cream.
- Cero glassmorphism cliché, cero gradientes morados genéricos.
- Las ilustraciones y el logo mantienen estética **monocromática azul** consistente con la identidad.
- Mucho **whitespace** (respiración editorial).

---

## 🧰 STACK TÉCNICO

Instalar y configurar:

| Librería | Versión | Uso |
|---|---|---|
| **Vite** | ^5 | Bundler y dev server |
| **React** | ^18 | Componentes y routing (o HTML+JS vanilla si el agente lo prefiere para el intro) |
| **react-router-dom** | ^6 | Routing (/`/`, `/adopciones`) |
| **GSAP** | ^3.12 | Timeline del intro + orquestación de animaciones |
| **GSAP SplitText** | ^3.12 | Animación de texto por carácter |
| **GSAP ScrollTrigger** | ^3.12 | Animaciones al hacer scroll |
| **Lenis** | ^1.1 | Smooth scroll buttery |
| **Three.js** | ^0.160 | Partículas flotantes en fondo del intro |
| **Lottie-web** | ^5.12 | Microanimaciones (huellitas, corazones) |
| **Howler.js** | ^2.2 | Audio ambiente con toggle on/off |
| **canvas-confetti** | ^1.9 | Confeti azul al seleccionar compañero |

**Prohibido:** Bootstrap, Material UI, Chakra, Tailwind (todo el CSS es propio con variables). Framer Motion permitido como alternativa a GSAP solo si el agente lo considera mejor para algún caso puntual.

---

## 📐 ESTRUCTURA DE ARCHIVOS ESPERADA

```
/
├── index.html
├── logoPetson.png                 ← YA EXISTE, no sobrescribir
├── package.json
├── vite.config.js
├── /public/
│   ├── assets/
│   │   ├── logo-petson.svg        ← vectorización del PNG (por capas)
│   │   ├── sfx/
│   │   │   ├── woof.mp3
│   │   │   ├── meow.mp3
│   │   │   └── ambient.mp3
│   │   ├── lottie/
│   │   │   ├── paw-print.json
│   │   │   └── heart.json
│   │   └── img/
│   │       ├── hero-dog.jpg       ← placeholder
│   │       ├── equipo.jpg         ← placeholder
│   │       ├── adopciones/
│   │       │   └── *.jpg          ← placeholders
│   │       └── testimonios/
│   │           └── *.jpg          ← placeholders
├── /src/
│   ├── main.jsx (o main.js)
│   ├── App.jsx
│   ├── /pages/
│   │   ├── Home.jsx
│   │   └── Adopciones.jsx
│   ├── /components/
│   │   ├── Intro/
│   │   │   ├── Intro.jsx
│   │   │   ├── IntroTimeline.js
│   │   │   └── ParticleBackground.js  ← three.js
│   │   ├── Selector/
│   │   │   ├── Selector.jsx
│   │   │   └── CompanionCard.jsx
│   │   ├── CompanionDock/
│   │   │   ├── CompanionDock.jsx
│   │   │   └── dockMessages.js
│   │   ├── sections/
│   │   │   ├── HeroPost.jsx
│   │   │   ├── ImpactBar.jsx
│   │   │   ├── About.jsx
│   │   │   ├── MissionVision.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── HowToHelp.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── /context/
│   │   └── CompanionContext.jsx   ← estado global del compañero elegido
│   ├── /config/
│   │   └── animation.js           ← easings, durations, staggers globales
│   └── /styles/
│       ├── reset.css
│       ├── tokens.css             ← variables CSS + fuentes
│       ├── global.css
│       ├── intro.css
│       ├── selector.css
│       ├── dock.css
│       └── sections.css
└── README.md
```

---

## 🎬 FASE 1 — INTRO / LOADING ANIMATION

### Objetivo
**Momento WOW** de 4.5–6 segundos donde el logo se arma pieza por pieza con texto emotivo y cierra con CTA claro.

### Timeline detallado (GSAP)

**Frame 0 (0.0s) — Estado inicial**
- Fondo blanco con overlay de grano sutil (`background-image: url('data:image/svg+xml,...')` noise a 4% opacidad).
- Todo el logo invisible.
- Contador "Cargando la experiencia 0%" en esquina inferior derecha (font-mono, pequeño, en `--petson-gray`).
- Opcional: fondo con partículas azules flotantes muy sutiles (Three.js, 60 partículas, movimiento lento).

**Frame 1 (0.3s → 1.2s) — La cigüeña entra volando**
- La cigüeña entra desde la esquina superior izquierda con path curvo (MotionPath o translate+rotate).
- Estela de 3–5 partículas azules que la siguen y se desvanecen.
- Easing: `power3.out`.

**Frame 2 (1.0s → 1.6s) — El bultito con el cachorro aparece**
- Fade + scale (0.6 → 1) con easing `back.out(1.7)`.
- Una vez visible: loop infinito de balance ±3° rotación (3s duration, sutil).

**Frame 3 (1.5s → 2.1s) — El gato aparece sentándose**
- Slide desde abajo (`translateY(40px) → 0`) + fade.
- Blink sutil de ojos al aterrizar.
- Easing: `power2.out`.

**Frame 4 (2.0s → 2.8s) — Texto "PetSon" se escribe**
- SplitText por carácter + stagger 0.04s.
- Cada letra: `y: 20 → 0`, `opacity: 0 → 1`, `scale: 0.8 → 1`.
- Easing: `elastic.out(1, 0.5)`.

**Frame 5 (2.7s → 3.2s) — "FUNDACIÓN" aparece**
- Fade + letter-spacing animado (`0.5em → 0.2em`).

**Frame 6 (3.3s → 4.0s) — Tagline emotivo**
- SplitText por palabra con stagger:
  > *"Cada vida merece un hogar. Cada historia, un comienzo."*
- Font: `Fraunces` italic, `clamp(1.1rem, 2.5vw, 1.6rem)`.

**Frame 7 (4.0s → 4.8s) — CTA principal**
- Botón grande aparece con scale-in + subtle glow pulse:
  > **"Comienza tu recorrido"** (flecha que se desliza 6px al hover)
- Link discreto al lado: *"Saltar introducción →"* (almacena la decisión en `sessionStorage` para no repetir el intro al volver).
- Toggle de audio en esquina superior derecha: `🔊 Activar sonido` / `🔇 Silenciar`.

**Frame 8 (persistente) — Idle state**
- Cigüeña aletea sutilmente (rotación ±2° en alas, loop 2s).
- Cachorro en el bultito "respira" (scale 1.0 ↔ 1.02, loop 3s).
- Gato parpadea cada 5–7s (aleatorio).

### Interacción de salida
Click en "Comienza tu recorrido":
- El logo se reduce con `scale` y se ancla en el header superior (izquierda).
- La sección siguiente (Selector) hace fade-in desde abajo.
- Duración: 1.2s, easing `power3.inOut`.

### Comportamiento en visitas posteriores
Si `sessionStorage.getItem('introSeen') === 'true'`:
- El intro se salta automáticamente.
- El logo aparece directamente en el header.
- Se muestra el selector (si no hay compañero elegido) o el sitio completo (si ya lo hay — guardado también en localStorage).

---

## 🐶🐱 FASE 2 — SELECTOR DE COMPAÑERO

### Objetivo
El usuario elige entre **Luna (perra)** y **Milo (gato)** como compañero que lo acompañará durante toda la navegación.

### Layout

**Texto guía (top):**
- Título: *"Elige tu compañero de viaje"* — Fraunces, `clamp(2rem, 4vw, 3rem)`.
- Subtítulo: *"Te acompañará mientras exploras las historias de PetSon"* — Manrope, `clamp(1rem, 1.5vw, 1.25rem)`, color `--petson-gray`.

**Desktop (≥1024px):**
- Dos cards grandes lado a lado, centradas. ~40% ancho cada una, 20% gap.

**Tablet (768–1023px):**
- Dos cards lado a lado pero más pequeñas.

**Mobile (<768px):**
- Cards apiladas verticalmente O carrusel horizontal con `scroll-snap` + dots indicadores.

### Anatomía de cada card

```
┌─────────────────────────────────┐
│ [Gradient mesh azul + grano]    │
│                                 │
│       🐶 Ilustración SVG        │
│       (grande, centrada)        │
│                                 │
│  ─────────────────              │
│  LUNA                           │ ← nombre (Fraunces, 2rem)
│  La Perrita Valiente            │ ← subtítulo (Caveat, 1.3rem)
│                                 │
│  "Leal, valiente y llena de     │
│   energía para explorar         │
│   contigo cada rincón."         │ ← descripción (Manrope, 1rem)
│                                 │
│     [ ELEGIR A LUNA →  ]       │ ← CTA (botón primario)
└─────────────────────────────────┘
```

### Contenido específico

**Card Perro — Luna:**
- Nombre: **Luna**
- Título: *La Perrita Valiente*
- Descripción: *"Leal, juguetona y con un corazón enorme. Luna te acompañará con la energía de quien cree que cada día es una aventura."*
- Ilustración: SVG del cachorro del logo adaptado (monocromático azul).
- Color acento: `--petson-blue`.

**Card Gato — Milo:**
- Nombre: **Milo**
- Título: *El Gatico Curioso*
- Descripción: *"Observador, independiente y sabio. Milo te guiará con la calma de quien sabe que todo gran viaje empieza observando."*
- Ilustración: SVG del gato del logo adaptado.
- Color acento: `--petson-blue-deep`.

### Microinteracciones

**Hover (desktop):**
- Tilt 3D siguiendo el mouse: `perspective: 1000px; rotateX/rotateY` máximo ±8°.
- Ilustración: leve `scale: 1.05`.
- Glow del color acento en el borde (`box-shadow` animada).
- Si audio activo: reproduce `woof.mp3` o `meow.mp3` a volumen bajo (0.3).

**Hover del botón:**
- Flecha se desliza 6px a la derecha.
- Fondo invertido.

**Selección (click):**
1. Card elegida: zoom-in (`scale: 1.15`) + brillo momentáneo.
2. Después vuela al dock inferior izquierdo (shrink + translate + rotate, 1s, `power3.inOut`).
3. Card NO elegida: fade-out lateral + blur.
4. Línea de huellitas (Lottie `paw-print.json`) recorre la pantalla de izquierda a derecha como transición.
5. Confetti azul sutil (canvas-confetti, `colors: ['#1E85E8', '#BFE0FF', '#0F5FB8']`).
6. El compañero elegido se guarda en `localStorage` (`companion: 'luna' | 'milo'`).
7. Scroll desbloqueado + reveal del resto del sitio.

### Accesibilidad
- Cards navegables con Tab, Enter/Space las selecciona.
- `aria-label="Elegir a Luna, la perrita valiente, como compañero de viaje"`.
- Respetar `prefers-reduced-motion`: sustituir tilt y confetti por fades simples de 0.3s.

---

## 📌 FASE 3 — COMPANION DOCK (compañero fijo inferior)

### Objetivo
El compañero elegido acompaña al usuario **fijo en la parte inferior izquierda** durante toda la navegación, con microinteracciones contextuales.

### Especificaciones

- **Posición:** `position: fixed; bottom: 24px; left: 24px; z-index: 50;` desktop. Mobile: `bottom: 16px; left: 16px`.
- **Tamaño:** 80×80px desktop, 56×56px mobile.
- **Forma:** Círculo con borde azul (`--petson-blue`, 2px) + sombra suave.
- **Contenido:** Ilustración SVG del compañero elegido.
- **Badge de nombre:** Pequeño pill colapsable al lado ("Luna" o "Milo") con `--petson-cream` de fondo.

### Animaciones

**Entrada (después del selector):**
- `translateY(100%) → 0` + `scale(0.5) → 1`.
- Easing: `back.out(1.5)`, duration 0.8s, delay 0.3s.

**Idle:**
- Respiración sutil (`scale 1 ↔ 1.04`, loop 3s).
- Cada 10–15s: microanimación aleatoria (Luna mueve la cola, Milo parpadea lento).

**Hover:**
- Scale a 1.1.
- Aparece burbuja con mensaje:
  - Luna: *"¡Guau! ¿Seguimos explorando?"*
  - Milo: *"Miau... estoy contigo."*

**Click:**
- Bounce juguetón (scale up-down rápido) + mini Lottie de corazón sobre el dock.

**Botón de cambiar compañero (⇄):**
- Pequeño icono al lado del dock.
- Al hacer click: animación inversa + vuelve al selector.

### 💬 Mensajes contextuales por scroll

El dock muestra burbujas **dinámicas** cuando el usuario entra a secciones clave (usar ScrollTrigger + IntersectionObserver):

| Sección | Mensaje Luna | Mensaje Milo |
|---|---|---|
| Impacto | *"¡Somos +3.000 historias! 🐾"* | *"Cada número es una vida."* |
| Esterilizaciones | *"¡Gracias por cuidarnos!"* | *"Así protegemos a las madres."* |
| Come Firulais | *"Nadie debería tener hambre."* | *"La calle también es nuestro hogar."* |
| Adopciones | *"¿Y si tu compañero real te está esperando?"* | *"Un clic puede cambiarlo todo."* |
| Contacto | *"¡Escríbeles, son geniales!"* | *"El primer paso es decir hola."* |

- Las burbujas aparecen por 3 segundos y se desvanecen.
- No interrumpen la navegación.
- Respetan `prefers-reduced-motion`.

---

## 🌟 FASE 4 — SCROLL NARRATIVO

Una vez seleccionado el compañero, el resto del sitio se revela con scroll. Todas las secciones usan `ScrollTrigger` para animar entradas sutiles (fade + translateY 20px, stagger de elementos internos).

### 4.1 Hero Post-Selector

Fondo: gradient mesh azul suave (`--petson-sky` → `--petson-cream`).

**Titular:** Fraunces display, `clamp(2.5rem, 6vw, 5rem)`:
> Rescatamos, esterilizamos y damos una **segunda oportunidad**.

La palabra "segunda oportunidad" animada con underline dibujándose (SVG stroke animation).

**Subtítulo:** Manrope, `clamp(1.1rem, 2vw, 1.4rem)`:
> Somos la Fundación PetSon. Trabajamos por las mascotas de las veredas colombianas, porque para nosotros son **ángeles de cuatro paticas** que merecen amor, respeto y una familia.

**CTAs:**
- Primario: **Quiero adoptar** → `/adopciones`.
- Secundario (warm accent): **Hacer una donación** → scroll a `#ayudar`.

**Imagen lateral (o fondo):** placeholder `/assets/img/hero-dog.jpg`, con máscara circular orgánica. Overlay azul oscuro semitransparente si es fondo.

### 4.2 Barra de Impacto

Sección horizontal sticky de 1 viewport height si se quiere, o banda de 40vh.

Fondo: `--petson-blue` con gradient mesh.

4 cifras en blanco, gigantes, Fraunces, con **conteo ascendente animado** (IntersectionObserver dispara counter):

| Cifra | Descripción (Manrope, blanco 80%) |
|---|---|
| **+3.000** | Mascotas rescatadas y dadas en adopción |
| **350** | Madres esterilizadas gratuitamente |
| **98%** | De los rescates en veredas colombianas |
| **+10** | Proyectos sociales y ambientales activos |

Entre cifras, iconos Lottie pequeños (huellitas, corazones).

### 4.3 ¿Quiénes somos?

**Título:** Fraunces — *¿Quiénes somos?*

**Texto (Manrope, `1.125rem`, line-height 1.7):**
> PetSon es una fundación sin ánimo de lucro formada por un grupo de jóvenes emprendedores e innovadores que nos preocupamos por el bienestar de las mascotas, los animales y todos los seres sintientes de nuestro planeta.
>
> Nacimos para mitigar una problemática real y creciente en las veredas colombianas: el alto índice de mortalidad de cachorros, el abandono y la reproducción descontrolada. Cada rescate es una vida salvada, cada esterilización es un futuro sin sufrimiento.

**Layout:** texto a la izquierda (60%) + foto del equipo a la derecha (40%) con máscara orgánica.
Placeholder: `/assets/img/equipo.jpg`.

**Animación:** cuando la sección entra al viewport, texto aparece con SplitText por línea + stagger 0.1s.

### 4.4 Misión y Visión

Dos tarjetas lado a lado (apiladas en mobile), con íconos SVG animados en la entrada:

**Misión** (ícono: diana):
> Velar, vigilar y proteger a todas las mascotas de Medellín, Colombia y Latinoamérica, realizando actividades de rescate, esterilización y adopción. Dar a conocer las injusticias y el maltrato animal, y crear conciencia sobre el amor, la comprensión y el respeto por todas las especies.

**Visión** (ícono: ojo):
> Ser la primera fundación con cobertura latinoamericana en el rescate y cuidado de mascotas en condiciones extremas, abriendo sedes en los países más afectados por la problemática del abandono y maltrato animal, y promoviendo una cultura socio-animalista basada en el respeto y la ley.

Fondo: `--petson-cream`. Cards con borde azul sutil y hover tilt suave (±4°).

### 4.5 Proyectos

**Título:** *Nuestros proyectos*
**Subtítulo:** *Nueve frentes de acción por el bienestar animal y ambiental.*

Grid de 9 tarjetas (3×3 desktop, 2 cols tablet, 1 col mobile), con **animación de entrada en cascada** (stagger 0.1s al hacer scroll).

Cada tarjeta: icono SVG azul monocromático + título Fraunces + descripción Manrope + hover con tilt 3D sutil y elevación (box-shadow).

1. **Rescate de mascotas** — *Rescatamos cachorros en veredas colombianas, donde el índice de mortalidad es más alto. Más de 3.000 vidas salvadas.*
2. **Esterilizaciones gratuitas** — *Esterilizamos madres rescatadas. 350 operadas, 160 en una sola jornada en Sopetrán, Antioquia.*
3. **Adopciones** — *Conectamos a cada mascota rescatada con una familia responsable. Cada 1.000 rescates entregamos un cachorro de raza: todos somos iguales.*
4. **Come Firulais** — *Una vez por semana recorremos Medellín alimentando e hidratando mascotas en condición de calle.*
5. **Red de Rescatistas** — *Red de aliados en veredas que reportan casos y transportan alimentos, con apoyo económico de la fundación.*
6. **Eco Parque y Santuario** — *Albergue con capacidad para 150 mascotas, centro de esterilizaciones y zona para fauna silvestre, exótica y doméstica.*
7. **Apoyo a otras fundaciones** — *Cada mes visitamos y apoyamos con donaciones y difusión a fundaciones, albergues y personas naturales.*
8. **Proyectos educativos** — *Programas de educación socio-animalista en instituciones educativas con enfoque humanista y artístico.*
9. **PetSon Eco** — *Protegemos nacimientos de agua y promovemos el cuidado del planeta. La tierra es un ser vivo.*

**Tarjeta destacada (full width, fondo `--petson-blue`, texto blanco):**

### App PetSon (próximamente)
> Una aplicación móvil para gestionar adopciones, rescates, búsqueda y pérdida, esterilizaciones y reportes de maltrato. Incluirá un mapa de Medellín con puntos críticos y zonas de integración canina.

Con ilustración mockup de celular al lado + efecto parallax suave al scroll.

### 4.6 Cómo Ayudar

**Título:** *¿Cómo puedes ayudar?*
**Subtítulo:** *Hay muchas formas de transformar una vida.*

Tres tarjetas grandes con ilustraciones SVG animadas (al hover la ilustración hace un micro-bounce):

1. **Adopta** — *Dale un hogar a un ángel de cuatro paticas.* → [Ver mascotas en adopción] (botón primario azul)
2. **Dona** — *Tu aporte, grande o pequeño, salva vidas.* → [Hacer una donación] (botón warm `--petson-warm`)
3. **Sé voluntario o rescatista** — *Únete a nuestra red en veredas y zonas rurales.* → [Quiero unirme] (abre formulario en modal)

**Tarjeta secundaria — Adopta un Árbol** (fondo cream, borde punteado):
> Apadrina un árbol y recibe los frutos cuando madure. Cuidamos del planeta tanto como de sus habitantes.

### 4.7 Testimonios

**Título:** *Historias que cambian vidas*

Carrusel horizontal (3 visibles desktop, 1 mobile) con drag/swipe. Cada tarjeta:
- Foto redonda 200×200 (placeholder)
- Nombre + ciudad (Fraunces)
- Texto del testimonio (Manrope italic) de 2–4 líneas.

Placeholder con 3 testimonios genéricos cálidos listos para reemplazar.

**Sección complementaria — Videos:**
Grid de 3 videos embebidos (iframes de Facebook Video):
- https://www.facebook.com/FundacionPetSon/videos/496770727755068/
- https://www.facebook.com/FundacionPetSon/videos/382404355772793/
- https://www.facebook.com/FundacionPetSon/videos/1520079934808520/

### 4.8 Contacto

**Layout dos columnas:**

**Izquierda — Información** (Manrope):
- 📍 Medellín, Antioquia, Colombia
- 📧 *email a suministrar por el cliente*
- 📱 *WhatsApp/teléfono a suministrar por el cliente*
- Redes (íconos azules con hover scale):
  - Facebook: https://www.facebook.com/FundacionPetSon/
  - Instagram: https://www.instagram.com/petsonmde/

**Derecha — Formulario** (react-hook-form + validación):
- Nombre completo *(requerido)*
- Email *(requerido, regex)*
- Teléfono
- Tipo de consulta *(select: Adopción / Donación / Voluntariado / Reportar caso / Otro)*
- Mensaje *(textarea, requerido, min 10 chars)*
- Botón "Enviar mensaje" (primario azul) con loader al enviar.

**Envío:** Mock con `setTimeout` + mensaje de éxito animado ("✓ ¡Gracias! Te contactaremos pronto."). En producción, conectar a Formspree/Resend/Web3Forms (dejar `TODO` claro en código).

### 4.9 Footer

Fondo `--petson-blue-deep`, texto blanco.

**Tres columnas:**

1. **Logo + misión corta:**
   *"Rescatamos, esterilizamos y damos una segunda oportunidad a los ángeles de cuatro paticas."*

2. **Enlaces rápidos:** Nosotros, Proyectos, Adopciones, Cómo ayudar, Contacto.

3. **Redes:** íconos de Facebook, Instagram.

**Barra inferior (Manrope small, 80% opacidad):**
© 2026 Fundación PetSon. Todos los derechos reservados.
*Medellín, Colombia. Hecho con 💙 para nuestras mascotas.* (El "💙" pulsa cada 3s).

---

## 🐾 FASE 5 — PÁGINA DE ADOPCIONES (`/adopciones`)

### Estructura

**Header:** mismo del home (logo + nav) + Companion Dock persiste.

**Hero corto:**
- Título: *Adopta un ángel de cuatro paticas*
- Subtítulo: *Conoce a los peluditos que están esperando una familia.*

**Filtros** (chips clickeables, fondo cream):
- Todos / Perros / Gatos
- Cachorros / Adultos
- Tamaño: Pequeño / Mediano / Grande

**Grid de mascotas** (3 cols desktop, 2 tablet, 1 mobile):
Cada card:
- Foto 1:1 (placeholder)
- Nombre (Fraunces, 1.5rem)
- Edad + género + tamaño (Manrope small, badges)
- Descripción 1 línea emocional
- Botón "Quiero conocerlo/a" → abre modal con formulario.

**Datos mock** (9 mascotas de ejemplo en JSON):

```json
[
  { "id": "luna-01", "nombre": "Luna", "especie": "perro", "edad": "2 años", "genero": "hembra", "tamaño": "mediano", "descripcion": "Juguetona y cariñosa, lista para correr en el parque.", "foto": "/assets/img/adopciones/luna.jpg", "disponible": true },
  { "id": "tom-02", "nombre": "Tom", "especie": "gato", "edad": "1 año", "genero": "macho", "tamaño": "pequeño", "descripcion": "Curioso y tranquilo, adora las tardes soleadas.", "foto": "/assets/img/adopciones/tom.jpg", "disponible": true }
]
```

**Animación:** cada card entra con stagger al scroll.

**CTA final (banner azul):**
*"¿No encuentras a tu compañero? Escríbenos y te ayudamos a encontrarlo."* + botón → contacto.

---

## ⚙️ PARÁMETROS GLOBALES DE ANIMACIÓN

```js
// src/config/animation.js
export const ANIM = {
  ease: {
    smooth: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)',
    dramatic: 'power4.inOut'
  },
  duration: {
    micro: 0.25,
    short: 0.6,
    medium: 1.0,
    intro: 4.8
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    loose: 0.15
  }
};
```

---

## 📱 RESPONSIVIDAD

- **Breakpoints:** 480px, 768px, 1024px, 1440px.
- **Mobile-first.**
- En mobile, el intro **reduce la complejidad**: partículas Three.js desactivadas, tilts 3D convertidos en hover simples, stagger más corto.
- El Companion Dock siempre visible pero más pequeño (56×56px).
- Testimonios y proyectos: carruseles con scroll-snap en mobile.
- Tipografías fluidas con `clamp()` en toda la jerarquía.

---

## ♿ ACCESIBILIDAD (WCAG 2.1 AA)

- `prefers-reduced-motion: reduce` → todas las animaciones complejas se reducen a fades simples de 0.3s. Las partículas Three.js se desactivan. El tilt se desactiva.
- Contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande.
- Navegación completa con teclado (focus visible con outline azul).
- `aria-label` en todos los íconos sin texto.
- `aria-live="polite"` en las burbujas del Companion Dock.
- Skip link al inicio: *"Saltar al contenido principal"*.
- Semántica HTML5: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`.
- Formularios con `<label>` asociados.
- Alt descriptivo en todas las imágenes.

---

## 🔍 SEO

Metadatos por página, con OpenGraph y Twitter cards:

```html
<title>Fundación PetSon | Rescate y adopción de mascotas en Medellín</title>
<meta name="description" content="Fundación sin ánimo de lucro dedicada al rescate, esterilización y adopción de mascotas en veredas colombianas. +3.000 vidas salvadas." />
<meta property="og:image" content="/assets/og-image.jpg" />
```

JSON-LD en home (tipo NGO):

```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Fundación PetSon",
  "description": "Fundación sin ánimo de lucro dedicada al rescate, esterilización y adopción de mascotas en Colombia.",
  "url": "https://petson.org",
  "logo": "https://petson.org/logoPetson.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  },
  "sameAs": [
    "https://www.facebook.com/FundacionPetSon/",
    "https://www.instagram.com/petsonmde/"
  ]
}
```

Sitemap.xml y robots.txt generados.

---

## ✅ CRITERIOS DE ACEPTACIÓN

1. [ ] El intro dura entre **4.5 y 6 segundos**, con opción de skip que persiste en `sessionStorage`.
2. [ ] El logo se **arma visualmente pieza por pieza** (no simple fade del PNG). Vectorización obligatoria.
3. [ ] El selector tiene **exactamente 2 cards**: Luna (perro) y Milo (gato), con tilt 3D funcional.
4. [ ] Al seleccionar, la mascota queda fija en la **esquina inferior izquierda** durante toda la navegación.
5. [ ] El Companion Dock muestra **burbujas contextuales** en al menos 5 secciones.
6. [ ] Se puede **cambiar de compañero** sin recargar la página.
7. [ ] Todas las secciones del scroll narrativo están implementadas con los textos exactos de este documento.
8. [ ] La página `/adopciones` funciona con 9 mascotas mock y filtros.
9. [ ] El formulario de contacto valida y muestra mensaje de éxito (mock).
10. [ ] **60fps fluidos** en el intro y animaciones.
11. [ ] **Lighthouse ≥ 90** en Performance, ≥95 en Accessibility.
12. [ ] La paleta se respeta estrictamente (azul + cream + warm + grises). Cero colores ajenos.
13. [ ] Tipografías Fraunces + Manrope correctamente cargadas.
14. [ ] **100% responsive** en mobile, tablet y desktop. Probado en iOS y Android.
15. [ ] `prefers-reduced-motion` completamente respetado.
16. [ ] Cero librerías UI prefabricadas (Bootstrap, MUI, Tailwind, etc.).
17. [ ] Código modular, comentado y con `README.md` de instalación.
18. [ ] El `logoPetson.png` original **no se sobrescribe**.

---

## 🚀 ORDEN DE IMPLEMENTACIÓN SUGERIDO

1. **Setup:** Vite + React + estructura de carpetas + `tokens.css` + fuentes.
2. **Vectorización del logo:** PNG → SVG con capas separadas (potrace o recreación manual fiel).
3. **Context global** para el compañero elegido (`CompanionContext`).
4. **Intro animado:** timeline GSAP completo con SplitText.
5. **Fondo partículas Three.js** (opcional pero recomendado).
6. **Selector:** cards con tilt 3D + lógica de selección + confetti.
7. **Companion Dock:** posicionamiento fijo + animaciones idle + burbujas contextuales.
8. **Secciones narrativas** una por una con ScrollTrigger.
9. **Página `/adopciones`** con filtros y modal.
10. **Audio toggle + ambient sound.**
11. **Pass responsive + reduced-motion.**
12. **SEO + meta tags + JSON-LD.**
13. **QA final + Lighthouse.**
14. **README.md con instrucciones de deploy.**

---

## 💬 NOTAS FINALES AL AGENTE

- Este es un **proyecto de fundación animalista**, el tono debe ser **cálido, emotivo y esperanzador**, nunca frío ni corporativo.
- La paleta monocromática azul es **deliberada**. El warm `#F5A623` se usa SOLO para CTAs secundarios puntuales (donación) y corazones Lottie, nunca como color dominante.
- Cuando dudes entre dos opciones de diseño, elige **la más memorable y con más carácter editorial**, no la más segura.
- Las tipografías Fraunces + Manrope son innegociables. Son lo que diferencia este sitio de un proyecto "AI-default".
- Todos los textos en español de Colombia (voseo evitado, tuteo preferido).
- Documenta en `README.md` final cómo correr el proyecto (`npm install && npm run dev`), cómo desplegar (Vercel recomendado), y cómo extender con nuevas secciones o mascotas en adopción.
- **No sobrescribas `logoPetson.png` bajo ninguna circunstancia.**
- Los assets de audio y Lottie pueden ser placeholders o descargarse de LottieFiles / freesound.org con licencia libre.
- Las imágenes de placeholder pueden usarse de `https://placehold.co/WIDTHxHEIGHT/1E85E8/FFFFFF?text=PetSon` con los colores de la marca.

**Construye algo que emocione. Construye algo que recordemos.** 💙🐾

---

**Fin del prompt maestro.**
