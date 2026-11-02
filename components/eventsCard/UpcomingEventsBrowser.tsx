"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    PartyPopper,
    Search,
    Sparkles,
    X,
} from "lucide-react";

import UpcommingEventsCard, {
    type UpcomingEvent,
} from "@/components/eventsCard/UpcommingEventsCard";

export type { UpcomingEvent };

const UpcomingEventsBrowser = ({ events }: { events: UpcomingEvent[] }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Derive categories from the actual events
    const categories = useMemo(() => {
        const set = new Set<string>();

        events.forEach((event) => {
            if (event.eventType) {
                set.add(event.eventType);
            }
        });

        return ["All", ...Array.from(set).sort()];
    }, [events]);

    const filteredEvents = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return events.filter((event) => {
            const matchesSearch =
                !searchValue ||
                [event.title, event.description, event.location]
                    .filter(Boolean)
                    .some((value) =>
                        value.toLowerCase().includes(searchValue)
                    );

            const matchesCategory =
                category === "All" || event.eventType === category;

            return matchesSearch && matchesCategory;
        });
    }, [events, search, category]);

    const hasFilters = search.trim() !== "" || category !== "All";

    return (
        <>
            {/* Search & Category Filters */}
            <section className="mb-8 space-y-5">
                {/* Search Input */}
                <div className="relative w-full sm:max-w-md">
                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search events by title, description or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-900"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                            aria-label="Clear search"
                        >
                            <X size={17} />
                        </button>
                    )}
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((type) => {
                        const isActive = category === type;

                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setCategory(type)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                                }`}
                            >
                                {type !== "All" && (
                                    <Sparkles
                                        size={13}
                                        className={
                                            isActive
                                                ? "text-blue-100"
                                                : "text-blue-500"
                                        }
                                    />
                                )}
                                {type}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Filtered Events Grid */}
            {filteredEvents.length > 0 ? (
                <section className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <div
                            key={event._id}
                            className="group transition-all duration-300 hover:-translate-y-1"
                        >
                            <UpcommingEventsCard event={event} />
                        </div>
                    ))}
                </section>
            ) : (
                /* No Results Empty State */
                <section className="relative overflow-hidden rounded-[2rem] border border-dashed border-blue-200 bg-white px-6 py-20 text-center dark:border-blue-500/20 dark:bg-[#172033]">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-500/5" />

                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-500/5" />

                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                        <PartyPopper size={34} />
                    </div>

                    <h2 className="relative mt-7 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {hasFilters
                            ? "No Events Match Your Filters"
                            : "No Upcoming Events Yet"}
                    </h2>

                    <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {hasFilters
                            ? "Try a different search term or category to find what you're looking for."
                            : "There are no upcoming events at the moment. New opportunities are coming soon. Stay connected with Uddog!"}
                    </p>

                    {hasFilters ? (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setCategory("All");
                            }}
                            className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <X size={17} />
                            Clear Filters
                        </button>
                    ) : (
                        <Link
                            href="/create-event"
                            className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            Create an Event
                            <ArrowRight size={17} />
                        </Link>
                    )}
                </section>
            )}
        </>
    );
};

export default UpcomingEventsBrowser;
