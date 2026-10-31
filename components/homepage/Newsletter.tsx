import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Send, Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-white px-4 py-16 transition-colors duration-200 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-950">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-5 py-14 shadow-xl sm:px-10 sm:py-16 lg:px-16 dark:from-blue-900 dark:via-slate-900 dark:to-indigo-950 dark:border dark:border-slate-800">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10 dark:border-blue-500/5" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[35px] border-white/10 dark:border-blue-500/5" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-950/40">
            <Sparkles size={16} />
            Stay Connected With Uddog
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Make Every Update
            <span className="block text-blue-200 dark:text-blue-300">
              A New Opportunity.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8 dark:text-slate-300">
            Get the latest community events, inspiring stories,
            volunteering opportunities, and social initiatives
            delivered straight to your inbox.
          </p>

          {/* Newsletter Form - UI Only */}
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row sm:rounded-full dark:bg-slate-900 dark:border dark:border-slate-800">

            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-5">
              <Mail className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-800 sm:rounded-full dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Subscribe
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Bottom Text */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-blue-100 sm:text-sm dark:text-slate-400">
            <span className="flex items-center gap-2">
              <Send size={14} />
              Inspiring updates
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-blue-200 sm:block dark:bg-slate-600" />

            <span>No spam, just positive impact.</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;