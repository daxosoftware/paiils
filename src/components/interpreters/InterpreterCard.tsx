import React from 'react';
import { Star, Languages, Calendar } from 'lucide-react';
import type { Interpreter } from '../../types';

interface InterpreterCardProps {
  interpreter: Interpreter;
  onBooking: (interpreterId: string) => void;
}

export function InterpreterCard({ interpreter, onBooking }: InterpreterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src={`https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop`}
          alt={interpreter.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{interpreter.name}</h3>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{interpreter.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <Languages className="w-4 h-4 mr-2" />
          <span>{interpreter.languages.join(', ')}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{interpreter.availability.length} slots available</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {interpreter.certifications.map((cert, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 mr-2 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            {cert}
          </span>
        ))}
      </div>

      <button
        onClick={() => onBooking(interpreter.id)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Book Session
      </button>
    </div>
  );
}