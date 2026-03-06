"use client";
import { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";

const SOCIAL = [
    {
        name: "WhatsApp",
        href: "https://wa.me/918273848985?text=Hello%20PawTrust%2C%20I%20have%20a%20question.",
        icon: "💬",
        color: "bg-[#25D366] text-white",
        subtitle: "+91 82738 48985",
    },
    {
        name: "Instagram",
        href: "https://instagram.com/pawtrust.in",
        icon: "📸",
        color: "bg-gradient-to-br from-pink-500 to-purple-600 text-white",
        subtitle: "@pawtrust.in",
    },
    {
        name: "Facebook",
        href: "https://facebook.com/pawtrust.in",
        icon: "👥",
        color: "bg-[#1877F2] text-white",
        subtitle: "PawTrust India",
    },
    {
        name: "Email",
        href: "mailto:hello@pawtrust.in",
        icon: "📧",
        color: "bg-brand-500 text-white",
        subtitle: "hello@pawtrust.in",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to a backend endpoint or email service
        setSent(true);
        setForm({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div>
            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-50 to-cream-100 py-20 px-4 text-center">
                <span className="text-6xl mb-4 block">📞</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brown-800 mb-4">Contact PawTrust</h1>
                <p className="text-lg text-brown-500">Have a question? We&apos;re here to help — 7 days a week.</p>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact channels */}
                <div>
                    <h2 className="text-xl font-bold text-brown-800 mb-6">Reach us on</h2>
                    <div className="space-y-4">
                        {SOCIAL.map((s) => (
                            <Link
                                key={s.name}
                                href={s.href}
                                target={s.href.startsWith("http") ? "_blank" : undefined}
                                className={`flex items-center gap-4 p-4 rounded-2xl ${s.color} shadow-md hover:scale-[1.02] transition-transform`}
                            >
                                <span className="text-3xl">{s.icon}</span>
                                <div>
                                    <p className="font-bold text-sm">{s.name}</p>
                                    <p className="text-xs opacity-90">{s.subtitle}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact form */}
                <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8">
                    <h2 className="text-xl font-bold text-brown-800 mb-6">Send us a message</h2>
                    {sent ? (
                        <div className="text-center py-10">
                            <span className="text-5xl">✅</span>
                            <p className="text-green-700 font-bold text-lg mt-4">Message Sent!</p>
                            <p className="text-brown-400 text-sm mt-1">We&apos;ll get back to you shortly.</p>
                            <button onClick={() => setSent(false)} className="mt-6 px-5 py-2 rounded-full bg-brand-500 text-white font-semibold text-sm">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Field label="Your Name" type="text" name="name" placeholder="Arjun Sharma" value={form.name} onChange={handleChange} required />
                            <Field label="Email" type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                            <Field label="Phone (optional)" type="tel" name="phone" placeholder="+91 9876543210" value={form.phone} onChange={handleChange} />
                            <div>
                                <label className="block text-xs font-bold text-brown-600 uppercase tracking-wider mb-1.5">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Hello PawTrust, I have a question about…"
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-cream-300 px-4 py-3 text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full py-3 rounded-full btn-shine text-white font-bold text-base shadow-md hover:scale-[1.02] transition-transform">
                                Send Message 🚀
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    required,
}: {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-xs font-bold text-brown-600 uppercase tracking-wider mb-1.5">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-xl border border-cream-300 px-4 py-3 text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
        </div>
    );
}
