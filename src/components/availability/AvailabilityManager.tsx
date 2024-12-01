import React, { useState } from 'react';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { TimeZoneSelector } from './TimeZoneSelector';
import { NotificationCenter } from './NotificationCenter';
import { useTimeZone } from '../../hooks/useTimeZone';
import { useNotifications } from '../../hooks/useNotifications';
import type { AvailabilitySlot } from '../../types';

export function AvailabilityManager() {
  const { timeZone, setTimeZone } = useTimeZone();
  const { addNotification } = useNotifications();
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);

  const handleSlotSelect = (start: Date, end: Date) => {
    const newSlot: AvailabilitySlot = {
      day: start.toISOString().split('T')[0],
      startTime: start.toTimeString().slice(0, 5),
      endTime: end.toTimeString().slice(0, 5),
    };

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    addNotification({
      type: 'system',
      message: `New availability slot added: ${newSlot.startTime} - ${newSlot.endTime}`,
    });
  };

  const handleSlotDelete = (slotId: string) => {
    const [day, startTime, endTime] = slotId.split('-');
    setAvailabilitySlots(
      availabilitySlots.filter(
        (slot) =>
          !(
            slot.day === day &&
            slot.startTime === startTime &&
            slot.endTime === endTime
          )
      )
    );
    addNotification({
      type: 'system',
      message: `Availability slot removed: ${startTime} - ${endTime}`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <TimeZoneSelector value={timeZone} onChange={setTimeZone} />
        <NotificationCenter />
      </div>

      <AvailabilityCalendar
        availabilitySlots={availabilitySlots}
        onSlotSelect={handleSlotSelect}
        onSlotDelete={handleSlotDelete}
      />
    </div>
  );
}