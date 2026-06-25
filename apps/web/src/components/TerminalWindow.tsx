import React from 'react';
import { use3DTilt } from '../hooks/use3DTilt';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  noTilt?: boolean;
}

export default function TerminalWindow({
  title = 'bash',
  children,
  className = '',
  maxTilt = 6,
  noTilt = false,
}: TerminalWindowProps) {
  const tiltRef = use3DTilt(noTilt ? 0 : maxTilt);

  return (
    <div
      ref={noTilt ? undefined : tiltRef as React.RefObject<HTMLDivElement>}
      className={`terminal-window ${noTilt ? '' : 'tilt-active'} ${className}`}
    >
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <h3 className="terminal-title">{title}</h3>
      </div>
      <div className="terminal-content">{children}</div>
    </div>
  );
}

