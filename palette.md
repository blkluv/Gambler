# GAMBLE Design System

## Color Palette

### Base Colors
- Background: `#0A0523` - Deep space purple, creates an immersive gaming atmosphere
- Background Light: `#140B35` - Slightly lighter variant for layering

### Primary Colors
- Primary: `#FF3D00` - Vibrant orange for CTAs and key actions
  - Dark: `#E63600`
  - Light: `#FF704D`
  - Glow: `rgba(255,61,0,0.33)`

### Secondary Colors
- Secondary: `#14F195` - Electric green for success states
  - Dark: `#10C177`
  - Light: `#42F4AA`
  - Glow: `rgba(20,241,149,0.33)`

### Accent Colors
- Neon Pink: `#FF2D55`
- Neon Purple: `#9945FF`
- Neon Blue: `#00C2FF`

### Status Colors
- Success: `#00FFA3`
- Danger: `#FF3B3B`

## Typography

### Font Family
- Primary Font: "Space Grotesk" - Modern, geometric sans-serif
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Text Styles
- Headings: 
  ```css
  .heading-1 {
    font-size: 3rem; /* 48px */
    line-height: 1.2;
    font-weight: 700;
  }
  ```

- Body Text:
  ```css
  .body {
    font-size: 1rem; /* 16px */
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
  }
  ```

## Effects & Animations

### Gradients
```css
/* Premium Gradient */
background: linear-gradient(to right, #FF3D00, #9945FF, #00C2FF);

/* Cosmic Gradient */
background: linear-gradient(45deg, rgba(255,61,0,0.4), rgba(153,69,255,0.4), rgba(0,194,255,0.4));

/* Aurora Gradient */
background: linear-gradient(60deg, rgba(255,61,0,0.2), rgba(153,69,255,0.2), rgba(0,194,255,0.2));
```

### Shadows
```css
/* Card Shadow */
box-shadow: 0 8px 32px rgba(0,0,0,0.32);

/* Premium Glow */
box-shadow: 0 0 40px rgba(255,61,0,0.5);

/* Cosmic Glow */
box-shadow: 0 0 50px rgba(153,69,255,0.4);
```

### Glass Effect
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Animations
```css
/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Gradient Shimmer */
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Aurora Flow */
@keyframes aurora {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
```

## Component Styles

### Buttons
```css
.button {
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.button-primary {
  background: linear-gradient(to right, #FF3D00, #E63600);
  color: white;
  box-shadow: 0 4px 20px rgba(255,61,0,0.3);
}

.button-premium {
  background: linear-gradient(to right, #FF3D00, #9945FF);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 8px 32px rgba(255,61,0,0.35);
}
```

### Cards
```css
.card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.card-premium {
  background: linear-gradient(45deg, rgba(255,61,0,0.1), rgba(153,69,255,0.1));
  border: 1px solid rgba(255,61,0,0.2);
  box-shadow: 0 8px 32px rgba(255,61,0,0.35);
}
```

## Layout

### Spacing
- Base unit: 4px
- Common spacings: 16px, 24px, 32px, 48px, 64px

### Breakpoints
```css
/* Mobile First */
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

## Background Effects

### Noise Texture
```css
.noise-overlay {
  background-image: url("data:image/png;base64,..."); /* Noise pattern */
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```

### Gradient Background
```css
body {
  background: 
    linear-gradient(to bottom, rgba(10, 5, 35, 0.95), rgba(10, 5, 35, 0.95)),
    radial-gradient(circle at 50% 0%, rgba(255, 61, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 0% 50%, rgba(153, 69, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 100% 50%, rgba(0, 194, 255, 0.3) 0%, transparent 50%);
  background-attachment: fixed;
}
```

## Interaction States

### Hover Effects
```css
.hover-glow:hover {
  filter: brightness(1.2);
  box-shadow: 0 0 40px currentColor;
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Focus States
```css
.focus-visible {
  outline: none;
  ring: 2px;
  ring-color: rgba(255,61,0,0.5);
  ring-offset: 2px;
  ring-offset-color: #0A0523;
}
```