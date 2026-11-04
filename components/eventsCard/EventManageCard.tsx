"use client";

import Image from "next/image";
import {
    CalendarDays,
    MapPin,
    ArrowUpRight,
    Sparkles,
    Eye,
} from "lucide-react";

import Link from "next/link";
import { formatEventDate } from "@/lib/formatEventDate";
import EditDialog from "@/components/button/EditDialog";
import DeleteDialog from "@/components/button/DeleteDialog";

interface EventItem {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

const EventManageCard = ({
    event,
    onRefresh,
}: {
    event: EventItem;
    onRefresh?: () => void;
}) => {
    const formattedDate = formatEventDate(event.eventDate);

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/60 dark:border-slate-700 dark:bg-[#172033] dark:hover:border-blue-500/40 dark:hover:shadow-blue-950/30">

            {/* Thumbnail */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">

                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                {/* Category Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                    <Sparkles size={13} />
                    {event.eventType}
                </div>

                {/* Event Date */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    <CalendarDays size={16} className="text-blue-300" />
                    {formattedDate}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-blue-600">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Title */}
                <div>
                    <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {event.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {event.description}
                    </p>
                </div>

                {/* Location */}
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-blue-50/80 px-3 py-3 dark:bg-blue-500/10">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                        <MapPin size={18} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400">
                            EVENT LOCATION
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {event.location}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200/70 pt-5 sm:grid-cols-3 dark:border-slate-700/70">

                    <Link
                        href={`/events/${event._id}`}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:from-blue-600 dark:hover:to-indigo-600 dark:hover:text-white"
                        aria-label={`View ${event.title}`}
                    >
                        <Eye size={16} />
                        View
                    </Link>

                    <EditDialog event={event} onSuccess={onRefresh} />

                    <DeleteDialog eventId={event._id} onSuccess={onRefresh} />

                </div>
            </div>
        </article>
    );
};

export default EventManageCard;