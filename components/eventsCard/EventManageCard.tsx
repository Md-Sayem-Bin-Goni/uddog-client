
"use client";

import Image from "next/image";
import {
    CalendarDays,
    MapPin,
    Pencil,
    Trash2,
    ArrowUpRight,
} from "lucide-react";

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

const EventManageCard = ({ event }: { event: EventItem }) => {

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">

            {/* Thumbnail */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {event.eventType}
                </span>

                {/* Date */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                    <CalendarDays size={16} />
                    {event.eventDate}
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-primary">
                    <ArrowUpRight size={19} />
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {event.title}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-muted-foreground">
                    {event.description}
                </p>

                {/* Location */}
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    <MapPin size={17} className="shrink-0 text-primary" />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                    <EditDialog event={event}>
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                            <Pencil size={16} />
                            Edit
                        </button>
                    </EditDialog>

                    <DeleteDialog eventId={event._id}>
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white">
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </DeleteDialog>

                </div>
            </div>
        </article>
    );
};

export default EventManageCard;
