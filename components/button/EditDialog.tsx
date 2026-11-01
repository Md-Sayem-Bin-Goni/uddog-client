
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
    X,
    Sparkles,
    Loader2,
    CheckCircle2,
    AlertCircle,
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
    const [success, setSuccess] = React.useState("");

    const [formData, setFormData] = React.useState({
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        thumbnail: event.thumbnail,
        location: event.location,
        eventDate: event.eventDate,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsSubmitting(true);

        try {
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

            if (!res.ok) {
                throw new Error(data.message || "Failed to update event.");
            }

            setSuccess("Event updated successfully!");

            setTimeout(() => {
                setOpen(false);
                router.refresh();
            }, 700);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

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
        setSuccess("");
        setOpen(false);
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="sm"
className="h-11 w-full gap-2 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:from-blue-600 dark:hover:to-indigo-600 dark:hover:text-white"                    />
                }
            >
                <Edit size={16} />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-3xl dark:bg-slate-950">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-6 py-8 text-white sm:px-8">
                    <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-indigo-300/20 blur-2xl" />

                    <div className="relative">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                            <Sparkles size={24} />
                        </div>

                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white sm:text-3xl">
                                Edit Your Event
                            </DialogTitle>

                            <DialogDescription className="mt-2 max-w-md text-sm leading-relaxed text-blue-100">
                                Update your event details and keep your
                                community informed.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">

                    {/* Title */}
                    <div>
                        <label className={labelClass}>
                            Event Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your event title"
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelClass}>
                            Event Description *
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell people what your event is about..."
                            rows={5}
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Event Type */}
                    <div>
                        <label className={labelClass}>
                            Event Category *
                        </label>

                        <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        >
                            <option value="">Select event category</option>

                            {eventTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className={labelClass}>
                            <span className="flex items-center gap-2">
                                <ImagePlus size={17} className="text-blue-600" />
                                Thumbnail Image URL *
                            </span>
                        </label>

                        <input
                            type="url"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                            className={inputClass}
                        />

                        {formData.thumbnail && (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                                <img
                                    src={formData.thumbnail}
                                    alt="Event thumbnail preview"
                                    className="h-48 w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Location & Date */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className={labelClass}>
                                <span className="flex items-center gap-2">
                                    <MapPin size={17} className="text-blue-600" />
                                    Event Location *
                                </span>
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter event location"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                <span className="flex items-center gap-2">
                                    <CalendarDays size={17} className="text-blue-600" />
                                    Event Date *
                                </span>
                            </label>

                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                    </div>

                    {/* Feedback */}
                    {error && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                            <CheckCircle2 size={18} />
                            {success}
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end dark:border-slate-800">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="rounded-xl px-6"
                        >
                            <X size={16} className="mr-2" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-indigo-700"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={17} className="mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={17} className="mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;
