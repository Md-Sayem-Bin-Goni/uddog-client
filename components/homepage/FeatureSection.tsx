
import {
    CalendarPlus,
    Users,
    MapPin,
    Settings,
    HeartHandshake,
    ShieldCheck,
} from "lucide-react";

const features = [
    {
        icon: CalendarPlus,
        title: "Create Events",
        description: "Create and organize events easily.",
    },
    {
        icon: Users,
        title: "Join Events",
        description: "Join activities that match your interests.",
    },
    {
        icon: Settings,
        title: "Manage Events",
        description: "Update and manage your created events.",
    },
    {
        icon: MapPin,
        title: "Explore Opportunities",
        description: "Discover workshops and meaningful activities.",
    },
    {
        icon: HeartHandshake,
        title: "Build Community",
        description: "Connect with people through shared experiences.",
    },
    {
        icon: ShieldCheck,
        title: "Easy Experience",
        description: "Enjoy a simple and organized platform.",
    },
];

const FeatureSection = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-5 py-16 dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#111B35] sm:px-8 lg:px-16">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400">
                        WHY CHOOSE UDDOG?
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Everything Starts With
                        <span className="block text-blue-600 dark:text-blue-400">
                            An Uddog
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        Turn your ideas into impact with Uddog.
                        Create events, connect with people and build communities.
                    </p>
                </div>

                {/* Small Feature Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 dark:border-slate-700 dark:bg-[#172033] dark:hover:border-blue-500/50 dark:hover:shadow-blue-950/30"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
                                    <Icon size={21} />
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Banner */}
                <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-7 text-center">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                        Together We Create Impact.
                    </h3>

                    <p className="mt-2 text-sm text-blue-100">
                        Start your initiative with Uddog and make a difference.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default FeatureSection;
