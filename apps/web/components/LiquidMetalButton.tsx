"use client";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles, LucideIcon } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./ui/primitives";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  icon: Icon = Sparkles,
  disabled = false,
  className,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);
  
  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 44,
        height: 44,
        innerWidth: 40,
        innerHeight: 40,
      };
    }
    return {
      width: 194,
      height: 44,
      innerWidth: 190,
      innerHeight: 40,
    };
  }, [viewMode]);

  // Consolidated WebGL check and shader loading
  useEffect(() => {
    // 1. STYLE INJECTION
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes liquid-border-pulse {
          0%, 100% { background: linear-gradient(145deg, rgba(255, 255, 255, 0.5) 0%, rgba(100, 200, 255, 0.4) 25%, rgba(150, 100, 255, 0.3) 50%, rgba(100, 200, 255, 0.35) 75%, rgba(255, 255, 255, 0.5) 100%) border-box; }
          50% { background: linear-gradient(325deg, rgba(150, 100, 255, 0.4) 0%, rgba(100, 200, 255, 0.5) 25%, rgba(255, 255, 255, 0.65) 50%, rgba(100, 200, 255, 0.45) 75%, rgba(150, 100, 255, 0.4) 100%) border-box; }
        }
      `;
      document.head.appendChild(style);
    }

    // 2. WEBGL CHECK & SHADER LOAD
    const checkAndLoad = async () => {
      let isSupported = false;
      try {
        const canvas = document.createElement('canvas');
        isSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        setWebglSupported(isSupported);
      } catch (e) {
        setWebglSupported(false);
      }

      if (isSupported && shaderRef.current) {
        try {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        } catch (error) {
          console.warn("[v0] WebGL enabled but shader failed to mount:", error);
          setWebglSupported(false);
        }
      }
    };

    checkAndLoad();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center h-[44px]",
        viewMode === "text" ? "w-[194px]" : "w-[44px]",
        disabled && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: "none",
          }}
        >
          {/* LABEL LAYER */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, gap 0.4s ease",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {viewMode === "icon" && (
              <Icon
                size={15}
                style={{
                  color: "#ffffff",
                  filter: "drop-shadow(0 0 4px currentColor) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))",
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: "scale(1)",
                }}
              />
            )}
            {viewMode === "text" && (
              <span
                style={{
                  fontFamily: "var(--font-microgramma), sans-serif",
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  lineHeight: 1,
                  textShadow: "none",
                  filter: "none",
                }}
              >
                {label}
              </span>
            )}
          </div>

          {/* CRYSTALLINE GLASS BODY LAYER */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-1.5px",
                borderRadius: "100px",
                background: "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), transparent, rgba(168, 85, 247, 0.2))",
                filter: "blur(12px)",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.08) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(0, 0, 0, 0.3)"
                  : "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 0 rgba(0, 0, 0, 0.2), 0 0 60px rgba(100, 200, 255, 0.1), inset 2px 2px 8px rgba(255, 255, 255, 0.12), inset -2px -2px 8px rgba(0, 0, 0, 0.25)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* GLOWING BORDER LAYER */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                position: "relative",
                overflow: "hidden",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(0, 0, 0, 0.5)"
                  : "0px 0px 0px 1px rgba(255, 255, 255, 0.08), 0px 12px 36px rgba(0, 0, 0, 0.4)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.6,
                }}
              />
              
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  border: "2px solid transparent",
                  background: "linear-gradient(145deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 12%, rgba(100, 200, 255, 0.4) 25%, rgba(255, 255, 255, 0.1) 37%, rgba(150, 100, 255, 0.3) 50%, rgba(255, 255, 255, 0.08) 62%, rgba(100, 200, 255, 0.35) 75%, rgba(255, 255, 255, 0.15) 87%, rgba(255, 255, 255, 0.5) 100%) border-box",
                  WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  filter: "blur(0.3px)",
                  animation: "liquid-border-pulse 8s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            disabled={disabled}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
