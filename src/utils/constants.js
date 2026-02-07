export const DEFAULT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const DEFAULT_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

export const SUBJECT_COLORS = [
  { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
  { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200' },
  { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' },
  { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
  { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-200' },
  { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-200' },
  { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
  { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' },
];

export const darkColor = (colorSet) => ({
  bg: colorSet.bg.replace('-100', '-900/40'),
  text: colorSet.text.replace('-800', '-200'),
  border: colorSet.border.replace('-200', '-700'),
});

export const getColorForSubject = (subjectName, isDark) => {
  if (!subjectName || subjectName.includes('Unscheduled')) {
    return isDark ? darkColor(SUBJECT_COLORS[9]) : SUBJECT_COLORS[9];
  }
  let hash = 0;
  for (let i = 0; i < subjectName.length; i++) {
    hash = subjectName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % (SUBJECT_COLORS.length - 1);
  const colorSet = SUBJECT_COLORS[index];
  return isDark ? darkColor(colorSet) : colorSet;
};

 
