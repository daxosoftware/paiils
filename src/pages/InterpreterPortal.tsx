import React, { useState, useEffect } from 'react';
import { AvailabilityCalendar } from '../components/availability/AvailabilityCalendar';
import { TimeZoneSelector } from '../components/availability/TimeZoneSelector';
import { NotificationCenter } from '../components/availability/NotificationCenter';
import { useTimeZone } from '../hooks/useTimeZone';
import type { AvailabilitySlot } from '../types';
import { toast } from 'sonner';

export function InterpreterPortal() {
  const { timeZone, setTimeZone } = useTimeZone();
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleSlotSelect = (start: Date, end: Date) => {
    const newSlot: AvailabilitySlot = {
      day: start.toISOString().split('T')[0],
      startTime: start.toISOString().split('T')[1].substring(0, 5),
      endTime: end.toISOString().split('T')[1].substring(0, 5),
    };

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    toast.success('Availability slot added successfully');
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
    toast.success('Availability slot removed');
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Interpreter Portal
          </h1>
          <TimeZoneSelector value={timeZone} onChange={setTimeZone} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AvailabilityCalendar
              availabilitySlots={availabilitySlots}
              onSlotSelect={handleSlotSelect}
              onSlotDelete={handleSlotDelete}
            />
          </div>
          
          <div>
            <NotificationCenter
              notifications={notifications}
              onDismiss={dismissNotification}
            />
          </div>
        </div>
      </div>
    </div>
  );
}