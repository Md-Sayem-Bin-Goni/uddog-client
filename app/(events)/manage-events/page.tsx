
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

import {
    CalendarDays,
    Plus,
    Search,
} from "lucide-react"

import EventManageCard from "@/components/eventsCard/EventManageCard"

interface EventItem {
    _id: string
    title: string
    description: string
    eventType: string
    thumbnail: string
    location: string
    eventDate: string
    createdBy: string
}

const ManageEventsPage = () => {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()

    const [events, setEvents] = useState<EventItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    // Fetch My Created Events
    useEffect(() => {
        if (isPending) return

        if (!session?.user?.email) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        fetch(
            `http://localhost:8000/my-created-events/${encodeURIComponent(session.user.email)}`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch events")
                }
                return res.json()
            })
            .then(data => setEvents(data))
            .finally(() => setIsLoading(false))

    }, [session?.user?.email, isPending])

    // Search Events
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="min-h-screen bg-background px-4 py-10 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                            <CalendarDays size={18} />
                            EVENT MANAGEMENT
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                            Manage Events
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage, update and organize your created events.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/create-event")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                        <Plus size={18} />
                        Create Event
                    </button>
                </div>

                {/* Search and Count */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />

                        <input
                            type="text"
                            placeholder="Search your events..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                        Total Events:{" "}
                        <span className="font-bold text-primary">
                            {events.length}
                        </span>
                    </div>
                </div>

                {/* Loading */}
                {isLoading || isPending ? (
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredEvents.length === 0 ? (

                    /* Empty State */
                    <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
                        <CalendarDays
                            size={42}
                            className="mx-auto mb-5 text-primary"
                        />

                        <h2 className="text-xl font-bold text-foreground">
                            {search
                                ? "No matching events"
                                : "No events created yet"}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {search
                                ? "Try another event name."
                                : "Create your first event and manage it here."}
                        </p>
                    </div>

                ) : (

                    /* Event Cards */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map(event => (
                            <EventManageCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}

export default ManageEventsPage
