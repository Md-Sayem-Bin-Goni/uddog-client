
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Image as ImageIcon,
    Lock,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const photoURL = formData.get("photoURL") as string;
        const password = formData.get("password") as string;

        // Password validation
        if (!/[A-Z]/.test(password)) {
            toast.error("Password needs an uppercase letter!");
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password needs a lowercase letter!");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters!");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photoURL,
            });

            if (error) {
                toast.error(error.message || "Registration failed!");
                return;
            }

            if (data) {
                toast.success("Registration successful!");

                form.reset();

                router.push("/");
                router.refresh();
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">

            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Register to get started with us
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>

                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="pl-10 bg-background"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 bg-background"
                                required
                            />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-2">
                        <Label htmlFor="photoURL">Photo URL</Label>

                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                            <Input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                placeholder="Enter your photo URL"
                                className="pl-10 bg-background"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pl-10 pr-10 bg-background"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            At least 8 characters, including uppercase and lowercase letters.
                        </p>
                    </div>

                    {/* Register Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>

                </form>

                {/* Login Link */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default RegisterPage;
