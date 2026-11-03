
import React from "react";
import Image from "next/image";
import {
    CalendarDays,
    MapPin,
    Users,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import JoinEventCard from "@/components/eventsCard/JoinEventCard";
import { formatEventDate } from "@/lib/formatEventDate";

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

async function getEventDetails(
    id: string
): Promise<EventDetails | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/all-events/${id}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("Event API Error:", res.status);
            return null;
        }

        const data = await res.json();

        return data.event ?? null;

    } catch (error) {
        console.error("Failed to fetch event details:", error);
        return null;
    }
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
        <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50/70 via-white to-indigo-50/50 px-3 py-5 text-slate-900 transition-colors duration-300 dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#0B1220] sm:px-5 sm:py-8 lg:px-8">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-40 h-72 w-72 rounded-full bg-blue-300/20 blur-[100px] sm:h-96 sm:w-96" />

            <div className="pointer-events-none absolute -right-40 top-[600px] h-72 w-72 rounded-full bg-indigo-300/20 blur-[100px] sm:h-96 sm:w-96" />

            <div className="relative mx-auto max-w-7xl space-y-6 sm:space-y-8">

                {/* Navigation */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        href="/upcomming-events"
                        className="group inline-flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-[#172033] dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Back to Events
                    </Link>

                    <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-600 dark:border-slate-700 dark:bg-[#172033] dark:text-blue-400">
                        <ShieldCheck size={15} />
                        Uddog Community Event
                    </div>

                </div>

                {/* Hero Section */}
                <section className="relative isolate h-[430px] overflow-hidden rounded-2xl border border-blue-100 shadow-xl shadow-blue-100/50 dark:border-slate-700 dark:shadow-blue-950/20 sm:h-[460px] sm:rounded-[28px] lg:h-[540px]">

                    {/* Hero Image */}
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
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />

                    {/* Top Badges */}
                    <div className="absolute left-3 right-3 top-3 flex flex-wrap items-center gap-2 sm:left-8 sm:right-auto sm:top-8 sm:gap-3">

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-xl sm:gap-2 sm:px-4 sm:text-xs">
                            <Sparkles size={14} />
                            {event.eventType || "Community Event"}
                        </span>

                        <span className="rounded-full border border-emerald-300/30 bg-emerald-500/20 px-3 py-2 text-[11px] font-bold text-emerald-100 backdrop-blur-xl sm:px-4 sm:text-xs">
                            Upcoming Event
                        </span>

                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-14">

                        <div className="max-w-4xl">

                            {/* Date & Location */}
                            <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold text-blue-200 sm:mb-5 sm:text-sm">

                                <CalendarDays size={16} className="shrink-0" />

                                <span>{formattedDate}</span>

                                <span className="text-white/50">•</span>

                                <MapPin size={16} className="shrink-0" />

                                <span className="max-w-full break-words">
                                    {event.location}
                                </span>

                            </div>

                            {/* Event Title */}
                            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white [overflow-wrap:anywhere] sm:text-4xl md:text-5xl lg:text-6xl">
                                {event.title}
                            </h1>

                            {/* Description */}
                            <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7">
                                Be part of something meaningful. Connect with
                                people, share experiences, and create a positive
                                impact together.
                            </p>

                        </div>

                    </div>

                </section>

                {/* Event Information Cards */}
                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

                    {infoItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60 dark:border-slate-700 dark:bg-[#172033] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/30 sm:gap-4 sm:p-5"
                            >

                                {/* Icon */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 transition-transform duration-300 group-hover:scale-110 dark:shadow-blue-950/40 sm:h-14 sm:w-14 sm:rounded-2xl">
                                    <Icon size={22} />
                                </div>

                                {/* Text */}
                                <div className="min-w-0 flex-1">

                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 break-words text-sm font-bold text-slate-800 dark:text-white sm:text-base">
                                        {item.value}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </section>

                {/* Main Content */}
                <div className="grid min-w-0 items-start gap-5 lg:grid-cols-3 lg:gap-7">

                    {/* About Event */}
                    <section className="min-w-0 space-y-5 lg:col-span-2 lg:space-y-7">

                        {/* About Card */}
                        <div className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-[#172033] sm:rounded-3xl sm:p-7 lg:p-9">

                            {/* Heading */}
                            <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 sm:h-12 sm:w-12">
                                    <Sparkles size={22} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:text-xs">
                                        Get to know the event
                                    </p>

                                    <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                                        About This Event
                                    </h2>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="mb-5 h-px bg-gradient-to-r from-blue-200 via-indigo-100 to-transparent dark:from-blue-500/30 dark:via-slate-700 dark:to-transparent sm:mb-7" />

                            {/* Description */}
                            <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                                {event.description}
                            </p>

                        </div>

                        {/* Bottom Message */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-5 shadow-xl shadow-blue-200/50 dark:shadow-blue-950/30 sm:rounded-3xl sm:p-9">

                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[20px] border-white/10 sm:h-40 sm:w-40 sm:border-[25px]" />

                            <div className="relative">

                                <div className="mb-4 flex items-center gap-2 text-blue-100">
                                    <Users size={19} />

                                    <span className="text-sm font-semibold">
                                        Uddog Community
                                    </span>
                                </div>

                                <h3 className="max-w-xl text-xl font-extrabold leading-tight text-white sm:text-3xl">
                                    Great things happen when people come together.
                                </h3>

                                <p className="mt-3 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm sm:leading-7">
                                    Your participation can make a difference.
                                    Be a part of the journey!
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* Join Event Card */}
                    <div className="min-w-0 lg:sticky lg:top-24">
                        <JoinEventCard event={event} />
                    </div>

                </div>

                {/* Footer Navigation */}
                <div className="flex justify-center border-t border-blue-100 pt-6 dark:border-slate-700 sm:pt-8">

                    <Link
                        href="/upcomming-events"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-indigo-600 dark:text-blue-400 dark:hover:text-indigo-400"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Explore More Events

                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />

                    </Link>

                </div>

            </div>

        </main>
    );
}
