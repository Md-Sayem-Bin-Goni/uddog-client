
import UpcommingEventsCard, {
    type UpcomingEvent,
} from "@/components/eventsCard/UpcommingEventsCard";

import {
    CalendarDays,
    Sparkles,
    ArrowRight,
    Compass,
    PartyPopper,
} from "lucide-react";

import Link from "next/link";

const UpcomingEventsPage = async () => {

    let events: UpcomingEvent[] = [];

    try {
        const res = await fetch("http://localhost:8000/events", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await res.json();

        // Bangladesh timezone date
        const today = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date());

        events = (data.events as UpcomingEvent[])
            .filter((event) => event.eventDate >= today)
            .sort((a, b) =>
                a.eventDate.localeCompare(b.eventDate)
            );

    } catch (error) {
        console.error("Failed to load upcoming events:", error);
        throw error;
    }

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 dark:bg-[#0B1220] sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Hero Section */}
                <section className="relative mb-14 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-14 text-center shadow-2xl shadow-blue-500/10 sm:px-12 sm:py-20">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

                    <div className="relative mx-auto max-w-3xl">

                        {/* Badge */}
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold tracking-widest text-blue-50 backdrop-blur-md sm:text-sm">
                            <Sparkles size={16} />
                            MAKE A DIFFERENCE TOGETHER
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Discover Events.
                            <span className="block bg-gradient-to-r from-blue-200 via-cyan-100 to-white bg-clip-text text-transparent">
                                Create Memories.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                            Explore meaningful experiences, connect with
                            inspiring people, and become part of positive
                            change in your community. Your next great
                            experience starts here.
                        </p>

                        {/* Stats */}
                        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">

                            <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md">
                                <CalendarDays size={18} />
                                {events.length} Upcoming{" "}
                                {events.length === 1 ? "Event" : "Events"}
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md">
                                <Compass size={18} />
                                Discover & Participate
                            </div>

                        </div>

                    </div>
                </section>

                {/* Section Heading */}
                <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Explore Opportunities
                        </div>

                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                            Upcoming Events
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Find something exciting to be part of.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        <CalendarDays size={17} className="text-blue-500" />
                        Sorted by nearest date
                    </div>

                </section>

                {/* Events Grid */}
                {events.length > 0 ? (

                    <section className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="group transition-all duration-300 hover:-translate-y-1"
                            >
                                <UpcommingEventsCard event={event} />
                            </div>
                        ))}

                    </section>

                ) : (

                    /* Empty State */
                    <section className="relative overflow-hidden rounded-[2rem] border border-dashed border-blue-200 bg-white px-6 py-20 text-center dark:border-blue-500/20 dark:bg-slate-900">

                        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-500/5" />

                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-500/5" />

                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                            <PartyPopper size={34} />
                        </div>

                        <h2 className="relative mt-7 text-2xl font-extrabold text-slate-900 dark:text-white">
                            No Upcoming Events Yet
                        </h2>

                        <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                            There are no upcoming events at the moment.
                            New opportunities are coming soon.
                            Stay connected with Uddog!
                        </p>

                        <Link
                            href="/create-event"
                            className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Create an Event
                            <ArrowRight size={17} />
                        </Link>

                    </section>

                )}

                {/* Bottom CTA */}
                {events.length > 0 && (
                    <section className="mt-16 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-500/10 dark:from-blue-950/30 dark:to-indigo-950/30 sm:p-8">

                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Have an idea for an event?
                                </h3>

                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Bring your community together. Create
                                    something meaningful with Uddog.
                                </p>
                            </div>

                            <Link
                                href="/create-event"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Sparkles size={17} />
                                Create Event
                                <ArrowRight size={17} />
                            </Link>

                        </div>
                    </section>
                )}

            </div>
        </main>
    );
};

export default UpcomingEventsPage;
