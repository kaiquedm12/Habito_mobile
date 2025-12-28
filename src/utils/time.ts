export const minutesToHours = (minutes: number) => minutes / 60;

export const formatMinutes = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  return `${hrs}h ${mins.toString().padStart(2, "0")}`;
};

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

export const nowIso = () => new Date().toISOString();

export const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isSameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();

export const isWithinDays = (date: Date, days: number) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const daysDiff = diff / (1000 * 60 * 60 * 24);
  return daysDiff <= days;
};

export const timeframeDays = {
  daily: 1,
  weekly: 7,
  monthly: 30,
} as const;
