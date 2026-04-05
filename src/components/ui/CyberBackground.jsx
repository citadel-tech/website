import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((width * height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * -0.5 - 0.1,
          color: Math.random() > 0.5 ? '#00ff9d' : '#ff5e00',
          baseAlpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawGrid = (offsetY) => {
      ctx.strokeStyle = 'rgba(0, 255, 157, 0.05)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines with perspective simulation via spacing
      const numLines = 25;
      for (let i = 0; i < numLines; i++) {
        const y = height - Math.pow(i / numLines, 2) * height + offsetY;
        if (y < 0 || y > height) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    let time = 0;
    const render = () => {
      time += 0.5;
      ctx.clearRect(0, 0, width, height);

      // Moving grid effect
      const gridOffset = time % 60;
      drawGrid(gridOffset);

      // Nodes / Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width || p.y < 0) {
          p.x = Math.random() * width;
          p.y = height + 10;
        }

        const pulse = Math.abs(Math.sin(time * 0.02 + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color === '#00ff9d' ? '0,255,157' : '255,94,0'}, ${p.baseAlpha + pulse * 0.3})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50 block" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy opacity-60" />
    </div>
  );
}
