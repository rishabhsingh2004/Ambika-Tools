import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=complete, 2=exit
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase(1);
          setTimeout(() => {
            setPhase(2);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        // Ease-out acceleration
        const remaining = 100 - prev;
        return prev + Math.max(0.5, remaining * 0.06);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 100%)',
        opacity: phase === 2 ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      {/* Grid mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Ambient orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        top: '20%', left: '10%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)',
        filter: 'blur(60px)',
        animation: 'loaderOrb1 4s ease-in-out infinite'
      }} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none" style={{
        bottom: '10%', right: '15%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)',
        filter: 'blur(50px)',
        animation: 'loaderOrb2 5s ease-in-out infinite'
      }} />

      {/* Center content */}
      <div className="relative text-center px-6">
        {/* Spinning rings */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full" style={{
            border: '2px solid rgba(59,130,246,0.15)',
            borderTopColor: 'rgba(96,165,250,0.8)',
            animation: 'spin 1.8s linear infinite',
          }} />
          {/* Middle ring */}
          <div className="absolute rounded-full" style={{
            top: '12%', left: '12%', right: '12%', bottom: '12%',
            border: '2px solid rgba(99,102,241,0.1)',
            borderBottomColor: 'rgba(165,180,252,0.7)',
            animation: 'spin-reverse 2.4s linear infinite',
          }} />
          {/* Inner ring */}
          <div className="absolute rounded-full" style={{
            top: '24%', left: '24%', right: '24%', bottom: '24%',
            border: '1.5px solid rgba(59,130,246,0.1)',
            borderLeftColor: 'rgba(96,165,250,0.6)',
            animation: 'spin 1.2s linear infinite',
          }} />
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            boxShadow: '0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
        </div>

        {/* Logo text */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black font-poppins text-xl"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}>
              A
            </div>
            <span className="font-poppins font-black text-2xl text-white tracking-tight">
              Ambika Tools
            </span>
          </div>
          <p className="text-blue-300/60 text-xs font-semibold uppercase tracking-[0.25em]">
            Precision Machines
          </p>
        </div>

        {/* Status text */}
        <p className="text-blue-200/70 text-sm font-medium mb-6" style={{
          animation: 'loaderTextPulse 2s ease-in-out infinite',
        }}>
          {phase === 1 ? 'Ready.' : 'Initializing Ambika Tools Experience…'}
        </p>

        {/* Progress bar */}
        <div className="w-56 mx-auto">
          <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563eb, #6366f1, #8b5cf6)',
                boxShadow: '0 0 12px rgba(99,102,241,0.5)',
              }}
            />
          </div>
          <p className="text-blue-400/40 text-[10px] font-mono mt-2 tracking-wider">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-blue-500/20 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-blue-500/20 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-blue-500/20 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-blue-500/20 rounded-br-lg" />
    </div>
  );
};

export default LoadingScreen;
