// src/utils/formatDate.ts
export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return 'Invalid date';

    // Parse the date string and create a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Format the date using Intl.DateTimeFormat for consistent formatting
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Use UTC to avoid timezone issues
    });

    return formatter.format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};