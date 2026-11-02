
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Home,
    SearchX,
    Sparkles,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

                {/* Logo Icon */}
                <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25">
                    <Sparkles size={32} />
                </div>

                {/* 404 Illustration */}
                <div className="relative mb-6">
                    <h1 className="select-none bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-[120px] font-black leading-none tracking-tighter text-transparent sm:text-[170px]">
                        404
                    </h1>

                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-12 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-indigo-600 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/90 dark:text-indigo-400">
                        <SearchX size={32} />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                        Page Not Found
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Oops! Lost Your Way?
                    </h2>

                    <p className="mx-auto max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
                        The page you&apos;re looking for doesn&apos;t exist or may
                        have been moved. Don&apos;t worry, let&apos;s get you back
                        on track!
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/upcomming-events"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-700 sm:w-auto"
                    >
                        <CalendarDays size={18} />
                        Explore Events
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-14">
                    <div className="mx-auto mb-5 h-px max-w-xs bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                        <ArrowLeft size={15} />
                        Uddog
                        <span className="text-blue-600 dark:text-blue-400">.</span>
                    </Link>

                    <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                        Bringing people together, one event at a time.
                    </p>
                </div>

            </div>
        </main>
    );
}
