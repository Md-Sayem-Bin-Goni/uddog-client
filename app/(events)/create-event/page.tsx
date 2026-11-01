"use client";

import React, { useState } from "react";
import {
    CalendarDays,
    MapPin,
    ImagePlus,
    PlusCircle,
    Sparkles,
    ArrowRight,
    Loader2,
    Type,
    AlignLeft,
    Tag,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Blood Donation",
    "Social Awareness",
    "Other",
];

const CreateEventPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: "",
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data: session } = authClient.useSession();

    // Today's date
    const today = new Date();
    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setError("");
        setIsSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setError("");
        setIsSuccess(false);

        if (!session?.user?.email) {
            setError("Please sign in before creating an event.");
            return;
        }

        if (!formData.eventDate || formData.eventDate <= minDate) {
            setError("Please select a future event date.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch("http://localhost:8000/add-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    createdBy: session.user.email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create event.");
            }

            setIsSuccess(true);

            setFormData({
                title: "",
                description: "",
                eventType: "",
                thumbnail: "",
                location: "",
                eventDate: "",
            });

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-800";

    const labelClass =
        "mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200";

    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-12 dark:bg-[#0B1220] md:px-8">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-10 text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25">
                        <PlusCircle size={32} />
                    </div>

                    <div className="mb-3 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                        <Sparkles size={15} />
                        MAKE AN IMPACT
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                        Create an{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Event
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 dark:text-slate-400 md:text-base">
                        Bring people together, inspire change, and make a
                        difference in your community.
                    </p>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-100/40 dark:border-slate-700 dark:bg-[#172033] dark:shadow-none">

                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-6 py-5 text-white sm:px-8">
                        <h2 className="text-lg font-bold">
                            Event Information
                        </h2>
                        <p className="mt-1 text-sm text-blue-100">
                            Fill in the details to publish your event.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">

                        {/* Event Title */}
                        <div>
                            <label className={labelClass}>
                                <Type size={17} className="text-blue-600" />
                                Event Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Community Cleanup Campaign"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelClass}>
                                <AlignLeft size={17} className="text-blue-600" />
                                Event Description *
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell people what this event is about..."
                                rows={5}
                                required
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className={labelClass}>
                                <Tag size={17} className="text-blue-600" />
                                Event Category *
                            </label>

                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Choose a category</option>

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
                                <ImagePlus size={17} className="text-blue-600" />
                                Thumbnail Image URL *
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
                                        alt="Event preview"
                                        className="h-48 w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Location and Date */}
                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label className={labelClass}>
                                    <MapPin size={17} className="text-blue-600" />
                                    Event Location *
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
                                    <CalendarDays size={17} className="text-blue-600" />
                                    Event Date *
                                </label>

                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    min={minDate}
                                    required
                                    className={inputClass}
                                />
                            </div>

                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {isSuccess && (
                            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                                <CheckCircle2 size={18} />
                                Your event has been created successfully!
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-13 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={19} />
                                    Creating Event...
                                </>
                            ) : (
                                <>
                                    Create Event
                                    <ArrowRight className="ml-2" size={19} />
                                </>
                            )}
                        </Button>

                        <p className="text-center text-xs text-slate-400">
                            By creating this event, you're helping build a stronger community.
                        </p>

                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    Together, we can make our community a better place.
                </p>

            </div>
        </section>
    );
};

export default CreateEventPage;