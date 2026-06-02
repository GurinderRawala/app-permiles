// String utility helpers used across the app.

/**
 * Capitalizes the first character of the given string.
 */
export const capitalize = (value: string): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Truncates a string to `max` characters, appending an ellipsis if truncated.
 */
export const truncate = (value: string, max: number): string => {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
};

/**
 * Naive slug generator (lowercase, dashes for non-alnum).
 */
export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
