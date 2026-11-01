
"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Edit,
    CalendarDays,
    MapPin,
    ImagePlus,
    Save,
} from "lucide-react";

import { useRouter } from "next/navigation";
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

const eventTypes = [
    "Cleanup",
    "Workshop",
    "Seminar",
    "Fundraising",
    "Sports",
    "Cultural",
    "Other",
];

const EditDialog = ({ event }: { event: EventItem }) => {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState("");

    const [formData, setFormData] = React.useState({
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        thumbnail: event.thumbnail,
        location: event.location,
        eventDate: event.eventDate,
    });

    // Handle Input Change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update Event
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const res = await fetch(
            `http://localhost:8000/update-event/${event._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await res.json();

        if (res.ok) {
            setOpen(false);
            router.refresh();
            window.location.reload();
        } else {
            setError(data.message || "Failed to update event");
        }

        setIsSubmitting(false);
    };

    // Reset Form
    const handleCancel = () => {
        setFormData({
            title: event.title,
            description: event.description,
            eventType: event.eventType,
            thumbnail: event.thumbnail,
            location: event.location,
            eventDate: event.eventDate,
        });

        setError("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant="outline" size="sm" className="gap-2" />
                }
            >
                <Edit size={16} />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">

                {/* Heading */}
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Edit Event
                    </DialogTitle>

                    <DialogDescription>
                        Update your event information and save changes.
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Event Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                required
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Event Description *
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your event..."
                                rows={5}
                                required
                                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Event Type *
                            </label>

                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                            >
                                <option value="">Select event type</option>

                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <ImagePlus size={17} />
                                Thumbnail Image URL *
                            </label>

                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                            />
                        </div>

                        {/* Location & Date */}
                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                    <MapPin size={17} />
                                    Event Location *
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter event location"
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                    <CalendarDays size={17} />
                                    Event Date *
                                </label>

                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                                />
                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t border-border pt-5">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                <Save size={16} />
                                {isSubmitting ? "Updating..." : "Save Changes"}
                            </Button>

                        </div>

                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;
