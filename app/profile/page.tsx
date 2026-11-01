
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  Camera,
  Pencil,
  Save,
  X,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // Load user information into the form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      // Update user information using Better Auth
      const result = await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || null,
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to update profile.");
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session || !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-[#172033]">
          <User className="mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Login Required
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Please login to view your profile.
          </p>
          <a
            href="/sign-in"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-600"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-30 rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5 dark:border-slate-800 dark:bg-[#172033]">
          {/* Cover */}
          {/* <div className="relative h-40 rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 sm:h-52">            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_40%)]" />
            <div className="absolute bottom-5 right-6 text-white/80">
              <ShieldCheck size={28} />
            </div>
          </div> */}

          <div className="px-6 pb-8 sm:px-10 ">

            {/* Avatar and Edit Button */}
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end gap-4">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-100 shadow-lg dark:border-[#172033] dark:bg-slate-800 sm:h-32 sm:w-32">
                  {user.image ? (
                    <Image
                      height={200}
                      width={200}
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-14 w-14 text-blue-600" />
                  )}
                </div>

                <div className="pb-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Uddog Member
                  </p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setIsEditing(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-indigo-600"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Feedback */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30">
                {success}
              </div>
            )}

            {/* Profile Information */}
            <div className="mt-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Personal Information
                </h3>

                {isEditing && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    Editing Mode
                  </span>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Email - Read Only */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Email address cannot be changed here.
                    </p>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Profile Photo URL
                    </label>

                    <div className="relative">
                      <Camera className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Provide a public image URL for your profile picture.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => {
                        setFormData({
                          name: user.name || "",
                          image: user.image || "",
                        });
                        setError("");
                        setSuccess("");
                        setIsEditing(false);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-[#0B1220]">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <User size={17} className="text-blue-600" />
                      Full Name
                    </div>

                    <p className="break-words font-semibold text-slate-900 dark:text-white">
                      {user.name || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-[#0B1220]">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <Mail size={17} className="text-blue-600" />
                      Email Address
                    </div>

                    <p className="break-all font-semibold text-slate-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>

                </div>
              )}
            </div>

            {/* Account Status */}
            {!isEditing && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30">
                <ShieldCheck className="h-6 w-6 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    Your account is active
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Your profile information is managed securely.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
