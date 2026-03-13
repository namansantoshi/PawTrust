"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
            router.refresh();
        } else {
            setError("Incorrect password. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-8">
                <div className="text-center mb-7">
                    <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">🐾</div>
                    <h1 className="text-xl font-bold text-gray-900">PawTrust Admin</h1>
                    <p className="text-sm text-gray-500 mt-1">Enter your admin password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors disabled:opacity-60"
                    >
                        {loading ? "Logging in…" : "Log In"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-5">
                    Default password: <code className="bg-gray-100 px-1 rounded">pawtrust2024</code><br />
                    Set <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code> env var to change it.
                </p>
            </div>
        </div>
    );
}
