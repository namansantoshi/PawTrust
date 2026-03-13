"use client";
import Link from "next/link";
import { useState } from "react";
import { BREED_CONFIG } from "@/lib/breeds";

import Logo from "./Logo";

const NAV_LINKS = [
    { href: "/puppies", label: "Browse Puppies" },
    { href: "/#breeds", label: "Popular Breeds" },
    { href: "/sell", label: "Sell Your Puppy" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
];

const WA_HREF = "https://wa.me/918273848985?text=Hello%20PawTrust%2C%20I%20want%20to%20enquire%20about%20a%20puppy.";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [breedsOpen, setBreedsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Logo size="md" />

                    {/* Desktop nav */}

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
                        {NAV_LINKS.map((link) =>
                            link.label === "Popular Breeds" ? (
                                <div key={link.label} className="relative" onMouseEnter={() => setBreedsOpen(true)} onMouseLeave={() => setBreedsOpen(false)}>
                                    <button className="px-3 py-2 hover:text-teal-600 transition-colors flex items-center gap-1 rounded-lg hover:bg-gray-50">
                                        Popular Breeds
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {breedsOpen && (
                                        <div className="absolute top-full left-0 mt-0.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                                            {BREED_CONFIG.map((b) => (
                                                <Link
                                                    key={b.slug}
                                                    href={`/${b.slug}`}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                                                >
                                                    <span>{b.emoji}</span> {b.breed}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 hover:text-teal-600 transition-colors rounded-lg hover:bg-gray-50"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>

                    {/* WhatsApp CTA */}
                    <div className="hidden md:flex">
                        <Link
                            href={WA_HREF}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
                        >
                            <WaIcon size={15} /> Chat on WhatsApp
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {open
                            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        }
                    </button>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden pb-4 space-y-0.5 border-t border-gray-100 pt-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-1 px-3">
                            <Link
                                href={WA_HREF}
                                target="_blank"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm"
                            >
                                <WaIcon size={15} /> Chat on WhatsApp
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

function WaIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}
