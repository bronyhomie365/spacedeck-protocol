"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Home, Orbit, Settings } from 'lucide-react';
import { TbTerminal } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { cn } from './ui/primitives';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

interface NavigationDockProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({ activeId, onSelect }) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems: NavItem[] = [
    { icon: Home, label: 'Main Screen', id: 'home' },
    { icon: IoBookOutline, label: 'Capital Dashboard', id: 'capital' },
    { icon: TbTerminal, label: 'Agent Log', id: 'log' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeId);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={dockRef}
      className="relative rounded-[36px] py-[30px] px-[18px] flex flex-col gap-6 bg-black/40 backdrop-blur-[80px] drop-shadow-[0_0_32px_rgba(0,0,0,0.8)] z-[10]"
      style={{
        transform: 'perspective(1000px) rotateX(2deg)',
      }}
    >
      {/* SHIMMERING BORDER: 1:1 Crystalline Edge */}
      <div 
        className="absolute inset-0 rounded-[36px] pointer-events-none z-30"
        style={{
          border: "1.5px solid transparent",
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, rgba(100, 200, 255, 0.15) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(150, 100, 255, 0.15) 75%, rgba(255, 255, 255, 0.3) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "liquid-border-pulse 10s ease-in-out infinite",
        }}
      />

      {/* MICRO-GRAIN */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.02] mix-blend-soft-light rounded-[36px] overflow-hidden" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='vesselNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23vesselNoise)'/%3E%3C/svg%3E")`,
        }} 
      />

      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;
        const distance = Math.hypot(
          mousePosition.x - (dockRef.current?.offsetWidth || 0) / 2,
          mousePosition.y - (index * 60 + 45)
        );
        const scale = Math.max(0.9, 1 - distance / 225);

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'group relative flex items-center justify-center w-12 h-12 rounded-[15px] transition-all duration-300 z-40',
              isActive 
                ? 'scale-[1.08] bg-[#020617]/90 border border-white/20 shadow-[0_12px_24px_rgba(0,0,0,0.8)]' 
                : 'bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10'
            )}
            style={{
              transform: `scale(${scale})`,
            }}
            title={item.label}
          >
            {/* Active Inner Glow */}
            {isActive && (
              <div className="absolute inset-0 rounded-[15px] opacity-40 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)' }} />
            )}
            
            <Icon
              size={20}
              className={cn(
                'relative z-10 transition-all duration-300',
                isActive
                  ? 'text-white drop-shadow-[0_0_8px_white]'
                  : 'text-white/40 group-hover:text-white/80 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]'
              )}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
};
