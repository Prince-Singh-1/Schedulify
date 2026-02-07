import React, { useState } from 'react';
import { Moon, Sun, SlidersHorizontal, ShieldCheck, UserCheck, BookUser } from 'lucide-react';
import { STORAGE, save } from '../utils/storage';

const Auth = ({ onLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [batch, setBatch] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      if (!name || !username || !password) return;
      const userObj = { name, username, password, role };
      if (role === 'Student') userObj.batch = batch || 'B.Tech-CSE-3';
      onRegister(userObj);
    } else {
      onLogin(username, password, role);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    save(STORAGE.theme, newTheme);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <h2 className="text-4xl font-extrabold text-center text-slate-800 dark:text-white mt-4">
          {isRegisterMode ? 'Join Schedulify' : 'Welcome to Schedulify'}
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
          {isRegisterMode
            ? 'Create your account to get started.'
            : 'Sign in to access your timetable and manage schedules.'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isRegisterMode && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={`role-select-btn ${role === 'Admin' ? 'selected' : ''}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('HOD')}
                className={`role-select-btn ${role === 'HOD' ? 'selected' : ''}`}
              >
                <ShieldCheck className="w-5 h-5" />
                HOD
              </button>
              <button
                type="button"
                onClick={() => setRole('Teacher')}
                className={`role-select-btn ${role === 'Teacher' ? 'selected' : ''}`}
              >
                <UserCheck className="w-5 h-5" />
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole('Student')}
                className={`role-select-btn ${role === 'Student' ? 'selected' : ''}`}
              >
                <BookUser className="w-5 h-5" />
                Student
              </button>
            </div>
          )}

          {isRegisterMode && (
            <input
              placeholder="Full Name"
              required
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            placeholder="Username"
            required
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isRegisterMode && (
            <>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                <option>Admin</option>
                <option>HOD</option>
                <option>Teacher</option>
                <option>Student</option>
              </select>
              {role === 'Student' && (
                <input
                  placeholder="Batch/Class"
                  className="input-field"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              )}
            </>
          )}
          
          <button type="submit" className="btn-primary w-full shadow-lg">
            {isRegisterMode ? 'Register Account' : 'Login'}
          </button>
        </form>
        
        <p className="text-sm text-center text-slate-500 dark:text-slate-400">
          {isRegisterMode ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsRegisterMode((prev) => !prev)}
            className="font-semibold text-teal-600 hover:underline"
          >
            {isRegisterMode ? 'Login' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

 
