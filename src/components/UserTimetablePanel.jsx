import React from 'react';
import TimetableView from './TimetableView';

const UserTimetablePanel = ({ role, timetableData, filterKey, filterValue, theme }) => {
  const { events, approved } = timetableData;
  const myEvents = approved ? events.filter((e) => e[filterKey] === filterValue) : [];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{role} Panel</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">My Timetable</h3>
        {!approved ? (
          <p className="text-center py-12 text-slate-500">
            The timetable has not been approved by the HOD yet.
          </p>
        ) : myEvents.length === 0 ? (
          <p className="text-center py-12 text-slate-500">
            You have no classes assigned in the approved timetable.
          </p>
        ) : (
          <TimetableView events={myEvents} theme={theme} />
        )}
      </div>
    </div>
  );
};

export default UserTimetablePanel;

 
