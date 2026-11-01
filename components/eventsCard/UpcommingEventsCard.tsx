
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';

export interface UpcomingEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    eventDate: string;
    location: string;
    thumbnail: string;
}

const UpcommingEventsCard = ({ event }: { event: UpcomingEvent }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-blue-950/30">

            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">

                {event.thumbnail ? (
                    <Image
                        fill
                        src={event.thumbnail}
                        alt={event.title || "Event thumbnail"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        No Image Available
                    </div>
                )}

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Event Type Badge */}
                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md">
                    {event.eventType}
                </span>

                {/* Date on Image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                    <CalendarDays size={16} />
                    <span>{event.eventDate}</span>
                </div>

            </div>

            {/* Content Section */}
            <div className="p-5">

                <h2 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {event.title}
                </h2>

                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {event.description}
                </p>

                {/* Location */}
                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <MapPin size={17} className="shrink-0 text-blue-500" />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                {/* Details Button */}
                <Link
                    href={`/events/${event._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg dark:shadow-none"
                >
                    View Details
                    <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                </Link>

            </div>

        </div>
    );
};

export default UpcommingEventsCard;
