import React from 'react';
import * as LucideIcons from 'lucide-react';

const StatCard = ({ title, value, icon }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Activity;

  return (
    <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center gap-4">
      <div className="p-3 bg-teal-100 dark:bg-teal-900/40 rounded-full">
        <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-400" />
      </div>
      <div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;

 
