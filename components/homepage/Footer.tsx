import React from "react";
import Link from "next/link";
import {
  Users,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Upcoming Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  const eventLinks = [
    { name: "Create Event", href: "/create-event" },
    { name: "Manage Events", href: "/manage-events" },
    { name: "Joined Events", href: "/joined-events" },
    { name: "Community", href: "/community" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-100 text-slate-700 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Information */}
          <div className="lg:col-span-4">

            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Users size={26} />
              </div>

              <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Uddog<span className="text-blue-600 dark:text-blue-500">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Uddog brings people together to create meaningful
              changes. Discover community events, connect with
              passionate individuals, and make a positive impact
              on society.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    <Icon size={19} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {eventLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
              Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h3>

            <ul className="space-y-5">

              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" />
                <span className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" />
                <a
                  href="mailto:hello@uddog.com"
                  className="break-all text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  hello@uddog.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Contact Us
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
              <HeartHandshake size={25} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Ready to make a difference?
              </h3>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Join our community and start creating positive change.
              </p>
            </div>
          </div>

          <Link
            href="/events"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Explore Events
            <ArrowUpRight size={17} />
          </Link>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row lg:px-8">

          <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            © {new Date().getFullYear()} Uddog. All rights reserved.
          </p>

          <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Made with <span className="text-red-500">♥</span> for a better community.
          </p>

          <div className="flex gap-5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            <Link
              href="/privacy-policy"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
