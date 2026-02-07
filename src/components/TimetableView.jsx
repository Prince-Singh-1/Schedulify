import React, { useMemo, useState } from 'react';
import { DEFAULT_DAYS, DEFAULT_SLOTS, getColorForSubject } from '../utils/constants';

const FilterSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs font-semibold text-slate-500">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm"
    >
      <option value="all">All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const TimetableView = ({ events, theme, isPreview = false }) => {
  const [filter, setFilter] = useState({ batch: 'all', teacher: 'all', room: 'all' });
  const isDark = theme === 'dark';

  const unique = (key) => [...new Set(events.map((e) => e[key]).filter(Boolean))].sort();
  const batches = useMemo(() => unique('batch'), [events]);
  const teachers = useMemo(() => unique('teacher'), [events]);
  const classrooms = useMemo(() => unique('classroom'), [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(
      (e) =>
        (filter.batch === 'all' || e.batch === filter.batch) &&
        (filter.teacher === 'all' || e.teacher === filter.teacher) &&
        (filter.room === 'all' || e.classroom === filter.room)
    );
  }, [events, filter]);

  const map = useMemo(() => {
    const eventMap = {};
    filteredEvents.forEach((e) => {
      const key = `${e.day}||${e.time}`;
      eventMap[key] = eventMap[key] || [];
      eventMap[key].push(e);
    });
    return eventMap;
  }, [filteredEvents]);

  return (
    <div>
      {!isPreview && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <FilterSelect
            label="Batch"
            value={filter.batch}
            onChange={(e) => setFilter((f) => ({ ...f, batch: e.target.value }))}
            options={batches}
          />
          <FilterSelect
            label="Teacher"
            value={filter.teacher}
            onChange={(e) => setFilter((f) => ({ ...f, teacher: e.target.value }))}
            options={teachers}
          />
          <FilterSelect
            label="Room"
            value={filter.room}
            onChange={(e) => setFilter((f) => ({ ...f, room: e.target.value }))}
            options={classrooms}
          />
        </div>
      )}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
        <div
          className="grid min-w-[1000px]"
          style={{ gridTemplateColumns: `80px repeat(${DEFAULT_DAYS.length}, 1fr)` }}
        >
          <div className="font-semibold p-3 text-sm sticky left-0 bg-slate-100 dark:bg-slate-800"></div>
          {DEFAULT_DAYS.map((d) => (
            <div
              key={d}
              className="font-semibold p-3 text-sm text-center border-b border-slate-200 dark:border-slate-700"
            >
              {d}
            </div>
          ))}
          {DEFAULT_SLOTS.map((slot) => (
            <React.Fragment key={slot}>
              <div className="p-3 font-semibold text-sm sticky left-0 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                {slot}
              </div>
              {DEFAULT_DAYS.map((day) => {
                const cellEvents = map[`${day}||${slot}`] || [];
                return (
                  <div
                    key={`${day}-${slot}`}
                    className="p-2 border-l border-t border-slate-200 dark:border-slate-700"
                  >
                    {cellEvents.length > 0 ? (
                      <div className="space-y-2">
                        {cellEvents.map((ev, idx) => {
                          const colors = getColorForSubject(ev.subject, isDark);
                          return (
                            <div
                              key={idx}
                              className={`p-2 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}
                            >
                              <div className="font-bold text-sm">{ev.subject}</div>
                              <div className="text-xs opacity-80">{ev.teacher}</div>
                              <div className="text-xs opacity-80 font-medium">{ev.batch}</div>
                              <div className="text-xs opacity-80">{ev.classroom}</div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="w-full h-24"></div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableView;

 
