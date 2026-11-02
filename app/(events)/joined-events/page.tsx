
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

import {
    CalendarDays,
    MapPin,
    ArrowUpRight,
    CalendarCheck,
    Sparkles,
    Loader2,
    Ticket,
    RefreshCw,
    LogIn,
    PartyPopper,
} from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface JoinedEvent {
    _id: string;
    eventId: string;
    eventTitle: string;
    eventDescription: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    email: string;
    name: string;
}

const MyJoinedEvents = () => {
    const { data: session, isPending } = authClient.useSession();

    const [events, setEvents] = useState<JoinedEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        if (isPending) return;

        const email = session?.user?.email;

        if (!email) {
            setEvents([]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        
        const fetchJoinedEvents = async () => {
            try {
                setIsLoading(true);
                setError("");
                
                const token = await getTokenFromClient()
                // console.log(token);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-joined-events/${encodeURIComponent(email)}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }

                );

                if (!res.ok) {
                    throw new Error("Failed to load your registered events.");
                }

                const data: JoinedEvent[] = await res.json();

                // Remove duplicate registrations
                const uniqueEvents = data.filter(
                    (event, index, self) =>
                        index ===
                        self.findIndex(
                            (item) => item.eventId === event.eventId
                        )
                );

                setEvents(uniqueEvents);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try again."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchJoinedEvents();

        return () => controller.abort();
    }, [session?.user?.email, isPending, reload]);

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-").map(Number);

        if (!year || !month || !day) return date;

        return new Date(year, month - 1, day).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // Session Loading
    if (isPending || isLoading) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1220]">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                        <Loader2 size={32} className="animate-spin" />
                    </div>

                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        Loading your events...
                    </p>
                </div>
            </section>
        );
    }

    // Not Logged In
    if (!session?.user?.email) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-[#0B1220]">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-[#172033]">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                        <LogIn size={35} />
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Login Required
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        Please log in to view your registered events and manage
                        your activities.
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        Login Now
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-12 dark:bg-[#0B1220] md:px-8">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wider text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                            <Sparkles size={15} />
                            MY ACTIVITIES
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                            My Joined{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Events
                            </span>
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 md:text-base">
                            Keep track of your registrations and stay connected
                            with the events that matter to you.
                        </p>
                    </div>

                    {/* Registration Stats */}
                    <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50 dark:border-slate-700 dark:bg-[#172033] dark:shadow-none">
                        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white">
                            <CalendarCheck size={25} />
                        </div>

                        <div>
                            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                {events.length}
                            </p>

                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Registered Events
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error ? (
                    <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-500/20 dark:bg-red-500/10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                            <RefreshCw size={25} />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                            Unable to Load Events
                        </h2>

                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>

                        <button
                            onClick={() => setReload((prev) => prev + 1)}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>
                    </div>
                ) : events.length === 0 ? (

                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-[#172033]">

                        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/20">
                            <PartyPopper size={42} />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            No Events Joined Yet
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                            You haven't registered for any events yet.
                            Explore upcoming events and find something exciting!
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <Ticket size={18} />
                            Explore Events
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>

                ) : (

                    /* Event Cards */
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => (
                            <article
                                key={event.eventId}
                                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-[#172033] dark:hover:border-blue-500/30 dark:hover:shadow-blue-950/30"
                            >

                                {/* Image */}
                                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">

                                    {event.thumbnail ? (
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.eventTitle || "Event thumbnail"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                                            No Image Available
                                        </div>
                                    )}

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                                    {/* Event Type */}
                                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/90 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-lg backdrop-blur-md">
                                        <Sparkles size={13} />
                                        {event.eventType}
                                    </span>

                                    {/* Event Date */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl border border-white/20 bg-slate-950/40 px-3.5 py-2.5 text-white backdrop-blur-md">
                                        <CalendarDays size={17} className="text-blue-300" />
                                        <span className="text-sm font-semibold">
                                            {formatDate(event.eventDate)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5 sm:p-6">

                                    <div>
                                        <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                            {event.eventTitle}
                                        </h2>

                                        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {event.eventDescription}
                                        </p>
                                    </div>

                                    {/* Location */}
                                    <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <MapPin size={17} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                Event Location
                                            </p>

                                            <p className="mt-0.5 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Registration Status */}
                                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">

                                        <div>
                                            <p className="text-[11px] font-semibold tracking-wider text-slate-400">
                                                REGISTRATION STATUS
                                            </p>

                                            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                Registered
                                            </p>
                                        </div>

                                        <Link
                                            href={`/events/${event.eventId}`}
                                            aria-label={`View ${event.eventTitle}`}
                                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                                        >
                                            <ArrowUpRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}

                    </div>
                )}
            </div>
        </section>
    );
};

export default MyJoinedEvents;
