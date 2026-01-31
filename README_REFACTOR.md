# EDC Vishwapreneur v2 - React + TypeScript + Tailwind CSS

A segmented, component-based React application built from the original HTML. This refactoring maintains all original functionality while organizing code into reusable components, hooks, and utilities.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero banner with parallax effect
│   │   ├── GeometrySection.tsx    # Scroll-triggered geometry animations
│   │   ├── SymbolsSection.tsx     # 3D spiral with alchemy symbols
│   │   ├── ArchiveSection.tsx     # Gallery with images and videos
│   │   └── TransmutationSection.tsx # Interactive particle canvas
│   └── ui/
│       ├── Navbar.tsx            # Navigation with chain links
│       ├── Separator.tsx         # Decorative separators
│       └── Footer.tsx            # Footer with links
├── hooks/
│   ├── useScrollAnimation.ts      # Scroll progress tracking
│   ├── useScrollReveal.ts         # Intersection observer for animations
│   └── useAlchemyCanvas.ts        # Particle transmutation logic
├── utils/
│   └── animationUtils.ts          # Reusable animation helpers
├── styles/
│   └── (custom CSS as needed)
├── App.tsx                        # Main app component
├── App.css                        # Global component styles
├── index.css                      # Global styles & font imports
└── main.tsx                       # React entry point
```

## 🎨 Key Features Maintained

### 1. **Tailwind CSS Integration**
- All styling migrated from inline HTML to Tailwind classes
- Custom color palette extended in `tailwind.config.ts`
- Custom animations (spin-slow, float, drift)
- Responsive design utilities

### 2. **Custom Hooks**
- **useScrollAnimation**: Manages scroll-based progress for geometry animations
- **useScrollReveal**: IntersectionObserver for reveal-on-scroll effects
- **useAlchemyCanvas**: Canvas-based particle transmutation system

### 3. **Component Separation**
- **Sections**: Major page sections (Hero, Geometry, Symbols, Archive, Transmutation)
- **UI Components**: Reusable elements (Navbar, Separator, Footer)
- **Utilities**: Animation helpers and configuration

### 4. **Advanced Animations**
- **Parallax**: Hero content responds to mouse movement
- **Scroll Triggers**: Geometry paths animate during scroll
- **3D Transforms**: Spiral symbol rotation with depth
- **Particle System**: Interactive Lead-to-Gold transmutation
- **Portal Wipe**: Cinematic video reveal with clip-path

## 📦 Dependencies

### Core
- **react**: ^19.2.0 - UI framework
- **react-dom**: ^19.2.0 - React DOM rendering
- **lucide-react**: ^0.370.0 - Alchemical icons (flasks, atoms, gems)
- **tailwindcss**: ^3.4.1 - Utility-first CSS framework

### Development
- **TypeScript**: ~5.9.3 - Type safety
- **Vite**: ^7.2.4 - Fast build tool
- **PostCSS**: ^8.4.32 - CSS processing
- **Autoprefixer**: ^10.4.17 - Vendor prefixes

### Typography & Assets
- **Google Fonts**: Cinzel Decorative, Cormorant Garamond (via CDN in index.css)
- **Unsplash/Pexels**: Images and videos for gallery and orbs (via CDN)
- **Lucide Icons**: SVG icons throughout the UI

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🎯 Component Architecture

### HeroSection
- Parallax mouse tracking
- Animated geometric patterns
- Call-to-action button with hover effects

### GeometrySection
- Scroll-driven geometry animations
- Sacred text ring (VISITA INTERIORA...)
- Portal wipe effect
- Cinematic video reveal

### SymbolsSection
- 4 alchemical material cards (Lapis, Mercury, Sulphur, Salt)
- 3D spiral positioning based on scroll
- Quote reveals on focus
- Dynamic glow intensity

### ArchiveSection
- 2-column grid gallery
- Mixed image/video content
- Overlay animations
- Scroll-reveal on intersection

### TransmutationSection
- HTML Canvas particle system
- Mouse-based particle transmutation
- Lead to Gold counter
- Real-time sparkle effects

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to modify the gold palette, void colors, etc.

### Animations
- Adjust animation speeds in `tailwind.config.ts` keyframes
- Modify timing in individual component files

### Content
- Update text, images, and video URLs in component files
- Change gallery items in `ArchiveSection.tsx`
- Modify symbol data in `SymbolsSection.tsx`

### Fonts
Update Google Fonts link in `src/index.css` to use different typefaces

## 📱 Browser Support

- Modern CSS features: CSS Grid, Flexbox, CSS 3D Transforms
- HTML5 Canvas for particle system
- Intersection Observer API for scroll reveals
- CSS clip-path for portal wipe effect

## ✨ No Functionality Changed

All original interactive features have been preserved:
- ✅ Scroll animations
- ✅ Parallax effects
- ✅ Particle transmutation
- ✅ Video reveal
- ✅ Gallery hover states
- ✅ Navigation chain
- ✅ Sacred geometry
- ✅ Quote reveals

## 📝 Notes

- CSS Grid/Flexbox for responsive layouts
- TypeScript for type safety throughout
- React hooks for side effects and animation logic
- Tailwind for consistent, utility-based styling
- Vite for fast development and optimized builds

## 🔗 External Resources

- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Vite Documentation](https://vite.dev)
