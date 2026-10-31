
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Image,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

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

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const photoURL = (form.elements.namedItem("photoURL") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinimumLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain an uppercase letter!");
      return;
    }

    if (!hasLowercase) {
      toast.error("Password must contain a lowercase letter!");
      return;
    }

    if (!hasMinimumLength) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);

      // Connect your registration API here
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photoURL,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed!");
        return;
      }

      toast.success("Registration successful!");

      form.reset();

      router.push("/login");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
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
              <Image className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

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
              At least 6 characters, including uppercase and lowercase letters.
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
