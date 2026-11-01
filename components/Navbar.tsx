
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
    CalendarDays,
    LayoutDashboard,
    LogOut,
    Menu,
    Moon,
    PlusCircle,
    Sun,
    User,
    Users,
    X,
    ChevronDown,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const menuItems = [
    {
        title: "My Profile",
        href: "/profile",
        icon: User,
    },
    {
        title: "Create Event",
        href: "/create-event",
        icon: PlusCircle,
    },
    {
        title: "Manage Events",
        href: "/manage-events",
        icon: LayoutDashboard,
    },
    {
        title: "Joined Events",
        href: "/joined-events",
        icon: Users,
    },
];

const Navbar = () => {
    const pathname = usePathname();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    // Mounted check for theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menus when route changes
    useEffect(() => {
        setIsProfileOpen(false);
        setIsOpen(false);
    }, [pathname]);

    // Theme toggle
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Logout
    const handleLogout = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("Logout failed!");
                return;
            }

            setIsProfileOpen(false);
            setIsOpen(false);

            toast.success("Logout successful!");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    // User initial
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

    // Theme button
    const ThemeButton = () => (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label="Toggle theme"
            className="rounded-xl border border-blue-100 bg-white/70 text-slate-700 shadow-sm transition-all hover:bg-blue-100 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
            {mounted && theme === "dark" ? (
                <Sun size={19} className="text-amber-400" />
            ) : (
                <Moon size={19} className="text-blue-600 dark:text-blue-400" />
            )}
        </Button>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100/80 bg-white/85 shadow-sm shadow-blue-100/20 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-none">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => {
                        setIsOpen(false);
                        setIsProfileOpen(false);
                    }}
                    className="group flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <Sparkles size={21} />
                    </div>

                    <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Uddog
                        <span className="text-blue-600 dark:text-blue-400">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 lg:flex">
                    <Link
                        href="/upcomming-events"
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            pathname === "/upcomming-events"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                        }`}
                    >
                        <CalendarDays size={18} />
                        Upcoming Events
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">

                    <ThemeButton />

                    {isPending ? (
                        <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    ) : !user ? (
                        <Link href="/login">
                            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl">
                                Login
                            </Button>
                        </Link>
                    ) : (

                        /* User Profile Popover */
                        <Popover
                            open={isProfileOpen}
                            onOpenChange={setIsProfileOpen}
                        >
                            <PopoverTrigger
                                className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white/70 px-3 py-2 text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <Avatar className="h-9 w-9 border-2 border-blue-100 dark:border-slate-700">
                                    <AvatarImage src={user.image || ""} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>

                                <span className="max-w-28 truncate text-sm font-semibold">
                                    {user.name}
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        isProfileOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </PopoverTrigger>

                            <PopoverContent
                                align="end"
                                sideOffset={12}
                                className="w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
                            >

                                {/* Profile Header */}
                                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
                                    <div className="flex items-center gap-3">

                                        <Avatar className="h-12 w-12 border-2 border-white/40">
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback className="bg-white/20 font-bold text-white">
                                                {userInitial}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-bold">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs text-blue-100">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-blue-100">
                                        <Sparkles size={13} />
                                        Welcome to Uddog
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="my-2 space-y-1">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsProfileOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                                                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                                    }`}
                                                >
                                                    <Icon size={17} />
                                                </div>

                                                {item.title}

                                                {isActive && (
                                                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Logout */}
                                <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10">
                                            <LogOut size={17} />
                                        </div>
                                        Logout
                                    </button>
                                </div>

                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 lg:hidden">

                    <ThemeButton />

                    {!isPending && user && (
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                        >
                            <Avatar className="h-9 w-9 border-2 border-blue-100 dark:border-slate-700">
                                <AvatarImage src={user.image || ""} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                                    {userInitial}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    )}

                    {!isPending && !user && (
                        <Link href="/login">
                            <Button
                                size="sm"
                                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white"
                            >
                                Login
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle menu"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="rounded-xl text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        {isOpen ? <X size={23} /> : <Menu size={23} />}
                    </Button>
                </div>

            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-blue-100 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${
                    isOpen
                        ? "max-h-[650px] opacity-100"
                        : "max-h-0 border-t-0 opacity-0"
                }`}
            >
                <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">

                    {/* Upcoming Events */}
                    <Link
                        href="/upcomming-events"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                            pathname === "/upcomming-events"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                    >
                        <CalendarDays size={19} />
                        Upcoming Events
                    </Link>

                    {user && (
                        <>
                            {/* Mobile User Info */}
                            <div className="my-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-11 w-11 border-2 border-white/40">
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback className="bg-white/20 font-bold text-white">
                                            {userInitial}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-xs text-blue-100">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile User Routes */}
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                            isActive
                                                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.title}
                                    </Link>
                                );
                            })}

                            {/* Mobile Logout */}
                            <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                >
                                    <LogOut size={19} />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </header>
    );
};

export default Navbar;
