import React from "react";
import Image from "next/image";
import { ArrowUpRight, Images } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: 1,
    title: "Community Tree Plantation",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
  },
  {
    id: 2,
    title: "Helping Those in Need",
    category: "Charity",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
  },
  {
    id: 3,
    title: "Community Clean-up",
    category: "Cleanliness",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  },
  {
    id: 4,
    title: "Blood Donation Campaign",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
  },
  {
    id: 5,
    title: "Education for Everyone",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    id: 6,
    title: "Food Distribution Program",
    category: "Social Work",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  },
];

const Gallery = () => {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-200 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Images size={17} />
            Our Memories
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Moments That{" "}
            <span className="text-blue-600 dark:text-blue-400">Matter</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
            Every small action creates a meaningful story.
            Explore beautiful moments from our community
            service events and social initiatives.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative isolate overflow-hidden rounded-2xl bg-slate-200 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 sm:p-6">

                <span className="mb-2 w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white dark:bg-blue-700">
                  {item.category}
                </span>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {item.title}
                  </h3>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition group-hover:bg-blue-600">
                    <ArrowUpRight size={19} />
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Footer Text */}
        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          Together, we create stories worth sharing.
        </p>

      </div>
    </section>
  );
};

export default Gallery;