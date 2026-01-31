import { useEffect, useRef } from 'react';

interface ParticleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isGold: boolean;
  colorLead: string;
  colorGold: string;
  transmutationProgress: number;
}

interface SparkleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  color: string;
}

export const useAlchemyCanvas = (canvasId: string) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const sparklesRef = useRef<SparkleType[]>([]);
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, radius: 100 });
  const countsRef = useRef({ gold: 0, lead: 0 });

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const particleCount = 200;

    class Particle {
      x = Math.random() * width;
      y = Math.random() * height;
      vx = (Math.random() - 0.5) * 0.5;
      vy = (Math.random() - 0.5) * 0.5;
      size = Math.random() * 2 + 1;
      isGold = false;
      colorLead = `rgba(80, 80, 80, ${Math.random() * 0.5 + 0.2})`;
      colorGold = `rgba(212, 175, 55, ${Math.random() * 0.8 + 0.2})`;
      transmutationProgress = 0;

      update(mouse: typeof mouseRef.current) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            if (!this.isGold) {
              this.isGold = true;
              for (let i = 0; i < 3; i++) sparklesRef.current.push(new Sparkle(this.x, this.y));
            }
            this.vx += dx * 0.0001;
            this.vy += dy * 0.0001;
          }
        }

        if (this.isGold && this.transmutationProgress < 1) this.transmutationProgress += 0.05;
        if (this.isGold && Math.random() < 0.005) sparklesRef.current.push(new Sparkle(this.x, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 + this.transmutationProgress * 0.5), 0, Math.PI * 2);
        if (this.isGold) {
          ctx.fillStyle = this.colorGold;
          ctx.shadowBlur = 10 * this.transmutationProgress;
          ctx.shadowColor = '#D4AF37';
        } else {
          ctx.fillStyle = this.colorLead;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Sparkle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      decay: number;
      color: string;

      constructor(x: number, y: number, isMouse = false) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.01;
        this.color = isMouse ? '#FFF' : '#FFD700';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.y -= 0.5;
      }

      draw() {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.moveTo(this.x - this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          if (particlesRef.current[i].isGold && particlesRef.current[j].isGold) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 80) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 80)})`;
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              ctx.stroke();
            }
          }
        }
        particlesRef.current[i].update(mouseRef.current);
        particlesRef.current[i].draw();
      }

      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        sparklesRef.current[i].update();
        sparklesRef.current[i].draw();
        if (sparklesRef.current[i].life <= 0) sparklesRef.current.splice(i, 1);
      }

      const goldCount = particlesRef.current.filter((p) => p.isGold).length;
      countsRef.current = { gold: goldCount, lead: particleCount - goldCount };
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      if (Math.random() < 0.3) sparklesRef.current.push(new Sparkle(mouseRef.current.x, mouseRef.current.y, true));
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasId]);

  return { countsRef, particlesRef, sparklesRef };
};
