
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    ArrowUpRight,
    Sparkles,
    MoveRight,
} from "lucide-react";

interface EventItem {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

const RecentUpcommingSection = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

       
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`)
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (date: string) => {
        const eventDate = new Date(date + "T00:00:00");

        return {
            day: eventDate.toLocaleDateString("en-US", { day: "2-digit" }),
            month: eventDate.toLocaleDateString("en-US", { month: "short" }),
            year: eventDate.getFullYear(),
        };
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-indigo-50/60 px-5 py-24 dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#0B1220] sm:px-8 lg:px-16">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-300/20 blur-[100px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">

                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-400">
                            <Sparkles size={16} />
                            WHAT'S HAPPENING NEXT
                        </div>

                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                            Discover Events.
                            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                Create Memories.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                            Find exciting opportunities, connect with passionate
                            people, and make your next experience unforgettable.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-[#172033]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                06
                            </p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Upcoming Events
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-[440px] animate-pulse rounded-3xl bg-blue-100/70 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && events.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-blue-200 bg-white/70 px-6 py-20 text-center dark:border-slate-700 dark:bg-[#172033]">
                        <CalendarDays size={48} className="mx-auto mb-5 text-blue-500" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            No Upcoming Events
                        </h3>
                        <p className="mt-3 text-slate-500 dark:text-slate-400">
                            New opportunities are coming soon. Stay connected!
                        </p>
                    </div>
                )}

                {/* Event Grid */}
                {!loading && events.length > 0 && (
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => {
                            const date = formatDate(event.eventDate);

                            return (
                                <article
                                    key={event._id}
                                    className="group overflow-hidden rounded-[28px] border border-blue-100/80 bg-white shadow-[0_8px_35px_rgba(37,99,235,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.14)] dark:border-slate-700/80 dark:bg-[#172033] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/40"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={event.thumbnail}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                                        {/* Category */}
                                        <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                                            {event.eventType}
                                        </div>

                                        {/* Date Badge */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:bg-slate-900/90">
                                            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                                                <span className="text-lg font-extrabold leading-none">
                                                    {date.day}
                                                </span>
                                                <span className="text-[10px] font-semibold uppercase">
                                                    {date.month}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    Event Date
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {date.year}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover Icon */}
                                        <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-blue-600 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <h3 className="line-clamp-1 text-xl font-extrabold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                            {event.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {event.description}
                                        </p>

                                        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                <MapPin size={16} />
                                            </div>
                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </div>

                                        {/* Details Button */}
                                        <div className="mt-6 border-t border-blue-50 pt-5 dark:border-slate-700">
                                            <Link
                                                href={`/events/${event._id}`}
                                                className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-300/50 dark:shadow-none"
                                            >
                                                Explore Event
                                                <MoveRight size={18} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Bottom CTA */}
                {!loading && events.length > 0 && (
                    <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:border-slate-700 dark:from-[#172033] dark:to-[#1B2540] sm:flex-row sm:px-10">
                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                                Have an idea for an event?
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Start something meaningful with the Uddog community.
                            </p>
                        </div>

                        <Link
                            href="/create-event"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 dark:shadow-none"
                        >
                            Create Event
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentUpcommingSection;
