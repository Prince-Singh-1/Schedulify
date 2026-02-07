import React, { useState } from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import TimetableView from './TimetableView';

const DataCard = ({ title, data, children, onAdd, showModal }) => {
  const handleAdd = (e) => {
    e.preventDefault();
    onAdd();
    showModal('Success', `${title.slice(0, -1)} added successfully.`);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <ul className="space-y-2 mb-4 h-40 overflow-y-auto pr-2">
        {data.map((item, i) => (
          <li key={i} className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md">
            <p className="font-semibold">{item.main}</p>
            {item.sub && <p className="text-xs text-slate-500">{item.sub}</p>}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="space-y-2">
        {children}
        <button type="submit" className="btn-primary w-full">
          Add {title.slice(0, -1)}
        </button>
      </form>
    </div>
  );
};

const ManageDataPanel = ({
  classrooms,
  setClassrooms,
  subjects,
  setSubjects,
  teachers,
  setTeachers,
  batches,
  setBatches,
  showModal,
}) => {
  const addToList = (setter, item, reset) => {
    setter((prev) => [...prev, item]);
    reset();
  };

  const [roomName, setRoomName] = useState('');
  const [sub, setSub] = useState({ code: '', name: '', hours: 3 });
  const [teacher, setTeacher] = useState({ name: '', username: '', subjects: '' });
  const [batch, setBatch] = useState({ name: '', size: 60 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DataCard
        title="Classrooms"
        data={classrooms.map((c) => ({ main: c }))}
        onAdd={() => addToList(setClassrooms, roomName, () => setRoomName(''))}
        showModal={showModal}
      >
        <input
          className="input-field"
          placeholder="New room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </DataCard>

      <DataCard
        title="Subjects"
        data={subjects.map((s) => ({ main: `${s.code} - ${s.name}`, sub: `${s.hours}h/week` }))}
        onAdd={() => addToList(setSubjects, sub, () => setSub({ code: '', name: '', hours: 3 }))}
        showModal={showModal}
      >
        <input
          className="input-field"
          placeholder="Code (e.g., CS101)"
          value={sub.code}
          onChange={(e) => setSub((s) => ({ ...s, code: e.target.value }))}
        />
        <input
          className="input-field"
          placeholder="Name"
          value={sub.name}
          onChange={(e) => setSub((s) => ({ ...s, name: e.target.value }))}
        />
        <input
          type="number"
          className="input-field"
          placeholder="Hours per week"
          value={sub.hours}
          onChange={(e) => setSub((s) => ({ ...s, hours: Number(e.target.value) }))}
        />
      </DataCard>

      <DataCard
        title="Teachers"
        data={teachers.map((t) => ({
          main: `${t.name} (${t.username})`,
          sub: (t.subjects || []).join(', '),
        }))}
        onAdd={() =>
          addToList(
            setTeachers,
            { ...teacher, subjects: teacher.subjects.split(',').map((s) => s.trim()).filter(Boolean) },
            () => setTeacher({ name: '', username: '', subjects: '' })
          )
        }
        showModal={showModal}
      >
        <input
          className="input-field"
          placeholder="Full name"
          value={teacher.name}
          onChange={(e) => setTeacher((t) => ({ ...t, name: e.target.value }))}
        />
        <input
          className="input-field"
          placeholder="Username"
          value={teacher.username}
          onChange={(e) => setTeacher((t) => ({ ...t, username: e.target.value }))}
        />
        <input
          className="input-field"
          placeholder="Subject codes (comma-separated)"
          value={teacher.subjects}
          onChange={(e) => setTeacher((t) => ({ ...t, subjects: e.target.value }))}
        />
      </DataCard>

      <DataCard
        title="Batches"
        data={batches.map((b) => ({ main: b.name, sub: `Size: ${b.size}` }))}
        onAdd={() => addToList(setBatches, batch, () => setBatch({ name: '', size: 60 }))}
        showModal={showModal}
      >
        <input
          className="input-field"
          placeholder="Batch name"
          value={batch.name}
          onChange={(e) => setBatch((b) => ({ ...b, name: e.target.value }))}
        />
      </DataCard>
    </div>
  );
};

const GeneratorPanel = ({ autoGenerate, handleClear, timetableData }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-bold mb-4">Generate & View Timetable</h3>
    <p className="text-slate-500 mb-6">
      Use the rule-based generator to create a new timetable. Any existing timetable will be
      overwritten.
    </p>
    <div className="flex flex-wrap gap-4 mb-8">
      <button onClick={autoGenerate} className="btn-primary flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Auto Generate Timetable
      </button>
      <button onClick={handleClear} className="btn-danger flex items-center gap-2">
        <Trash2 className="w-4 h-4" />
        Clear Timetable
      </button>
    </div>
    <TimetableView events={timetableData.events} theme="light" isPreview={true} />
  </div>
);

const AdminPanel = ({
  classrooms,
  setClassrooms,
  subjects,
  setSubjects,
  teachers,
  setTeachers,
  batches,
  setBatches,
  autoGenerate,
  timetableData,
  setTimetableData,
  showModal,
}) => {
  const [activeTab, setActiveTab] = useState('manage');

  const handleClear = () => {
    setTimetableData({ events: [], approved: false });
    showModal('Success', 'Timetable has been cleared.');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'manage'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-slate-500'
          }`}
        >
          Manage Data
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'generator'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-slate-500'
          }`}
        >
          Timetable Generator
        </button>
      </div>

      {activeTab === 'manage' && (
        <ManageDataPanel
          {...{ classrooms, setClassrooms, subjects, setSubjects, teachers, setTeachers, batches, setBatches, showModal }}
        />
      )}
      {activeTab === 'generator' && (
        <GeneratorPanel {...{ autoGenerate, handleClear, timetableData }} />
      )}
    </div>
  );
};

export default AdminPanel;

 
