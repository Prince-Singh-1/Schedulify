export const STORAGE = {
  users: 'schedulify_users_v3',
  current: 'schedulify_current_v3',
  timetable: 'schedulify_timetable_v3',
  theme: 'schedulify_theme_v3',
  classrooms: 'schedulify_classrooms_v3',
  subjects: 'schedulify_subjects_v3',
  teachers: 'schedulify_teachers_v3',
  batches: 'schedulify_batches_v3',
};

export const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

 
