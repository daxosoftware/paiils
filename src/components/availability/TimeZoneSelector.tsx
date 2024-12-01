import React from 'react';
import { Globe } from 'lucide-react';

interface TimeZoneSelectorProps {
  value: string;
  onChange: (timeZone: string) => void;
}

export function TimeZoneSelector({ value, onChange }: TimeZoneSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
      >
        {Intl.supportedValuesOf('timeZone').map((tz) => (
          <option key={tz} value={tz}>
            {tz.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}