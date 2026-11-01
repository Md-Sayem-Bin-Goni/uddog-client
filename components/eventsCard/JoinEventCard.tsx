
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Users,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

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
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleJoinEvent = async () => {
        if (!session?.user) {
            router.push("/sign-in");
            return;
        }

        setIsLoading(true);
        setMessage("");

        const res = await fetch("http://localhost:8000/join-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        });

        const data = await res.json();

        if (res.ok) {
            setIsSuccess(true);
            setMessage(data.message || "Successfully joined event!");
            router.refresh();
        } else {
            setIsSuccess(false);
            setMessage(data.message || "Failed to join event.");
        }

        setIsLoading(false);
    };

    const formattedDate = new Date(
        event.eventDate + "T00:00:00"
    ).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50 dark:border-slate-700 dark:bg-[#172033] dark:shadow-blue-950/20">

            {/* Gradient Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-6 text-white">
                <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[20px] border-white/10" />
                <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-indigo-400/20 blur-xl" />

                <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                            <Sparkles size={14} />
                            Event Registration
                        </span>

                        <ShieldCheck size={23} className="text-blue-100" />
                    </div>

                    <h3 className="text-2xl font-extrabold">
                        Ready to Join?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-blue-100">
                        Be part of something meaningful. Reserve your
                        spot and join the community!
                    </p>
                </div>
            </div>

            {/* Card Body */}
            <div className="space-y-6 p-6">

                {/* Event Information */}
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        You're joining
                    </p>

                    <h4 className="text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                        {event.title}
                    </h4>

                    <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                        {event.eventType}
                    </span>
                </div>

                {/* Event Details */}
                <div className="space-y-4 rounded-2xl bg-blue-50/70 p-4 dark:bg-slate-800/60">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400">
                            <CalendarDays size={19} />
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Event Date
                            </p>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400">
                            <MapPin size={19} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Location
                            </p>
                            <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                                {event.location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registration Status */}
                <div className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-500" />
                    <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                        Your registration information will be saved
                        securely when you join this event.
                    </p>
                </div>

                {/* Feedback */}
                {message && (
                    <div
                        className={`rounded-xl p-3 text-sm font-medium ${
                            isSuccess
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                    >
                        {message}
                    </div>
                )}

                {/* Join Button */}
                <Button
                    onClick={handleJoinEvent}
                    disabled={isLoading || isPending}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-300 disabled:opacity-60 dark:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Joining Event...
                        </>
                    ) : isPending ? (
                        "Checking Account..."
                    ) : (
                        <>
                            Join This Event
                            <ArrowRight size={18} className="ml-2" />
                        </>
                    )}
                </Button>

                {/* Footer */}
                <div className="border-t border-blue-100 pt-4 text-center dark:border-slate-700">
                    <p className="text-xs leading-5 text-slate-400">
                        By joining, you agree to participate responsibly
                        and respect the community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinEventCard;
