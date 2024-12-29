// src/__tests__/utils/formatDate.test.ts
import { formatDate } from '@/utils/formatDate';
import { describe, it, expect } from 'vitest';

describe('formatDate', () => {
  // Test single date formatting
  it('formats date correctly', () => {
    // Create date using UTC to avoid timezone issues
    const date = new Date(Date.UTC(2024, 0, 2)); // Note: month is 0-based
    const formatted = formatDate(date.toISOString());
    expect(formatted).toBe('January 2, 2024');
  });

  // Test timezone handling
  it('handles timezone conversions correctly', () => {
    const dates = [
      '2024-01-02T00:00:00.000Z',
      '2024-01-02T12:00:00.000Z',
      '2024-01-02T23:59:59.999Z'
    ];

    dates.forEach(dateString => {
      const formatted = formatDate(dateString);
      expect(formatted).toBe('January 2, 2024');
    });
  });

  // Test various date string formats
  it('handles different date string formats', () => {
    const date = new Date(Date.UTC(2024, 0, 2));
    const dateFormats = [
      date.toISOString(),           // ISO string
      date.toUTCString(),           // UTC string
      date.toString(),              // Local string
      '2024-01-02',                 // Simple date string
      '2024-01-02T00:00:00.000Z'   // ISO string with time
    ];

    dateFormats.forEach(dateStr => {
      const formatted = formatDate(dateStr);
      expect(formatted).toBe('January 2, 2024');
    });
  });

  // Test error handling
  it('handles invalid dates gracefully', () => {
    const invalidDates = [
      'invalid-date',
      '',
      null,
      undefined
    ];

    invalidDates.forEach(invalidDate => {
      // @ts-ignore - Testing invalid inputs
      expect(() => formatDate(invalidDate)).not.toThrow();
      // @ts-ignore - Testing invalid inputs
      const result = formatDate(invalidDate);
      expect(result).toBe('Invalid date');
    });
  });
});