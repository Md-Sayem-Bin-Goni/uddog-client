
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
    CalendarDays,
    Plus,
    Search,
    Sparkles,
    ArrowRight,
    X,
    MapPin,
    SlidersHorizontal,
    AlertCircle,
    RefreshCw,
} from "lucide-react";

import EventManageCard from "@/components/eventsCard/EventManageCard";

interface EventItem {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    createdBy: string;
}

const ManageEventsPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    // Fetch Created Events
    useEffect(() => {
        if (isPending) return;

        if (!session?.user?.email) {
            setEvents([]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchEvents = async () => {
            setIsLoading(true);
            setError("");

            try {
                const res = await fetch(
                    `http://localhost:8000/my-created-events/${encodeURIComponent(
                        session.user.email
                    )}`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error("Failed to load your events.");
                }

                const data = await res.json();
                setEvents(data);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchEvents();

        return () => controller.abort();

    }, [session?.user?.email, isPending]);

    // Search Events
    const filteredEvents = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        if (!searchValue) return events;

        return events.filter((event) =>
            [
                event.title,
                event.description,
                event.eventType,
                event.location,
            ].some((value) =>
                value?.toLowerCase().includes(searchValue)
            )
        );
    }, [events, search]);

    const isPageLoading = isPending || isLoading;

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 dark:bg-[#0B1220] sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Hero Section */}
                <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-10 text-white shadow-xl shadow-blue-500/10 sm:px-10 sm:py-14">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

                        <div className="max-w-2xl">

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-50 backdrop-blur-md">
                                <Sparkles size={15} />
                                EVENT MANAGEMENT
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Manage Your
                                <span className="block text-blue-200">
                                    Events & Experiences.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                                Organize your events, update important details,
                                and keep your community connected with Uddog.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-blue-100">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={17} />
                                    Your Event Dashboard
                                </div>

                                <div className="h-1 w-1 rounded-full bg-blue-200" />

                                <div className="flex items-center gap-2">
                                    <MapPin size={17} />
                                    Create Experiences
                                </div>
                            </div>

                        </div>

                        <button
                            onClick={() => router.push("/create-event")}
                            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-2xl"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 transition group-hover:bg-blue-600 group-hover:text-white">
                                <Plus size={20} />
                            </span>

                            Create New Event

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>

                    </div>
                </section>

                {/* Dashboard Stats */}
                <section className="mb-8 grid gap-4 sm:grid-cols-2">

                    <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-blue-500/10 dark:bg-slate-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                            <CalendarDays size={23} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Created Events
                            </p>

                            <h3 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {events.length}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm dark:border-indigo-500/10 dark:bg-slate-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                            <SlidersHorizontal size={22} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Matching Results
                            </p>

                            <h3 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {filteredEvents.length}
                            </h3>
                        </div>
                    </div>

                </section>

                {/* Search Section */}
                <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Your Events
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Search and manage all your created events.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-sm">

                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
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

                    </div>
                </section>

                {/* Events Content */}
                <section>

                    {/* Loading Skeleton */}
                    {isPageLoading ? (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="h-52 bg-slate-200 dark:bg-slate-800" />

                                    <div className="space-y-4 p-5">
                                        <div className="h-4 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-4 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-10 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : error ? (

                        /* Error State */
                        <div className="rounded-3xl border border-red-200 bg-white px-6 py-16 text-center dark:border-red-900/50 dark:bg-slate-900">

                            <AlertCircle
                                size={42}
                                className="mx-auto mb-4 text-red-500"
                            />

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Unable to Load Events
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {error}
                            </p>

                            <button
                                onClick={() => router.refresh()}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>

                        </div>

                    ) : filteredEvents.length === 0 ? (

                        /* Empty State */
                        <div className="relative overflow-hidden rounded-3xl border border-dashed border-blue-200 bg-white px-6 py-20 text-center dark:border-blue-500/20 dark:bg-slate-900">

                            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-500/5" />

                            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                                {search ? (
                                    <Search size={32} />
                                ) : (
                                    <CalendarDays size={32} />
                                )}
                            </div>

                            <h2 className="relative mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {search
                                    ? "No Matching Events Found"
                                    : "Your Event Journey Starts Here"}
                            </h2>

                            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {search
                                    ? "We couldn't find any events matching your search. Try a different keyword."
                                    : "You haven't created any events yet. Start something meaningful and bring your community together."}
                            </p>

                            {search ? (
                                <button
                                    onClick={() => setSearch("")}
                                    className="relative mt-7 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
                                >
                                    Clear Search
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/create-event")}
                                    className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    <Plus size={18} />
                                    Create Your First Event
                                </button>
                            )}

                        </div>

                    ) : (

                        /* Event Cards */
                        <>
                            <div className="mb-5 flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    Showing{" "}
                                    <span className="font-bold text-blue-600 dark:text-blue-400">
                                        {filteredEvents.length}
                                    </span>{" "}
                                    {filteredEvents.length === 1 ? "event" : "events"}
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredEvents.map((event) => (
                                    <EventManageCard
                                        key={event._id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                </section>

            </div>
        </main>
    );
};

export default ManageEventsPage;
