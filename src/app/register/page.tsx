"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../actions";

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        // Now you can successfully grab and check your values here:
        const email = formData.get("email");
        const password = formData.get("password");
        console.log("Email from formData:", email);
        console.log("Password from formData:", password);

        try {
            const result = await registerUser(formData);

            if (result?.error) {
                setError(result.error);
            } else {
                console.log("User is created successfully")
            }
        } catch (err: any) {
            if (err.message === "NEXT_REDIRECT" || err.digest?.includes("NEXT_REDIRECT")) {
                return;
            }
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Create an Account</h1>
                <p className="text-sm text-slate-500 mb-6">Start managing your flashcard decks today.</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 block w-full px-3.5 py-2.5 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 block w-full px-3.5 py-2.5 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}