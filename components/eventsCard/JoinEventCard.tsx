
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { formatEventDate } from "@/lib/formatEventDate";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface EventItem {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

interface JoinEventCardProps {
    event: EventItem;
}

const JoinEventCard: React.FC<JoinEventCardProps> = ({ event }) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [isLoading, setIsLoading] = useState(false);

    const handleJoinEvent = async () => {
        if (!session?.user) {
            router.push("/login");
            return;
        }

        setIsLoading(true);

        try {
            const token = await getTokenFromClient();

            if (!token) {
                toast.error("Your session has expired. Please log in again.");
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/join-event`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        eventId: event._id,
                        eventTitle: event.title,
                        eventDescription: event.description,
                        eventType: event.eventType,
                        thumbnail: event.thumbnail,
                        location: event.location,
                        eventDate: event.eventDate,
                        email: session.user.email,
                        name: session.user.name,
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Successfully joined event!");
                router.refresh();
            } else {
                toast.error(data.message || "Failed to join event.");
            }
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const formattedDate = formatEventDate(event.eventDate);

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/40 dark:border-slate-700 dark:bg-[#172033] dark:shadow-blue-950/20">

            {/* Gradient Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 px-4 py-5 text-white sm:px-6 sm:py-6">
                <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[20px] border-white/10" />
                <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-indigo-400/20 blur-xl" />

                <div className="relative">
                    <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-2.5 py-1.5 text-[10px] font-semibold backdrop-blur sm:gap-2 sm:px-3 sm:text-xs">
                            <Sparkles size={13} />
                            Event Registration
                        </span>

                        <ShieldCheck
                            size={21}
                            className="shrink-0 text-blue-100 sm:size-6"
                        />
                    </div>

                    <h3 className="text-xl font-extrabold sm:text-2xl">
                        Ready to Join?
                    </h3>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-blue-100 sm:text-sm sm:leading-6">
                        Be part of something meaningful. Reserve your
                        spot and join the community!
                    </p>
                </div>
            </div>

            {/* Card Body */}
            <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

                {/* Event Information */}
                <div className="min-w-0">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:text-xs">
                        You&apos;re joining
                    </p>

                    <h4 className="break-words text-base font-extrabold leading-snug text-slate-900 dark:text-white sm:text-lg">
                        {event.title}
                    </h4>

                    <span className="mt-3 inline-flex max-w-full rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 sm:text-xs">
                        {event.eventType}
                    </span>
                </div>

                {/* Event Details */}
                <div className="space-y-3 rounded-xl bg-blue-50/70 p-3 sm:space-y-4 sm:rounded-2xl sm:p-4 dark:bg-slate-800/60">

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm sm:h-10 sm:w-10 sm:rounded-xl dark:bg-slate-700 dark:text-blue-400">
                            <CalendarDays size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
                                Event Date
                            </p>
                            <p className="break-words text-xs font-bold text-slate-800 dark:text-white sm:text-sm">
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm sm:h-10 sm:w-10 sm:rounded-xl dark:bg-slate-700 dark:text-blue-400">
                            <MapPin size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
                                Location
                            </p>
                            <p className="break-words text-xs font-bold text-slate-800 dark:text-white sm:text-sm">
                                {event.location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registration Status */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400 sm:text-xs sm:leading-6">
                        Your registration information will be saved
                        securely when you join this event.
                    </p>
                </div>

                {/* Join Button */}
                <Button
                    onClick={handleJoinEvent}
                    disabled={isLoading || isPending}
                    className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-300 disabled:opacity-60 sm:h-12 sm:text-sm dark:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={17} className="mr-2 animate-spin" />
                            Joining Event...
                        </>
                    ) : isPending ? (
                        "Checking Account..."
                    ) : (
                        <>
                            Join This Event
                            <ArrowRight size={17} className="ml-2" />
                        </>
                    )}
                </Button>

                {/* Footer */}
                <div className="border-t border-blue-100 pt-3 text-center sm:pt-4 dark:border-slate-700">
                    <p className="text-[10px] leading-5 text-slate-400 sm:text-xs">
                        By joining, you agree to participate responsibly
                        and respect the community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinEventCard;
