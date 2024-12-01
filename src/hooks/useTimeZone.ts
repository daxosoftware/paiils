import { useState, useEffect } from 'react';
import { format, formatInTimeZone } from 'date-fns-tz';

export function useTimeZone() {
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const formatDate = (date: Date | string, formatString: string) => {
    return format(new Date(date), formatString);
  };

  const formatDateInTimeZone = (date: Date | string, formatString: string, tz: string = timeZone) => {
    return formatInTimeZone(new Date(date), tz, formatString);
  };

  return {
    timeZone,
    setTimeZone,
    formatDate,
    formatInTimeZone: formatDateInTimeZone,
  };
}