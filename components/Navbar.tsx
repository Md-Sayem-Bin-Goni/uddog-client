"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logoDark from '@/public/images/logo-light.png'
import logoLight from '@/public/images/logo-dark.png'


import {
    CalendarDays,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    Moon,
    PlusCircle,
    Sun,
    Users,
    X,
} from "lucide-react";

import logo from "@/public/images/Uddog Community Impact Logo.png";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";

// Temporary user data
const user = {
    displayName: "Sayem",
    photoURL: "",
};

const menuItems = [
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
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sync theme state with HTML root class on mount
    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setIsDarkMode(isDark);
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    // Close mobile menu
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Logout function
    const handleLogout = () => {
        console.log("Logout clicked");
        // Add your authentication logout logic here.
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-gradient-to-r from-blue-100/95 via-blue-50 to-blue-100/95 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">

                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="shrink-0">
                    <Image
                        src={isDarkMode ? logoDark : logoLight}
                        alt="Uddog Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 lg:flex">
                    <Link
                        href="/events"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                        <CalendarDays size={18} />
                        Upcoming Events
                    </Link>
                </div>

                {/* Desktop Actions (Theme Toggle & Auth) */}
                <div className="hidden items-center gap-3 lg:flex">

                    {/* Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-full text-slate-600 hover:bg-blue-100/60 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
                    </Button>

                    {!user ? (
                        <Link href="/login">
                            <Button className="rounded-full bg-blue-600 px-7 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-full border border-slate-200 p-1.5 pr-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:hover:border-blue-500/50 dark:hover:bg-slate-900">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.photoURL} />
                                        <AvatarFallback className="bg-blue-100 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                            {user.displayName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        {user.displayName}
                                    </span>

                                    <ChevronDown size={15} className="text-slate-500 dark:text-slate-400" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56 p-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                                <DropdownMenuLabel className="dark:text-slate-200">
                                    {user.displayName}
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="dark:bg-slate-800" />

                                {menuItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <DropdownMenuItem key={item.href} asChild className="dark:focus:bg-slate-800 dark:focus:text-slate-100">
                                            <Link href={item.href} className="cursor-pointer">
                                                <Icon className="mr-2 h-4 w-4" />
                                                {item.title}
                                            </Link>
                                        </DropdownMenuItem>
                                    );
                                })}

                                <DropdownMenuSeparator className="dark:bg-slate-800" />

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/50 dark:focus:text-red-400"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-1 lg:hidden">

                    {/* Mobile Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-full text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
                    </Button>

                    {user && (
                        <Avatar className="h-9 w-9 ml-1">
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback className="bg-blue-100 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                {user.displayName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    )}

                    {!user && (
                        <Link href="/login" className="ml-1">
                            <Button size="sm" className="rounded-full bg-blue-600 px-5 dark:bg-blue-600 dark:hover:bg-blue-500">
                                Login
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-blue-100 bg-white px-4 py-4 shadow-lg lg:hidden dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/events"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                        >
                            <CalendarDays size={19} />
                            Upcoming Events
                        </Link>

                        {user && (
                            <>
                                <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                                {/* User Information */}
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.photoURL} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                            {user.displayName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {user.displayName}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Welcome back!
                                        </p>
                                    </div>
                                </div>

                                {/* User Menu Items */}
                                {menuItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                        >
                                            <Icon size={19} />
                                            {item.title}
                                        </Link>
                                    );
                                })}

                                <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                                {/* Mobile Logout */}
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleLogout();
                                    }}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                                >
                                    <LogOut size={19} />
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