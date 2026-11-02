import bannerimg from "@/public/images/Banner img.png";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  HeartHandshake,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-600/10" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-600/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 md:gap-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:text-sm dark:border-blue-900/50 dark:bg-blue-950/60 dark:text-blue-300">
            <HeartHandshake size={17} />
            Together We Can Make A Difference
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl dark:text-white">
            Small Actions,
            <span className="mt-1 block text-blue-600 dark:text-blue-400">
              Big Changes.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg dark:text-slate-300">
            Connect with passionate people, discover meaningful events,
            and take action to create a better community. Your next
            good deed starts here.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

            <Link href="/upcomming-events">
              <Button>
                Explore Events
              </Button>
            </Link>

            <Link href="/upcomming-events">
              <Button>
                Explore Events
              </Button>
            </Link>

          </div>

          {/* Statistics */}
          <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-2 border-t border-slate-200 pt-7 sm:mt-12 sm:gap-5 lg:max-w-lg dark:border-slate-800">

            <div className="flex flex-col items-center lg:items-start">
              <CalendarDays className="mb-2 h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                120+
              </h3>
              <p className="mt-1 text-center text-[10px] text-slate-500 sm:text-xs lg:text-left dark:text-slate-400">
                Events Created
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <Users className="mb-2 h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                2.5K+
              </h3>
              <p className="mt-1 text-center text-[10px] text-slate-500 sm:text-xs lg:text-left dark:text-slate-400">
                Active Members
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <HeartHandshake className="mb-2 h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                50+
              </h3>
              <p className="mt-1 text-center text-[10px] text-slate-500 sm:text-xs lg:text-left dark:text-slate-400">
                Communities
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">

          {/* Decorative Background Glows */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-200/60 blur-2xl sm:h-36 sm:w-36 dark:bg-blue-600/20" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-indigo-200/60 blur-2xl sm:h-36 sm:w-36 dark:bg-indigo-600/20" />

          {/* Main Image Frame */}
          <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:rounded-3xl sm:border-8 sm:shadow-2xl dark:border-slate-800">
            <Image
              src={bannerimg}
              alt="People working together in a community event"
              width={800}
              height={700}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-5 left-3 max-w-[230px] rounded-xl border border-slate-100 bg-white p-3 shadow-xl sm:-bottom-6 sm:-left-6 sm:max-w-xs sm:rounded-2xl sm:p-5 dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-12 sm:w-12 dark:bg-blue-950 dark:text-blue-300">
                <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                  Be the Change!
                </p>
                <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                  Make your community better.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;