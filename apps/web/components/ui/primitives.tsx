import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 
 * Utility for high-fidelity class merging 
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 
 * Glass Panel Variant Engine 
 */
export const panelVariants = cva(
  "relative overflow-hidden transition-all duration-500",
  {
    variants: {
      intensity: {
        light: "bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-xl",
        heavy: "bg-black/60 backdrop-blur-2xl border-2 border-white/5 shadow-2xl",
        gevurah: "bg-purple-500/10 backdrop-blur-3xl border border-purple-500/30 glow-purple",
        tactical: "bg-green-500/5 backdrop-blur-xl border border-green-500/20",
      },
      rounded: {
        none: "rounded-none",
        md: "rounded-2xl",
        lg: "rounded-[2.5rem]",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      intensity: "light",
      rounded: "md",
    },
  }
);

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}
