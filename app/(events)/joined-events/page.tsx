
"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import {
    CalendarDays,
    MapPin,
    Ticket,
    ArrowUpRight,
    CalendarCheck,
} from "lucide-react"

interface JoinedEvent {
    _id: string
    eventId: string
    eventTitle: string
    eventDescription: string
    eventType: string
    thumbnail: string
    location: string
    eventDate: string
    email: string
    name: string
}

const MyJoinedEvents = () => {
    const { data: session } = authClient.useSession()
    const [events, setEvents] = useState<JoinedEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!session?.user?.email) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        fetch(`http://localhost:8000/my-joined-events/${encodeURIComponent(session.user.email)}`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .finally(() => setIsLoading(false))
    }, [session?.user?.email])

    return (
        <section className="min-h-screen bg-background px-4 py-12 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                            <Ticket size={18} />
                            MY ACTIVITIES
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                            My Joined Events
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground md:text-base">
                            Keep track of all the events you've registered for.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <CalendarCheck size={22} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-foreground">
                                {events.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Registered Events
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(item => (
                            <div
                                key={item}
                                className="animate-pulse overflow-hidden rounded-2xl border border-border"
                            >
                                <div className="h-52 bg-muted" />
                                <div className="space-y-3 p-5">
                                    <div className="h-5 w-3/4 rounded bg-muted" />
                                    <div className="h-4 w-1/2 rounded bg-muted" />
                                    <div className="h-4 w-2/3 rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : events.length === 0 ? (

                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
                        <div className="mb-5 rounded-2xl bg-primary/10 p-5 text-primary">
                            <CalendarDays size={42} />
                        </div>

                        <h2 className="text-xl font-bold text-foreground">
                            No events joined yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            You haven't registered for any events. Explore upcoming events and find something exciting!
                        </p>
                    </div>

                ) : (

                    /* Event Cards */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map(event => (
                            <div
                                key={event._id}
                                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={event.thumbnail}
                                        alt={event.eventTitle}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                        {event.eventType}
                                    </span>

                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                                        <CalendarDays size={16} />
                                        {event.eventDate}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 p-5">

                                    <div>
                                        <h2 className="line-clamp-1 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                            {event.eventTitle}
                                        </h2>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {event.eventDescription}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin size={17} className="shrink-0 text-primary" />
                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-border pt-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Registration status
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-green-600">
                                                ✓ Registered
                                            </p>
                                        </div>

                                        <div className="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <ArrowUpRight size={19} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}

export default MyJoinedEvents
