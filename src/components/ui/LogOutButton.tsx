"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-6 py-3 text-sm font-medium text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
            Log Out
        </button>
    );
}