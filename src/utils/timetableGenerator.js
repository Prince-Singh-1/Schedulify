import { DEFAULT_DAYS, DEFAULT_SLOTS } from './constants';

export const autoGenerateTimetable = (classrooms, subjects, teachers, batches) => {
  const days = DEFAULT_DAYS.slice();
  const slots = DEFAULT_SLOTS.slice();
  const rooms = classrooms.length ? classrooms.slice() : ['Room A'];

  const sessions = [];
  for (const b of batches) {
    for (const s of subjects) {
      const count = Math.max(1, Math.round(s.hours));
      for (let i = 0; i < count; i++) {
        sessions.push({ subjectCode: s.code, subjectName: s.name, batch: b.name });
      }
    }
  }

  const teachersBySubject = {};
  for (const t of teachers) {
    for (const sc of t.subjects || []) {
      teachersBySubject[sc] = teachersBySubject[sc] || [];
      teachersBySubject[sc].push(t);
    }
  }

  const teacherOcc = {};
  const batchOcc = {};
  const roomOcc = {};
  
  for (const t of teachers) {
    teacherOcc[t.username] = days.map(() => Array(slots.length).fill(false));
  }
  for (const b of batches) {
    batchOcc[b.name] = days.map(() => Array(slots.length).fill(false));
  }
  for (const r of rooms) {
    roomOcc[r] = days.map(() => Array(slots.length).fill(false));
  }
  
  const teacherLoad = {};
  for (const t of teachers) {
    teacherLoad[t.username] = 0;
  }
  
  const events = [];

  sessions.sort((a, b) => {
    const ta = (teachersBySubject[a.subjectCode] || []).length;
    const tb = (teachersBySubject[b.subjectCode] || []).length;
    if (ta !== tb) return ta - tb;
    return Math.random() - 0.5;
  });

  let dayOffset = 0;
  for (const session of sessions) {
    const possibleTeachers = teachersBySubject[session.subjectCode] || [];
    if (possibleTeachers.length === 0) {
      events.push({
        day: 'Unscheduled',
        time: '-',
        subject: session.subjectName + ' (no teacher)',
        teacher: 'TBD',
        classroom: 'TBD',
        batch: session.batch
      });
      continue;
    }

    possibleTeachers.sort((a, b) => (teacherLoad[a.username] || 0) - (teacherLoad[b.username] || 0));

    let placed = false;
    for (let dTry = 0; dTry < days.length && !placed; dTry++) {
      const dIdx = (dayOffset + dTry) % days.length;
      const slotOrder = [...Array(slots.length).keys()].sort(() => Math.random() - 0.5);
      
      for (const sIdx of slotOrder) {
        const prevEvent = events.find(
          ev => ev.day === days[dIdx] && 
          ev.time === slots[sIdx - 1] && 
          ev.batch === session.batch && 
          ev.subject === session.subjectName
        );
        if (prevEvent) continue;

        let chosenRoom = null;
        for (const r of rooms) {
          if (!roomOcc[r][dIdx][sIdx]) {
            chosenRoom = r;
            break;
          }
        }
        if (!chosenRoom) continue;

        let chosenTeacher = null;
        for (const t of possibleTeachers) {
          if (
            teacherOcc[t.username] &&
            !teacherOcc[t.username][dIdx][sIdx] &&
            !batchOcc[session.batch][dIdx][sIdx]
          ) {
            chosenTeacher = t;
            break;
          }
        }
        if (!chosenTeacher) continue;

        teacherOcc[chosenTeacher.username][dIdx][sIdx] = true;
        batchOcc[session.batch][dIdx][sIdx] = true;
        roomOcc[chosenRoom][dIdx][sIdx] = true;
        teacherLoad[chosenTeacher.username] = (teacherLoad[chosenTeacher.username] || 0) + 1;

        events.push({
          day: days[dIdx],
          time: slots[sIdx],
          subject: session.subjectName,
          teacher: chosenTeacher.name,
          classroom: chosenRoom,
          batch: session.batch,
        });
        placed = true;
        break;
      }
    }
    dayOffset = (dayOffset + 1) % days.length;
    if (!placed) {
      events.push({
        day: 'Unscheduled',
        time: '-',
        subject: session.subjectName + ' (unsched)',
        teacher: 'TBD',
        classroom: 'TBD',
        batch: session.batch
      });
    }
  }
  
  return events;
};

 
