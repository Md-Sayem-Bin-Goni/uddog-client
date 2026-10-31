
"use client";

import React, { useState } from "react";
import { CalendarDays, MapPin, ImagePlus, PlusCircle } from "lucide-react";

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

    // Today's date in YYYY-MM-DD format
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
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.eventDate || formData.eventDate <= minDate) {
            setError("Please select a future event date.");
            return;
        }

        console.log("Event Data:", formData);

        // API integration will be added here
        const response = await fetch(
            "http://localhost:5000/add-events",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const result = await response.json();

        console.log(result);

    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
            <div className="mx-auto max-w-3xl">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                        <PlusCircle size={28} />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Create an Event
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Make a difference in your community by organizing an event.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Event Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:text-white"
                            />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Event Description *
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your event..."
                                rows={5}
                                required
                                className="w-full resize-none rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:text-white"
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Event Type *
                            </label>

                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            >
                                <option value="">Select event type</option>

                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
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
                                className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white"
                            />
                        </div>

                        {/* Location & Date */}
                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
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
                                    className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <CalendarDays size={17} />
                                    Event Date *
                                </label>

                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    min={minDate}
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white"
                                />
                            </div>

                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-cyan-600 active:scale-[0.99]"
                        >
                            Create Event
                        </button>

                    </form>
                </div>

                <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    Together, we can make our community a better place.
                </p>

            </div>
        </div>
    );
};

export default CreateEventPage;
