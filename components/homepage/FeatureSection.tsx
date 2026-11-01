
import React from "react";
import {
    CalendarPlus,
    Users,
    MapPin,
    Settings,
    HeartHandshake,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";

const features = [
    {
        icon: CalendarPlus,
        number: "01",
        title: "Create Events",
        description:
            "Bring your ideas to life. Create and organize events with all the details in one place.",
    },
    {
        icon: Users,
        number: "02",
        title: "Join Events",
        description:
            "Explore exciting activities and join events that match your interests and passion.",
    },
    {
        icon: Settings,
        number: "03",
        title: "Manage Events",
        description:
            "Manage your created events, update information, and keep everything organized.",
    },
    {
        icon: MapPin,
        number: "04",
        title: "Explore Opportunities",
        description:
            "Discover workshops, seminars, campaigns, and meaningful activities around you.",
    },
    {
        icon: HeartHandshake,
        number: "05",
        title: "Build Community",
        description:
            "Connect with like-minded people and build relationships through shared experiences.",
    },
    {
        icon: ShieldCheck,
        number: "06",
        title: "Easy Experience",
        description:
            "Enjoy a simple and organized platform designed to make event participation easier.",
    },
];

const FeatureSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-5 py-24 dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#111B35] sm:px-8 lg:px-16">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-5 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-400">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        WHY CHOOSE UDDOG?
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                        Everything Starts With
                        <span className="mt-2 block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            An Uddog
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                        From creating events to building meaningful connections,
                        Uddog gives you everything you need to turn ideas into impact.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.number}
                                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/70 dark:border-slate-700/70 dark:bg-[#172033] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/30"
                            >
                                {/* Hover Decoration */}
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100/60 transition-transform duration-500 group-hover:scale-150 dark:bg-blue-500/5" />

                                <div className="relative flex items-start justify-between">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:shadow-blue-950/40">
                                        <Icon size={29} strokeWidth={2} />
                                    </div>

                                    <span className="text-sm font-extrabold tracking-widest text-blue-200 dark:text-slate-600">
                                        {feature.number}
                                    </span>
                                </div>

                                <div className="relative mt-8">
                                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="relative mt-7 flex items-center justify-between border-t border-blue-50 pt-5 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                        Discover More
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Banner */}
                <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-7 py-10 text-center shadow-xl shadow-blue-200/50 dark:shadow-blue-950/30 sm:px-12">
                    <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                        Together We Create Impact.
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                        Every great initiative begins with an idea. Start yours
                        with Uddog and make a difference.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default FeatureSection;
