
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full', size = 'md' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  const symbolSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Símbolo Marcante */}
      <div className={`${symbolSize[size]} relative flex items-center justify-center`}>
        {/* Background do Símbolo com Gradiente Sutil */}
        <div className="absolute inset-0 bg-indigo-600 rounded-xl rotate-3 opacity-10"></div>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`${symbolSize[size]} relative z-10`}
        >
          {/* Arco Externo do C */}
          <path 
            d="M30 10C27.5 7.5 24 6 20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34C24 34 27.5 32.5 30 30" 
            stroke="#4F46E5" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Arco Interno/Núcleo */}
          <path 
            d="M24 20C24 17.7909 22.2091 16 20 16C17.7909 16 16 17.7909 16 20C16 22.2091 17.7909 24 20 24" 
            fill="#4F46E5" 
          />
          {/* Spark de Clareza */}
          <circle cx="30" cy="20" r="3" fill="#6366F1" />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className={`font-black tracking-tight text-slate-900 ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>
              MENTAL<span className="text-indigo-600">PHARMA</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              CLUB 2.0
            </span>
            <span className="h-px w-4 bg-slate-200"></span>
            <span className="text-[10px] font-medium text-indigo-500 uppercase tracking-wider">
              CONSCIUS
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
