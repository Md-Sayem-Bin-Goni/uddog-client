
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="p-10">Loading...</p>;
  }

  if (!session) {
    return <p className="p-10">Please login first.</p>;
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-3xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <div className="rounded-xl border p-6">

        <Image
        height={500}
        width={500}
          src={user.image || "/default-avatar.png"}
          alt="Profile"
          className="mb-4 h-24 w-24 rounded-full object-cover"
        />

        <h2 className="text-xl font-semibold">
          {user.name}
        </h2>

        <p className="mt-2 text-gray-500">
          {user.email}
        </p>

      </div>
    </div>
  );
};

export default ProfilePage;
