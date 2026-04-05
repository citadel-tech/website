import { useState, useEffect } from 'react';

export default function TerminalWindow({ commands, title = 'Terminal' }) {
  const lines = commands;

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden bg-[var(--navy)] border border-[var(--blue-l)]">
      {/* Mac-like Header */}
      <div className="flex items-center px-4 py-3 bg-[var(--blue-l)]/30 border-b border-[var(--blue-l)] relative">
        <div className="flex space-x-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs flex-1 text-center font-mono text-[var(--cream)]/60 font-semibold tracking-widest">{title}</div>
      </div>

      {/* Terminal Body */}
      <div className="relative p-6 font-mono text-sm sm:text-base text-cream/80 min-h-[300px]">
        {/* Content */}
        <div className="space-y-2 relative z-20">
          {lines.map((line, idx) => (
            <div key={idx} className={`${line.type === 'error' ? 'text-red-400' : line.type === 'success' ? 'text-[var(--green)]' : line.type === 'info' ? 'text-blue-400' : 'text-cream'}`}>
              {line.type === 'input' ? <span className="text-[var(--green)] mr-2">$</span> : null}
              {line.text}
            </div>
          ))}
          <div className="text-cream">
            <span className="text-[var(--green)] mr-2">$</span>
            <span className="inline-block w-2.5 h-4 bg-cream ml-1 translate-y-0.5"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
