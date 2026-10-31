"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    console.log({ email, password });

    // TODO: Connect your authentication API here
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google authentication
    console.log("Google Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">

  <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-lg">

    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome Back!
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Login to your account to continue
      </p>
    </div>

    {/* Login Form */}
    <form onSubmit={handleLogin} className="space-y-5">

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email Address
        </Label>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 bg-background text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10 bg-background text-foreground placeholder:text-muted-foreground"
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
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        Login
      </Button>

    </form>

    {/* Divider */}
    <div className="my-6 flex items-center gap-3">
      <Separator className="flex-1" />

      <span className="text-xs text-muted-foreground">
        OR CONTINUE WITH
      </span>

      <Separator className="flex-1" />
    </div>

    {/* Google Login */}
    <Button
      type="button"
      variant="outline"
      className="w-full bg-background text-foreground hover:bg-muted"
      onClick={handleGoogleLogin}
    >
      <svg viewBox="0 0 48 48" className="mr-2 h-5 w-5">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.1 46.98 31.88 46.98 24.55Z"/>
        <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/>
      </svg>

      Continue with Google
    </Button>

    {/* Register Link */}
    <p className="mt-8 text-center text-sm text-muted-foreground">
      Don't have an account?{" "}

      <Link
        href="/register"
        className="font-semibold text-blue-600 hover:underline"
      >
        Create an account
      </Link>
    </p>

  </div>
</div>
  );
};

export default LoginPage;