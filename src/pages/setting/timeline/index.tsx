import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import HTML from '../../../components/HTML';
import { NextArrow, PrevArrow, Tiptap } from '../../../components/item';
import {
  SettingSidebar,
  TimelinePeriod,
  WithSidebar,
} from '../../../components/page';
import { Event } from '../../../interfaces/Event';
import { Period } from '../../../interfaces/Period';
import prisma from '../../../lib/prisma';

const defaultText =
  'Move over an point in the timeline to get more information.';

type Props = {
  periods: Period[];
  eventId: string | null;
};

const setting = ({ periods, eventId }: Props) => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event>();
  const [nextEvent, setNextEvent] = useState<Event>();
  const [prevEvent, setPrevEvent] = useState<Event>();
  const [editting, setEditting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const evs: Event[] = [];
    periods.forEach((period) => {
      if (period.events?.length > 0) {
        period.events.sort((a, b) => (a.position > b.position ? 1 : -1));
        period.events.forEach((event) => {
          evs.push(event);
        });
      }
    });
    setEvents(evs);
    setEvent(eventId ? evs.find((ev) => ev.id === Number(eventId)) : evs[0]);
  }, [periods]);

  useEffect(() => {
    const eventIndex = events.findIndex((ev) => event?.id === ev.id);

    const nextEventId = events.length > eventIndex + 1 ? eventIndex + 1 : 0;
    const prevEventId = eventIndex - 1 < 0 ? events.length - 1 : eventIndex - 1;

    setNextEvent(events[nextEventId]);
    setPrevEvent(events[prevEventId]);
  }, [event]);

  const send = async (body: string) => {
    if (!session) return;

    const endpoint = '/api/event';

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const response = await fetch(endpoint, options);
    return await response.json();
  };

  const handleSave = async () => {
    if (!session) return;

    const body = JSON.stringify({
      id: event?.id,
      text,
    });

    await send(body);

    // Router.push(`/setting/timeline`);
  };

  const togglePublish = async () => {
    if (!session) return;

    const body = JSON.stringify({
      id: event?.id,
      published: !event?.published,
    });

    await send(body);
    Router.push(`/setting/timeline?eventId=${event?.id}`);
  };

  return (
    <WithSidebar title="Calendar of Exandria" sidebar={<SettingSidebar />}>
      <div className="flex flex-col h-full space-y-5">
        <h1 className={`text-4xl text-[#B29438]`}>Timeline of Exandria</h1>

        <div className="flex w-full">
          {periods.map((period) => (
            <TimelinePeriod
              key={period.id}
              period={period}
              setEditting={setEditting}
              setEvent={setEvent}
              selectedEvent={event}
            />
          ))}
        </div>
        {event && (
          <div className="h-full">
            {editting ? (
              <div>
                <Tiptap content={event.text} setText={setText} />
                <button className="" onClick={() => handleSave()}>
                  Save
                </button>{' '}
              </div>
            ) : (
              <div className="flex w-full h-full">
                <PrevArrow onClick={() => setEvent(prevEvent)} />
                <div className="sm:w-10/12 h-96 sm:overflow-auto scrollbar">
                  <HTML html={event.text} />
                  <div className="flex space-x-3">
                    <button className="" onClick={() => setEditting(true)}>
                      Edit
                    </button>
                    <button className="" onClick={() => togglePublish()}>
                      {event.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>
                </div>
                <NextArrow onClick={() => setEvent(nextEvent)} />
              </div>
            )}
          </div>
        )}
      </div>
    </WithSidebar>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  req,
}) => {
  const session = await getSession({ req });

  const periods = await prisma.period.findMany({
    include: { events: true },
    orderBy: {
      position: 'asc',
    },
  });

  const onlyPublished = periods.map((period) => {
    period.events = period.events.filter((event) => {
      return session || event.published;
    });

    return period;
  });

  onlyPublished.unshift({
    label: '',
    slug: '',
    id: -1,
    position: 0,
    length: 5,
    events: [],
    color: `linear-gradient(90deg, rgba(2,0,36,0) 0%, ${periods[0].color} 75%)`,
  });

  onlyPublished.push({
    label: '',
    slug: '',
    id: -1,
    events: [],
    position: periods.length,
    length: 5,
    color: `linear-gradient(270deg, rgba(2,0,36,0) 0%, ${
      periods[periods.length - 1].color
    } 75%)`,
  });

  return {
    props: {
      periods: onlyPublished,
      eventId: query.eventId ? query.eventId : null,
    },
  };
};

export default setting;
