
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Theme Toggle
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

            toast.success("Logout successful!");
            setIsOpen(false);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <span className="text-2xl font-bold text-blue-600">
                        Uddog.
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 lg:flex">

                    <Link
                        href="/upcomming-events"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                        <CalendarDays size={18} />
                        Upcoming Events
                    </Link>

                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        disabled={!mounted}
                    >
                        {mounted && theme === "dark" ? (
                            <Sun size={20} className="text-amber-400" />
                        ) : (
                            <Moon size={20} />
                        )}
                    </Button>

                    {/* Authentication */}
                    {isPending ? (
                        <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    ) : !user ? (

                        <Link href="/login">
                            <Button className="rounded-full bg-blue-600 px-7 hover:bg-blue-700">
                                Login
                            </Button>
                        </Link>

                    ) : (

                        /* User Popover */
                        <Popover>


                            <Popover>
                                <PopoverTrigger className="flex items-center gap-2 rounded-full border border-slate-200 p-1.5 pr-3 hover:bg-blue-100 dark:border-slate-700 dark:hover:bg-slate-800">

                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback>
                                            {user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="text-sm font-semibold">
                                        {user.name}
                                    </span>

                                </PopoverTrigger>

                                <PopoverContent align="end" className="w-64 p-3">

                                    {/* User Information */}
                                    <div className="flex items-center gap-3 pb-3">

                                        <Avatar>
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback>
                                                {user.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="my-2 border-t" />

                                    {/* Menu Items */}
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                                            >
                                                <Icon size={17} />
                                                {item.title}
                                            </Link>
                                        );
                                    })}

                                    <div className="my-2 border-t" />

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>

                                </PopoverContent>
                            </Popover>


                            <PopoverContent
                                align="end"
                                className="w-64 p-3"
                            >

                                {/* User Information */}
                                <div className="flex items-center gap-3 pb-3">

                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback>
                                            {user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>

                                <div className="my-2 border-t" />

                                {/* User Routes */}
                                <div className="space-y-1">

                                    {menuItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <Icon size={17} />
                                                {item.title}
                                            </Link>
                                        );
                                    })}

                                </div>

                                <div className="my-2 border-t" />

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>

                            </PopoverContent>
                        </Popover>
                    )}

                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 lg:hidden">

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        disabled={!mounted}
                    >
                        {mounted && theme === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </Button>

                    {!isPending && user && (
                        <Link href="/profile">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.image || ""} />
                                <AvatarFallback>
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    )}

                    {!isPending && !user && (
                        <Link href="/login">
                            <Button size="sm" className="bg-blue-600">
                                Login
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={23} /> : <Menu size={23} />}
                    </Button>

                </div>

            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-blue-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">

                    <div className="flex flex-col gap-2">

                        <Link
                            href="/upcomming-events"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-accent"
                        >
                            <CalendarDays size={18} />
                            Upcoming Events
                        </Link>

                        {user && (
                            <>
                                <div className="my-2 border-t" />

                                {/* User Information */}
                                <div className="flex items-center gap-3 px-3 py-2">

                                    <Avatar>
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback>
                                            {user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>

                                {/* User Routes */}
                                {menuItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-accent"
                                        >
                                            <Icon size={18} />
                                            {item.title}
                                        </Link>
                                    );
                                })}

                                <div className="my-2 border-t" />

                                {/* Mobile Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>

                            </>
                        )}

                    </div>
                </div>
            )}

        </header>
    );
};

export default Navbar;
