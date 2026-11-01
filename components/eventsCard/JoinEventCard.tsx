
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

interface EventItem {
    _id: string
    title: string
    description: string
    eventType: string
    thumbnail: string
    location: string
    eventDate: string
}

interface JoinEventCardProps {
    event: EventItem
}

const JoinEventCard: React.FC<JoinEventCardProps> = ({ event }) => {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const [isLoading, setIsLoading] = useState(false)

    const handleJoinEvent = async () => {
        if (!session?.user) {
            console.log("User is not logged in")
            return
        }

        setIsLoading(true)

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
        })

        const data = await res.json()

        if (res.ok) {
            console.log(data.message || "Successfully joined event")
            router.refresh()
        } else {
            console.log(data.message || "Failed to join event")
        }

        setIsLoading(false)
    }

    return (
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:col-span-1">
            <div>
                <h3 className="mb-1 text-base font-bold text-foreground">
                    Ready to join?
                </h3>

                <p className="text-xs text-muted-foreground">
                    Secure your spot by registering for {event.title} now.
                </p>
            </div>

            <div className="h-px w-full bg-border" />

            <div className="space-y-3">
                <Button
                    onClick={handleJoinEvent}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? "Joining..." : "Join event"}
                </Button>

                <div className="pt-2 text-center">
                    <span className="font-mono text-[11px] text-muted-foreground">
                        Full ID: {event._id}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default JoinEventCard
