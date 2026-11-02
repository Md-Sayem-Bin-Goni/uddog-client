
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatEventDate } from "@/lib/formatEventDate";

import {
    CalendarDays,
    MapPin,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

export interface UpcomingEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    eventDate: string;
    location: string;
    thumbnail: string;
}

const UpcommingEventsCard = ({
    event,
}: {
    event: UpcomingEvent;
}) => {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-700 dark:bg-[#172033] dark:hover:border-blue-500/40 dark:hover:shadow-blue-950/30">

            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">

                {event.thumbnail ? (
                    <Image
                        fill
                        src={event.thumbnail}
                        alt={event.title || "Event thumbnail"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                        No Image Available
                    </div>
                )}

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/20" />

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-lg backdrop-blur-xl">
                        <Sparkles size={13} />
                        {event.eventType}
                    </span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl border border-white/20 bg-slate-950/40 px-3.5 py-2.5 text-white shadow-lg backdrop-blur-md">
                    <CalendarDays size={17} className="text-blue-300" />

                    <span className="text-sm font-semibold">
                        {formatEventDate(event.eventDate)}
                    </span>
                </div>

                {/* Hover Icon */}
                <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={20} />
                </div>

            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Event Title */}
                <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {event.title}
                </h2>

                {/* Description */}
                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {event.description}
                </p>

                {/* Location */}
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">

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

                {/* Details Button */}
                <Link
                    href={`/events/${event._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
                >
                    Explore Event

                    <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                </Link>

            </div>

        </article>
    );
};

export default UpcommingEventsCard;
