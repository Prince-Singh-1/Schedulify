import React from 'react';
import StatCard from './StatCard';
import SubjectDistributionChart from './SubjectDistributionChart';

const Dashboard = ({ classrooms, subjects, teachers, timetableData, theme }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Classrooms" value={classrooms.length} icon="School" />
        <StatCard title="Total Subjects" value={subjects.length} icon="BookOpen" />
        <StatCard title="Total Teachers" value={teachers.length} icon="Users" />
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Subject Distribution</h3>
        {timetableData.events.length > 0 ? (
          <SubjectDistributionChart events={timetableData.events} theme={theme} />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No timetable data available to display chart.</p>
            <p className="text-slate-400 text-sm">Generate a timetable in the Admin Panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

 
