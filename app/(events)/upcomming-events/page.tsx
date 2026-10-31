
import UpcommingEventsCard, { type UpcomingEvent } from '@/components/eventsCard/UpcommingEventsCard';
import React from 'react';
import { CalendarDays, Sparkles } from 'lucide-react';

const UpcomingEventsPage = async () => {

    const res = await fetch('http://localhost:5000/events');

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    const data = await res.json();
    const events: UpcomingEvent[] = data.events;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Heading Section */}
                <div className="mx-auto mb-14 max-w-2xl text-center">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                        <Sparkles size={16} />
                        Make A Difference Together
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Upcoming{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                            Events
                        </span>
                    </h1>

                    <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                        Discover meaningful events, connect with your
                        community, and be part of something positive.
                        Every small action creates a big change.
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <CalendarDays size={18} className="text-blue-500" />
                        <span>{events.length} Events Available</span>
                    </div>

                </div>

                {/* Events Grid */}
                {events.length > 0 ? (

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => (
                            <UpcommingEventsCard
                                key={event._id}
                                event={event}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">

                        <CalendarDays
                            size={45}
                            className="mx-auto mb-4 text-slate-400"
                        />

                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                            No Events Available
                        </h2>

                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            There are no upcoming events right now.
                            Check back later!
                        </p>

                    </div>

                )}

            </div>

        </main>
    );
};

export default UpcomingEventsPage;
