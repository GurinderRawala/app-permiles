// Date utilities for formatting and parsing dates across the app.

/**
 * Formats a Date instance into `YYYY-MM-DD`.
 * Returns an empty string when the input is not a valid Date.
 */
export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns the number of full days between two dates (b - a).
 */
export const daysBetween = (a: Date, b: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = b.getTime() - a.getTime();
  return Math.floor(diff / msPerDay);
};

/**
 * Parses an ISO date string into a Date or returns null when invalid.
 */
export const parseISODate = (value: string): Date | null => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};
