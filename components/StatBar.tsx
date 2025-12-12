import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-3">
    <div className="w-14 flex items-center gap-1.5 text-xs font-bold text-slate-500">
      {icon} {label}
    </div>
    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
    <div className="text-xs font-bold text-slate-900 w-6 text-right">{value}</div>
  </div>
);