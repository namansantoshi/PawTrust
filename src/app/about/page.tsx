import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About PawTrust",
    description: "PawTrust connects loving homes with healthy and verified puppies across India.",
};

const VALUES = [
    { icon: "✅", title: "Trust First", desc: "Every breeder is verified by our team before listing." },
    { icon: "💉", title: "Health Guaranteed", desc: "We ensure all puppies have vet checks and vaccination records." },
    { icon: "🤝", title: "Zero Middlemen", desc: "Direct connection between buyers and sellers via WhatsApp." },
    { icon: "🐾", title: "Animal Welfare", desc: "We promote responsible breeding and ethical pet ownership." },
];

const TEAM = [
    { name: "Arjun Sharma", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Priya Nair", role: "Head of Breeder Verification", emoji: "👩‍🔬" },
    { name: "Rahul Das", role: "Tech Lead", emoji: "👨‍💻" },
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-50 to-cream-200 py-20 px-4 text-center">
                <span className="text-6xl mb-4 block">🐾</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brown-800 mb-4">About PawTrust</h1>
                <p className="text-xl text-brown-500 max-w-2xl mx-auto leading-relaxed">
                    Connecting loving homes with healthy and verified puppies across India.
                </p>
            </section>

            {/* Mission */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-extrabold text-brown-800 mb-4">Our Mission</h2>
                    <p className="text-brown-500 text-lg leading-relaxed">
                        At PawTrust, we believe every puppy deserves a loving home and every family deserves a healthy,
                        happy companion. We built this platform to remove the trust barrier that exists in India&apos;s
                        pet adoption space — creating a safe, transparent, and WhatsApp-simple way to find your
                        forever furry friend.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-14 bg-cream-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-brown-800">What We Stand For</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {VALUES.map((v) => (
                            <div key={v.title} className="bg-white rounded-2xl border border-cream-200 p-6 flex items-start gap-4 shadow-sm card-lift">
                                <span className="text-4xl">{v.icon}</span>
                                <div>
                                    <h3 className="font-bold text-brown-800 text-base">{v.title}</h3>
                                    <p className="text-sm text-brown-400 mt-1">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-brown-800">Meet the Team</h2>
                </div>
                <div className="flex flex-row gap-6 justify-center flex-wrap">
                    {TEAM.map((m) => (
                        <div key={m.name} className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 text-center w-52 card-lift">
                            <span className="text-5xl">{m.emoji}</span>
                            <h3 className="font-bold text-brown-800 mt-3">{m.name}</h3>
                            <p className="text-sm text-brown-400 mt-0.5">{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-500 to-brand-700 py-14 text-white text-center px-4">
                <h2 className="text-3xl font-extrabold mb-3">Find Your Perfect Pup Today</h2>
                <p className="opacity-90 mb-6">Browse verified puppies or reach out to us on WhatsApp.</p>
                <Link href="/puppies" className="inline-block px-8 py-3.5 rounded-full bg-white text-brand-700 font-bold text-base shadow-lg hover:scale-105 transition-transform">
                    Browse Puppies 🐶
                </Link>
            </section>
        </div>
    );
}
