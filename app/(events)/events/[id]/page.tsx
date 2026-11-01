import React from "react"
import Image from "next/image"
import { CalendarDays, MapPin, Users, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import JoinEventCard from "@/components/eventsCard/JoinEventCard"

interface EventDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

interface EventDetails {
  _id: string
  title: string
  description: string
  eventType: string
  eventDate: string
  location: string
  thumbnail: string
  attendeesCount?: number
}

// Fetch a single event from the backend API
async function getEventDetails(id: string): Promise<EventDetails | null> {
  try {
    const res = await fetch(`http://localhost:8000/events/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.event ?? null
  } catch (error) {
    console.error("Failed to fetch event details:", error)
    return null
  }
}

// Format event date
function formatEventDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number)

  if (!year || !month || !day) return eventDate

  return format(new Date(year, month - 1, day), "MMMM d, yyyy")
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params

  const event = await getEventDetails(id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/upcomming-events"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            ID: {id.slice(-6)}...
          </span>
        </div>

        {/* Hero Banner Section */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl bg-muted border border-border">
          {event.thumbnail ? (
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
          
          {/* Subtle bottom gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating Badge & Title overlay on image */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              {event.eventType || "Event"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Quick Info Bar (Pills Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Date</p>
              <p className="text-sm font-semibold text-foreground">{formatEventDate(event.eventDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Location</p>
              <p className="text-sm font-semibold text-foreground truncate max-w-[180px]">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Attendees</p>
              <p className="text-sm font-semibold text-foreground">{event.attendeesCount ?? 0} Joined</p>
            </div>
          </div>

        </div>

        {/* Main Content & Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Description Block */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-foreground">About This Event</h2>
            <div className="h-px w-full bg-border" />
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {event.description}
            </p>
          </div>

          {/* Registration / Action Card */}
        <JoinEventCard event={event}/>

        </div>

      </div>
    </div>
  )
}