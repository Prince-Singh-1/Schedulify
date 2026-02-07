import React, { useState, useEffect, useMemo } from 'react';
import { STORAGE, load, save } from './utils/storage';
import { autoGenerateTimetable } from './utils/timetableGenerator';
import Auth from './components/Auth';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import HODPanel from './components/HODPanel';
import UserTimetablePanel from './components/UserTimetablePanel';

function App() {
  const [users, setUsers] = useState(() =>
    load(STORAGE.users, [
      { username: 'admin', password: 'admin', name: 'Admin User', role: 'Admin' },
      { username: 'hod', password: 'hod', name: 'Dr. Head', role: 'HOD' },
      {
        username: 'teacher',
        password: 'teacher',
        name: 'Prof. Singh',
        role: 'Teacher',
        subjects: ['MA101'],
      },
      {
        username: 'student',
        password: 'student',
        name: 'Alice Smith',
        role: 'Student',
        batch: 'B.Tech-CSE-3',
      },
    ])
  );
  const [current, setCurrent] = useState(() => load(STORAGE.current, null));

  const [classrooms, setClassrooms] = useState(() =>
    load(STORAGE.classrooms, ['Room A', 'Room B', 'Lab 1'])
  );
  const [subjects, setSubjects] = useState(() =>
    load(STORAGE.subjects, [
      { code: 'CS101', name: 'Data Structures', hours: 4 },
      { code: 'MA101', name: 'Calculus', hours: 3 },
    ])
  );
  const [teachers, setTeachers] = useState(() =>
    load(STORAGE.teachers, [
      { username: 't1', name: 'Dr. Rao', subjects: ['CS101'] },
      { username: 't2', name: 'Prof. Singh', subjects: ['MA101'] },
    ])
  );
  const [batches, setBatches] = useState(() =>
    load(STORAGE.batches, [{ name: 'B.Tech-CSE-3', size: 60 }])
  );
  const [timetableData, setTimetableData] = useState(() =>
    load(STORAGE.timetable, { events: [], approved: false })
  );

  const [theme, setTheme] = useState(() => load(STORAGE.theme, 'light'));
  const [page, setPage] = useState(current ? 'dashboard' : 'login');
  const [modal, setModal] = useState({ show: false, title: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const showModal = (title, message) => setModal({ show: true, title, message });

  useEffect(() => {
    save(STORAGE.theme, theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => save(STORAGE.users, users), [users]);
  useEffect(() => save(STORAGE.classrooms, classrooms), [classrooms]);
  useEffect(() => save(STORAGE.subjects, subjects), [subjects]);
  useEffect(() => save(STORAGE.teachers, teachers), [teachers]);
  useEffect(() => save(STORAGE.batches, batches), [batches]);
  useEffect(() => save(STORAGE.timetable, timetableData), [timetableData]);

  const registerUser = (userObj) => {
    if (users.some((u) => u.username === userObj.username)) {
      showModal('Error', 'Username already exists. Please choose another.');
      return false;
    }
    setUsers((prev) => [...prev, userObj]);
    showModal('Success', 'Registered successfully. Please login.');
    setPage('login');
    return true;
  };

  const loginUser = (username, password, selectedRole) => {
    const found = users.find(
      (u) => u.username === username && u.password === password && u.role === selectedRole
    );
    if (!found) {
      showModal('Error', 'Invalid username, password, or role.');
      return false;
    }
    setCurrent(found);
    save(STORAGE.current, found);
    setPage('dashboard');
    return true;
  };

  const logout = () => {
    setCurrent(null);
    localStorage.removeItem(STORAGE.current);
    setPage('login');
  };

  const autoGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const events = autoGenerateTimetable(classrooms, subjects, teachers, batches);
      setTimetableData({ events, approved: false });
      setIsLoading(false);
      showModal(
        'Success',
        'Automatic timetable generation completed. Review and approve as HOD.'
      );
    }, 500);
  };

  const PageContent = () => {
    if (!current) {
      return <Auth onLogin={loginUser} onRegister={registerUser} />;
    }

    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            classrooms={classrooms}
            subjects={subjects}
            teachers={teachers}
            timetableData={timetableData}
            theme={theme}
          />
        );
      case 'admin':
        return (
          <AdminPanel
            classrooms={classrooms}
            setClassrooms={setClassrooms}
            subjects={subjects}
            setSubjects={setSubjects}
            teachers={teachers}
            setTeachers={setTeachers}
            batches={batches}
            setBatches={setBatches}
            autoGenerate={autoGenerate}
            timetableData={timetableData}
            setTimetableData={setTimetableData}
            showModal={showModal}
          />
        );
      case 'hod':
        return (
          <HODPanel
            timetableData={timetableData}
            setTimetableData={setTimetableData}
            theme={theme}
          />
        );
      case 'teacher':
        return (
          <UserTimetablePanel
            role="Teacher"
            timetableData={timetableData}
            filterKey="teacher"
            filterValue={current.name}
            theme={theme}
          />
        );
      case 'student':
        return (
          <UserTimetablePanel
            role="Student"
            timetableData={timetableData}
            filterKey="batch"
            filterValue={current.batch}
            theme={theme}
          />
        );
      default:
        return (
          <Dashboard
            classrooms={classrooms}
            subjects={subjects}
            teachers={teachers}
            timetableData={timetableData}
            theme={theme}
          />
        );
    }
  };

  const navLinks = useMemo(() => {
    const allLinks = [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutGrid', roles: ['Admin', 'HOD', 'Teacher', 'Student'] },
      { id: 'admin', label: 'Admin', icon: 'SlidersHorizontal', roles: ['Admin'] },
      { id: 'hod', label: 'HOD', icon: 'ShieldCheck', roles: ['HOD', 'Admin'] },
      { id: 'teacher', label: 'My Timetable', icon: 'UserCheck', roles: ['Teacher'] },
      { id: 'student', label: 'My Timetable', icon: 'BookUser', roles: ['Student'] },
    ];
    if (!current) return [];
    return allLinks.filter((link) => link.roles.includes(current.role));
  }, [current]);

  if (!current) {
    return (
      <>
        <PageContent />
        <Modal modal={modal} setModal={setModal} />
      </>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        current={current}
        navLinks={navLinks}
        page={page}
        setPage={setPage}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
      />

      <main className="flex-1 p-6 lg:p-8 overflow-auto bg-slate-50 dark:bg-slate-900">
        {isLoading && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <PageContent />
      </main>
      <Modal modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;


