"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleTextProps {
  text: string;
  className?: string;
}

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  const colors = ["#FFBFC7", "#B5DCFF", "#FFF7D6", "#FFFFFF"];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Clear particles on resize
      particles.current = [];
      
      // Draw text to create particles
      ctx.font = "bold 48px Inter, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      
      // Create particles from pixels
      for (let y = 0; y < canvas.height; y += 5) {
        for (let x = 0; x < canvas.width; x += 5) {
          const index = (y * canvas.width + x) * 4;
          if (imageData[index + 3] > 0) {
            particles.current.push({
              x,
              y,
              size: Math.random() * 2 + 1,
              speedX: Math.random() * 2 - 1,
              speedY: Math.random() * 2 - 1,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }
    };
    
    // Initialize
    resizeCanvas();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      for (const particle of particles.current) {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [text]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full absolute inset-0 ${className}`}
    />
  );
}