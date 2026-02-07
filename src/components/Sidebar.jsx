import React from 'react';
import { CalendarCheck, LogOut, Moon, Sun } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Sidebar = ({ current, navLinks, page, setPage, theme, setTheme, logout }) => {
  return (
    <aside className="w-64 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700/60 flex flex-col transition-all duration-300">
      <div className="flex items-center gap-3 mb-8 px-2">
        <CalendarCheck className="w-8 h-8 text-teal-600" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Schedulify</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const IconComponent = LucideIcons[link.icon] || LucideIcons.Activity;
          return (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`sidebar-link w-full ${page === link.id ? 'active' : ''}`}
            >
              <IconComponent className="w-5 h-5" />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50">
          <div>
            <strong className="block text-sm font-semibold">{current.name}</strong>
            <div className="text-xs text-slate-500 dark:text-slate-400">{current.role}</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

 
