"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface CrystallineBackgroundProps {
  baseColor?: string;
  gradientColors?: string[];
  gradientSize?: string;
  animationSpeed?: number;
  noiseOpacity?: number;
  containerClassName?: string;
}

const CrystallineBackground: React.FC<CrystallineBackgroundProps> = ({
  baseColor = "#020617", 
  gradientColors = [
    "rgba(8, 20, 120, 0.35)",   // 1: Center Navy
    "rgba(0, 140, 170, 0.25)",  // 2: Bottom Right Teal
    "rgba(180, 0, 200, 0.15)",  // 4: Top Right Magenta (subdued)
    "rgba(30, 180, 80, 0.15)",  // 5: Deep Green (subdued)
    "rgba(200, 210, 255, 0.06)", // 6: White Mist (subtle)
    "rgba(100, 40, 200, 0.2)",  // 7: Bridge Purple
  ],
  gradientSize = "80%",
  animationSpeed = 0.3,
  noiseOpacity = 0.12,
  containerClassName = "",
}) => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const baseNoise = Math.random() * 255;
        const highlight = Math.random() > 0.85 ? Math.random() * 60 : 0;
        const shadow = Math.random() > 0.9 ? -Math.random() * 30 : 0;
        const r = Math.min(255, Math.max(0, baseNoise + highlight + shadow));
        const g = Math.min(255, Math.max(0, baseNoise + highlight * 1.1 + shadow));
        const b = Math.min(255, Math.max(0, baseNoise + highlight * 1.2 + shadow * 0.9));
        data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    updateCanvas();
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !gradientRef.current) return;
    const container = gradientRef.current;
    const gradients = container.querySelectorAll<HTMLDivElement>(".gradient-orb");
    gradients.forEach((gradient, index) => {
      const baseDuration = 12 + index * 4;
      const duration = baseDuration / (animationSpeed * 3);
      const delay = index * -7;
      gradient.style.animation = `pulse-${index % 6} ${duration}s ease-in-out infinite alternate`;
      gradient.style.animationDelay = `${delay}s`;
    });

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes pulse-0 { 0% { transform: scale(1) translate(-50%, -50%); opacity: 0.7; } 100% { transform: scale(1.3) translate(-45%, -55%); opacity: 1; } }
      @keyframes pulse-1 { 0% { transform: scale(1) translate(0%, 0%); opacity: 0.6; } 100% { transform: scale(1.4) translate(-10%, -5%); opacity: 0.9; } }
      @keyframes pulse-2 { 0% { transform: scale(1) translate(0%, 0%); opacity: 0.5; } 100% { transform: scale(1.2) translate(5%, 10%); opacity: 0.8; } }
      @keyframes pulse-3 { 0% { transform: scale(1) translate(0%, 0%); opacity: 0.5; } 100% { transform: scale(1.5) translate(-5%, -10%); opacity: 0.8; } }
      @keyframes pulse-4 { 0% { transform: scale(1) translate(0%, 0%); opacity: 0.1; } 100% { transform: scale(1.6) translate(10%, 5%); opacity: 0.3; } }
      @keyframes pulse-5 { 0% { transform: scale(1) translate(-50%, -50%); opacity: 0.6; } 100% { transform: scale(1.3) translate(-55%, -45%); opacity: 0.9; } }
    `;
    document.head.appendChild(styleSheet);
    return () => { document.head.removeChild(styleSheet); };
  }, [isMounted, animationSpeed]);

  const getMapPos = (index: number) => {
    const positions = [
      { top: '45%', left: '45%', size: '110%' },
      { top: '80%', left: '80%', size: '80%' },
      { top: '10%', left: '85%', size: '70%' },
      { top: '15%', left: '10%', size: '75%' },
      { top: '85%', left: '5%', size: '90%' },
      { top: '55%', left: '55%', size: '95%' },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1] ${containerClassName}`} style={{ backgroundColor: baseColor }}>
      <motion.div ref={gradientRef} className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} style={{ filter: "blur(140px)" }}>
        {gradientColors.map((color, index) => {
          const config = getMapPos(index);
          const isCentered = index === 0 || index === 5;
          return (
            <div key={index} className="gradient-orb absolute" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 75%)`, width: config.size, height: config.size, top: config.top, left: config.left, mixBlendMode: "screen", willChange: "transform", transform: isCentered ? "translate(-50%, -50%)" : "none" }} />
          );
        })}
      </motion.div>
      <motion.canvas ref={noiseCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: isMounted ? noiseOpacity : 0 }} transition={{ duration: 3 }} style={{ mixBlendMode: "overlay", imageRendering: "pixelated", filter: "contrast(1.1) brightness(1.05)" }} />
    </div>
  );
};

export default CrystallineBackground;
