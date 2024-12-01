import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useTimeZone } from '../../hooks/useTimeZone';
import type { AvailabilitySlot } from '../../types';

interface AvailabilityCalendarProps {
  availabilitySlots: AvailabilitySlot[];
  onSlotSelect: (start: Date, end: Date) => void;
  onSlotDelete: (slotId: string) => void;
}

export function AvailabilityCalendar({
  availabilitySlots,
  onSlotSelect,
  onSlotDelete,
}: AvailabilityCalendarProps) {
  const { timeZone, formatInTimeZone } = useTimeZone();
  const [view, setView] = useState<'timeGridWeek' | 'timeGridDay'>('timeGridWeek');

  const events = availabilitySlots.map((slot) => ({
    id: `${slot.day}-${slot.startTime}-${slot.endTime}`,
    title: 'Available',
    start: `${slot.day}T${slot.startTime}`,
    end: `${slot.day}T${slot.endTime}`,
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
  }));

  const handleSelect = (selectInfo: any) => {
    const startTime = format(selectInfo.start, 'HH:mm');
    const endTime = format(selectInfo.end, 'HH:mm');
    onSlotSelect(selectInfo.start, selectInfo.end);
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm('Would you like to remove this availability slot?')) {
      onSlotDelete(clickInfo.event.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Availability Calendar</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            Time Zone: {timeZone}
          </span>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setView('timeGridWeek')}
          className={`px-4 py-2 rounded-md text-sm ${
            view === 'timeGridWeek'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Week View
        </button>
        <button
          onClick={() => setView('timeGridDay')}
          className={`px-4 py-2 rounded-md text-sm ${
            view === 'timeGridDay'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Day View
        </button>
      </div>

      <div className="h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          events={events}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleSelect}
          eventClick={handleEventClick}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          timeZone={timeZone}
          height="100%"
        />
      </div>
    </div>
  );
}