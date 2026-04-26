"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKineticStore } from "../store/useKineticStore";
import { TerminalSquare, ShieldAlert, Zap } from "lucide-react";

export const CortexLogs = () => {
  const { logs } = useKineticStore();
  const endOfLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogStyle = (log: string) => {
    if (log.includes("[ERROR]") || log.includes("[FATAL]")) {
      return { color: "#ff6b6b", textShadow: "0 0 6px rgba(255,107,107,0.3)" };
    }
    if (log.includes("[VACUUM]")) {
      return { color: "#b7c8ff", textShadow: "0 0 6px rgba(183,200,255,0.3)" };
    }
    if (log.includes("[TELEMETRY]")) {
      return { color: "#fbbf24", textShadow: "0 0 6px rgba(251,191,36,0.3)" };
    }
    if (log.includes("[STRIKE]")) {
      return { color: "#4fd1c5", textShadow: "0 0 6px rgba(79,209,197,0.3)", fontWeight: "bold" };
    }
    if (log.includes("[SUCCESS]")) {
      return { color: "#4fd1c5", textShadow: "0 0 6px rgba(79,209,197,0.3)", fontWeight: "bold" };
    }
    return { color: "rgba(183, 200, 255, 0.6)", textShadow: "0 0 6px rgba(183, 200, 255, 0.18)" };
  };

  const getLogIcon = (log: string) => {
    if (log.includes("[VACUUM]")) return <ShieldAlert className="w-3.5 h-3.5 inline mr-2 text-[#b7c8ff]" style={{ filter: "drop-shadow(0 0 4px rgba(183,200,255,0.3))" }} />;
    if (log.includes("[STRIKE]") || log.includes("[SUCCESS]")) return <Zap className="w-3.5 h-3.5 inline mr-2 text-[#4fd1c5]" style={{ filter: "drop-shadow(0 0 4px rgba(79,209,197,0.3))" }} />;
    return <TerminalSquare className="w-3.5 h-3.5 inline mr-2" style={{ color: "rgba(183, 200, 255, 0.4)" }} />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="w-full max-w-[860px] mx-auto relative rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
    >
      {/* SHIMMERING BORDER: Liquid Metal Edge */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none z-30"
        style={{
          border: "1.5px solid transparent",
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, rgba(100, 200, 255, 0.15) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(150, 100, 255, 0.15) 75%, rgba(255, 255, 255, 0.3) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "liquid-border-pulse 10s ease-in-out infinite",
        }}
      />

      {/* TERMINAL CONTAINER */}
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden z-20 flex flex-col"
        style={{
          background: 'linear-gradient(165deg, rgba(183, 200, 255, 0.03), rgba(0, 0, 0, 0.85))',
          backdropFilter: 'blur(40px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
          border: '1px solid rgba(183, 200, 255, 0.12)',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(183, 200, 255, 0.05)',
        }}
      >
        {/* Header / Tab Bar */}
        <div className="flex justify-between items-center px-4 h-8 border-b border-[#b7c8ff]/10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
            <div className="w-2 h-2 rounded-full bg-[#b7c8ff]/20 shadow-[0_0_5px_rgba(183,200,255,0.1)]" />
          </div>
          
          <div 
            className="text-[8px] uppercase tracking-[0.25em] font-bold font-microgramma"
            style={{ color: `rgba(183,200,255,0.6)`, textShadow: `0 0 10px rgba(183,200,255,0.3)` }}
          >
            ... Spacedeck Telemetry
          </div>
          
          <div className="flex items-center gap-2 pr-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5] animate-pulse shadow-[0_0_8px_rgba(79,209,197,0.6)]"></div>
            <span 
              className="text-[8px] tracking-[0.25em] text-[#4fd1c5] font-microgramma font-bold uppercase opacity-90"
              style={{ textShadow: "0 0 10px rgba(79,209,197,0.3)" }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* Console Readout */}
        <div className="h-[460px] overflow-y-auto px-5 py-4 font-mono text-[11px] relative custom-scrollbar">
          {/* Subtle Scanline Overlay for IDE flavor */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-0 pointer-events-none opacity-[0.03]" style={{ backgroundSize: '100% 2px, 3px 100%' }} />
          
          <div className="relative z-10 flex flex-col gap-0 space-y-0.5">
            <AnimatePresence initial={false}>
              {logs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[11px] text-center mt-10"
                  style={{ color: "rgba(183, 200, 255, 0.4)", textShadow: "0 0 6px rgba(183, 200, 255, 0.2)" }}
                >
                  <span className="animate-pulse">Awaiting intent stream...</span>
                </motion.div>
              ) : (
                logs.map((log, idx) => {
                  const styleProps = getLogStyle(log);
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-0 leading-[1.7] min-h-[1.4em]"
                    >
                      <span 
                        className="font-mono text-[10px] font-bold shrink-0 w-[65px] text-right mr-2 select-none"
                        style={{ color: "#b7c8ff", opacity: 0.9, textShadow: "0 0 8px rgba(183,200,255,0.4)" }}
                      >
                        {new Date().toISOString().split('T')[1].slice(0, 8)}
                      </span>
                      <span className="shrink-0 mt-[1px]">{getLogIcon(log)}</span>
                      <span className="font-mono text-[11px] flex-1" style={styleProps}>
                        {log}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
            <div ref={endOfLogsRef} className="h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
