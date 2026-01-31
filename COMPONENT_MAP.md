# 🗺️ Component & Hook Usage Guide

## Import Map - How Everything Connects

### Main App Entry Point
```typescript
// src/App.tsx
import { useState, useEffect } from 'react';
import { Navbar, Footer, Separator } from './components';
import { 
  HeroSection, 
  GeometrySection, 
  SymbolsSection, 
  ArchiveSection, 
  TransmutationSection 
} from './components';
import { useScrollReveal } from './hooks';
import { initRandomGlows } from './utils';
```

---

## 📦 Components

### UI Components
```typescript
// Navbar.tsx - Navigation & header
<Navbar isNavOpen={isNavOpen} onToggle={toggleNav} />

// Separator.tsx - Decorative dividers
<Separator />
<Separator className="bg-void/50 backdrop-blur-sm" />

// Footer.tsx - Page footer
<Footer />
```

### Section Components
```typescript
// HeroSection.tsx - Homepage banner
<HeroSection />

// GeometrySection.tsx - Scroll animations
<GeometrySection />

// SymbolsSection.tsx - Symbol cards
<SymbolsSection />

// ArchiveSection.tsx - Media gallery
<ArchiveSection />

// TransmutationSection.tsx - Canvas particles
<TransmutationSection />
```

---

## 🪝 Hooks Usage

### useScrollAnimation
```typescript
import { useScrollAnimation } from './hooks/useScrollAnimation';

export const GeometrySection = () => {
  const sectionRef = useScrollAnimation((progress: number) => {
    // progress: 0 → 1 based on scroll position
    // Update DOM/state based on progress
    if (geoOuterRef.current) {
      geoOuterRef.current.style.opacity = String(progress);
    }
  });

  return <section ref={sectionRef}>...</section>;
};
```

### useScrollReveal
```typescript
import { useScrollReveal } from './hooks/useScrollReveal';

export const ArchiveSection = () => {
  useScrollReveal();
  // Automatically animates all .reveal-on-scroll elements
  
  return (
    <div className="reveal-on-scroll">
      {/* This will fade in on scroll */}
    </div>
  );
};
```

### useAlchemyCanvas
```typescript
import { useAlchemyCanvas } from './hooks/useAlchemyCanvas';

export const TransmutationSection = () => {
  const { countsRef } = useAlchemyCanvas('alchemyCanvas');
  
  // countsRef.current.gold - number of gold particles
  // countsRef.current.lead - number of lead particles
  
  return (
    <>
      <canvas id="alchemyCanvas"></canvas>
      <div>{countsRef.current.gold} gold</div>
    </>
  );
};
```

---

## 🛠️ Utilities

### Animation Utils
```typescript
import {
  PHRASE,
  easeFunction,
  createSpiralPath,
  initRandomGlows
} from './utils/animationUtils';

// Constants
const text = PHRASE; // "VISITA • INTERIORA • ..."

// Functions
const eased = easeFunction(0.5); // Returns smooth value
createSpiralPath(svgElement, spacing, radius, angle);
initRandomGlows(); // Starts random glow animation
```

---

## 📊 Data Flow Diagram

```
App.tsx (State: isNavOpen)
├── Navbar
│   └── toggleNav() → setIsNavOpen
├── HeroSection
│   └── [Parallax on mousemove]
├── GeometrySection
│   ├── useScrollAnimation (progress tracking)
│   └── refs: geoOuter, geoTri1, geoTri2, etc.
├── SymbolsSection
│   ├── useScrollAnimation (scroll tracking)
│   └── spiralItems refs array
├── Separator
├── ArchiveSection
│   └── useScrollReveal (auto-reveals)
├── Separator
├── TransmutationSection
│   ├── useAlchemyCanvas ('alchemyCanvas')
│   └── Updates countsRef.current
└── Footer
```

---

## 🔄 Event Flow

### Scroll Events
```
User scrolls
  ↓
window scroll listener (passive)
  ↓
useScrollAnimation triggers callback
  ↓
Updates component refs/state
  ↓
DOM re-renders with new transforms
```

### Mouse Events
```
User moves mouse in Hero/Canvas
  ↓
onMouseMove handler
  ↓
Updates parallax/particle positions
  ↓
React re-renders or canvas redraws
```

### Navigation Toggle
```
User clicks toggle button
  ↓
toggleNav() function called
  ↓
setIsNavOpen(!isNavOpen)
  ↓
Navbar receives isNavOpen prop
  ↓
CSS classes updated
  ↓
Chain nav animates in/out
```

---

## 📝 Component Props

### Navbar
```typescript
interface NavbarProps {
  isNavOpen: boolean;      // Menu open state
  onToggle: () => void;    // Toggle callback
}
```

### Separator
```typescript
interface SeparatorProps {
  className?: string;      // Additional CSS classes
}
```

### All Sections
```typescript
// No props - they manage their own state/effects
export const SectionName: React.FC = () => { ... }
```

---

## 🎯 State Management

### Local State (useState)
```typescript
// App.tsx
const [isNavOpen, setIsNavOpen] = useState(false);

// Passed to Navbar
<Navbar isNavOpen={isNavOpen} onToggle={toggleNav} />
```

### Ref-based State (useRef)
```typescript
// GeometrySection.tsx
const geoOuterRef = useRef<SVGGElement>(null);
const charElementsRef = useRef<any[]>([]);

// Updated in scroll handler
if (geoOuterRef.current) {
  geoOuterRef.current.style.transform = ...;
}
```

### External State (countsRef in hook)
```typescript
// useAlchemyCanvas
const countsRef = useRef({ gold: 0, lead: 0 });

// Updated in animation loop
countsRef.current = { gold: goldCount, lead: particleCount - goldCount };
```

---

## 🎨 Styling Approach

### Tailwind Classes
```tsx
// Responsive design
<h1 className="text-5xl sm:text-6xl md:text-9xl">
  VISHWAPRENEUR
</h1>

// Color utilities
<div className="bg-void text-gold-300 border-gold-500/30">
</div>

// Animations
<div className="animate-spin-slow hover:shadow-[...]">
</div>
```

### CSS in App.css
```css
/* Complex animations */
@keyframes morph {
  0% { border-radius: 45% 55% 40% 60% / 50% 60% 40% 50%; }
  100% { border-radius: 55% 45% 60% 40% / 60% 50% 50% 60%; }
}

.symbol-card {
  animation: morph 8s ease-in-out infinite;
}
```

### Inline Styles (React)
```tsx
// Used only when state determines style
<div style={{ 
  transform: `translate(${x}px, ${y}px)`,
  opacity: String(progress)
}}>
</div>
```

---

## 🔗 Import Patterns

### From Components Index
```typescript
import {
  Navbar,
  Separator,
  Footer,
  HeroSection,
  GeometrySection,
  SymbolsSection,
  ArchiveSection,
  TransmutationSection
} from './components';
```

### From Hooks Index
```typescript
import {
  useScrollAnimation,
  useScrollReveal,
  useAlchemyCanvas
} from './hooks';
```

### From Utils Index
```typescript
import {
  PHRASE,
  easeFunction,
  createSpiralPath,
  initRandomGlows
} from './utils';
```

### Direct Imports (when needed)
```typescript
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { animationUtils } from './utils/animationUtils';
```

---

## 🧪 Example: Adding a Feature

### Add new animation to geometry
```typescript
// In GeometrySection.tsx useScrollAnimation callback
useScrollAnimation((progress) => {
  // Existing code...
  
  // NEW: Add custom transform
  if (newElementRef.current) {
    const rotation = progress * 360; // Rotate full circle
    newElementRef.current.style.transform = `rotate(${rotation}deg)`;
  }
});
```

### Add new hook
```typescript
// src/hooks/useNewFeature.ts
export const useNewFeature = (callback) => {
  useEffect(() => {
    // Your effect here
  }, [callback]);
};

// Export from index
// src/hooks/index.ts
export { useNewFeature } from './useNewFeature';

// Use in component
import { useNewFeature } from './hooks';
useNewFeature(() => { /* ... */ });
```

---

## 💾 File Modification Guide

### To Update Styles
1. Edit class names in JSX files
2. Or add new CSS rules in `App.css`
3. Or extend `tailwind.config.ts`

### To Update Animations
1. Modify component refs in scroll handlers
2. Or update keyframes in `App.css`
3. Or adjust `animationUtils.ts`

### To Update Content
1. Edit text/images in component JSX
2. Update gallery items in `ArchiveSection.tsx`
3. Modify symbol data in `SymbolsSection.tsx`

### To Add Features
1. Create new component in `components/`
2. Create new hook in `hooks/` if needed
3. Import and use in `App.tsx`
4. Export from respective index files

---

## 🚀 Performance Tips

1. **Memoize Callbacks**: Use `useCallback` for large callbacks
2. **Lazy Load**: Consider code splitting sections
3. **Optimize Images**: Use next-gen formats
4. **Limit Animations**: Reduce particle count if needed
5. **Passive Listeners**: Already used (passive: true)

---

## 📚 Quick Reference

| Task | Location |
|------|----------|
| Add navigation link | Navbar.tsx |
| Change colors | tailwind.config.ts |
| Update fonts | index.css |
| Add animation | App.css |
| Create component | components/sections/ |
| Create hook | hooks/ |
| Add utility | utils/animationUtils.ts |
| Modify layout | Component JSX |

---

This map helps you understand how components, hooks, and utilities work together! 🎉
