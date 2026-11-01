
import React from "react";
import Image from "next/image";
import {
    CalendarDays,
    MapPin,
    Users,
    ArrowLeft,
    Clock,
    Sparkles,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import JoinEventCard from "@/components/eventsCard/JoinEventCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface EventDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

interface EventDetails {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    eventDate: string;
    location: string;
    thumbnail: string;
    attendeesCount?: number;
}

async function getEventDetails(id: string): Promise<EventDetails | null> {

    const token = await getTokenFromServer()
    // console.log("JWT Token:", token);
    try {
        const res = await fetch(`http://localhost:8000/events/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        );

        if (!res.ok) return null;

        const data = await res.json();
        return data.event ?? null;
    } catch (error) {
        console.error("Failed to fetch event details:", error);
        return null;
    }
}

function formatEventDate(eventDate: string) {
    const [year, month, day] = eventDate.split("-").map(Number);

    if (!year || !month || !day) return eventDate;

    return format(new Date(year, month - 1, day), "MMMM d, yyyy");
}

export default async function EventDetailsPage({
    params,
}: EventDetailsPageProps) {
    const { id } = await params;

    const event = await getEventDetails(id);

    if (!event) {
        notFound();
    }

    const formattedDate = formatEventDate(event.eventDate);

    const infoItems = [
        {
            icon: CalendarDays,
            label: "Event Date",
            value: formattedDate,
        },
        {
            icon: MapPin,
            label: "Location",
            value: event.location,
        },
        {
            icon: Users,
            label: "Participants",
            value: `${event.attendeesCount ?? 0} People Joined`,
        },
    ];

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-indigo-50/50 px-4 py-8 text-slate-900 dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#0B1220] sm:px-6 lg:px-8">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-300/20 blur-[110px]" />
            <div className="pointer-events-none absolute -right-40 top-[600px] h-96 w-96 rounded-full bg-indigo-300/20 blur-[110px]" />

            <div className="relative mx-auto max-w-7xl space-y-8">

                {/* Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/upcomming-events"
                        className="group inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-[#172033] dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        Back to Events
                    </Link>

                    <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-600 dark:border-slate-700 dark:bg-[#172033] dark:text-blue-400">
                        <ShieldCheck size={15} />
                        Uddog Community Event
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative isolate h-[360px] overflow-hidden rounded-[28px] border border-blue-100 shadow-xl shadow-blue-100/50 dark:border-slate-700 dark:shadow-blue-950/20 sm:h-[460px] lg:h-[540px]">

                    {event.thumbnail ? (
                        <Image
                            src={event.thumbnail}
                            alt={event.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 1280px"
                            className="-z-20 object-cover"
                        />
                    ) : (
                        <div className="-z-20 absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />

                    {/* Top Badge */}
                    <div className="absolute left-5 top-5 flex flex-wrap items-center gap-3 sm:left-8 sm:top-8">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                            <Sparkles size={15} />
                            {event.eventType || "Community Event"}
                        </span>

                        <span className="rounded-full border border-emerald-300/30 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-100 backdrop-blur-xl">
                            Upcoming Event
                        </span>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
                        <div className="max-w-4xl">
                            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-200">
                                <CalendarDays size={18} />
                                {formattedDate}
                                <span className="mx-1 text-white/50">•</span>
                                <MapPin size={18} />
                                <span className="line-clamp-1">{event.location}</span>
                            </div>

                            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {event.title}
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                                Be part of something meaningful. Connect with
                                people, share experiences, and create a positive
                                impact together.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Event Information */}
                <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {infoItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group flex items-center gap-4 rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60 dark:border-slate-700 dark:bg-[#172033] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/30"
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 transition-transform duration-300 group-hover:scale-110 dark:shadow-blue-950/40">
                                    <Icon size={25} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 truncate text-base font-bold text-slate-800 dark:text-white">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Main Content */}
                <div className="grid items-start gap-7 lg:grid-cols-3">

                    {/* About Event */}
                    <section className="space-y-7 lg:col-span-2">

                        <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-sm sm:p-9 dark:border-slate-700 dark:bg-[#172033]">

                            <div className="mb-7 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Sparkles size={23} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                        Get to know the event
                                    </p>
                                    <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                                        About This Event
                                    </h2>
                                </div>
                            </div>

                            <div className="mb-7 h-px bg-gradient-to-r from-blue-200 via-indigo-100 to-transparent dark:from-blue-500/30 dark:via-slate-700 dark:to-transparent" />

                            <p className="whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                                {event.description}
                            </p>
                        </div>

                        {/* Bottom Message */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-7 shadow-xl shadow-blue-200/50 dark:shadow-blue-950/30 sm:p-9">
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[25px] border-white/10" />

                            <div className="relative">
                                <div className="mb-4 flex items-center gap-2 text-blue-100">
                                    <Users size={20} />
                                    <span className="text-sm font-semibold">
                                        Uddog Community
                                    </span>
                                </div>

                                <h3 className="max-w-xl text-2xl font-extrabold text-white sm:text-3xl">
                                    Great things happen when people come together.
                                </h3>

                                <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100">
                                    Your participation can make a difference.
                                    Be a part of the journey!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Join Event Card */}
                    <div className="lg:sticky lg:top-24">
                        <JoinEventCard event={event} />
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex justify-center border-t border-blue-100 pt-8 dark:border-slate-700">
                    <Link
                        href="/upcomming-events"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-indigo-600 dark:text-blue-400 dark:hover:text-indigo-400"
                    >
                        <ArrowLeft size={17} />
                        Explore More Events
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>
        </main>
    );
}
