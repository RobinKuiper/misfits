import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Event } from '../../interfaces/Event';
import { Period } from '../../interfaces/Period';

type Props = {
  period: Period;
  setEvent: React.Dispatch<React.SetStateAction<Event | undefined>>;
  setEditting: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: Event | undefined;
};

const TimelinePeriod = ({
  period,
  setEvent,
  setEditting,
  selectedEvent,
}: Props) => {
  const { data: session } = useSession();

  const handleCreate = async (position: number) => {
    if (!session) return;

    const endpoint = '/api/event';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        periodId: period.id,
        position,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEvent(result);
    setEditting(true);
  };

  return (
    <div
      className="flex flex-col"
      style={{
        width: `${period.length}%`,
        color: 'white',
        position: 'relative',
      }}
    >
      <div
        className="flex flex-col overflow-hidden relative"
        style={{
          background: period.color,
          position: 'relative',
          height: '100px',
        }}
      >
        <div className="w-full h-full grid grid-flow-col z-20">
          {period.label &&
            Array.from({ length: 100 }, (_, i) => i + 1).map((div, i) => {
              const event = period.events.find((event) => event.position === i);

              return (
                <div
                  key={i}
                  className={`w-1 h-full relative`} // ${i % 2 ? 'bg-black' : 'bg-white'}
                >
                  {session && !event && (
                    <button
                      className="absolute bottom-0 w-full h-[25%] hover:bg-black"
                      onClick={() => handleCreate(i)}
                    ></button>
                  )}

                  {event && (
                    <button
                      className={`absolute bottom-0 w-full h-[25%] ${
                        event.published ? 'bg-black' : 'bg-red-400'
                      } ${
                        selectedEvent === event && 'scale-150'
                      } hover:scale-150`}
                      onMouseOver={(e) => setEvent(event)}
                    ></button>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <div className="">
        <span className="ml-2">{period.label}</span>
      </div>
    </div>
  );
};

export default TimelinePeriod;
