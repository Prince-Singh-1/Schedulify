import React from 'react';
import { Check, X, CheckCircle2 } from 'lucide-react';
import TimetableView from './TimetableView';

const HODPanel = ({ timetableData, setTimetableData, theme }) => {
  const { events, approved } = timetableData;

  const approve = () => setTimetableData((prev) => ({ ...prev, approved: true }));
  const reject = () => setTimetableData({ events: [], approved: false });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">HOD Panel</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">Review Timetable</h3>
            <p className="text-slate-500">
              Please review the generated timetable and approve or reject it.
            </p>
          </div>
          {events.length > 0 &&
            (!approved ? (
              <div className="flex gap-2">
                <button onClick={approve} className="btn-success flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button onClick={reject} className="btn-danger flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            ) : (
              <div className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-sm font-semibold rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Approved
              </div>
            ))}
        </div>

        {events.length === 0 ? (
          <p className="text-center py-12 text-slate-500">No timetable generated yet.</p>
        ) : (
          <TimetableView events={events} theme={theme} />
        )}
      </div>
    </div>
  );
};

export default HODPanel;

 
