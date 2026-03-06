import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sell Your Puppy | PawTrust",
    description: "List your puppy on PawTrust and connect with thousands of loving families. Simple, safe, and WhatsApp-powered.",
};

const SELLER_STEPS = [
    {
        icon: "💬",
        step: "01",
        title: "Send Puppy Details on WhatsApp",
        desc: "Message us on WhatsApp with your puppy's breed, age, photos, and price. Our team responds within minutes.",
    },
    {
        icon: "🔍",
        step: "02",
        title: "Team Verifies Your Puppy",
        desc: "We review the details and health status of your puppy to ensure a safe and trustworthy listing.",
    },
    {
        icon: "🌐",
        step: "03",
        title: "Puppy Gets Listed on Website",
        desc: "Your puppy goes live on PawTrust.in, visible to thousands of potential buyers across India.",
    },
    {
        icon: "🎉",
        step: "04",
        title: "Buyers Contact Us — You Get Notified",
        desc: "Interested buyers send enquiries, and we share verified leads directly with you. Zero commission.",
    },
];

const BENEFITS = [
    { icon: "🆓", title: "Free to List", desc: "No listing fees. No commissions." },
    { icon: "🛡️", title: "Safe & Verified", desc: "We verify buyers before connecting." },
    { icon: "🚀", title: "Fast Onboarding", desc: "Listed within 24 hours." },
    { icon: "📱", title: "WhatsApp-First", desc: "Simple process via WhatsApp." },
];

export default function SellPage() {
    const waLink = `https://wa.me/918273848985?text=${encodeURIComponent("Hello PawTrust, I want to list my puppy on your platform. Here are the details:")}`;

    return (
        <div>
            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-50 to-cream-100 py-20 px-4 text-center">
                <span className="text-6xl mb-4 block">🐶</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brown-800 mb-4">
                    List Your Puppy on <span className="gradient-text">PawTrust</span>
                </h1>
                <p className="text-lg text-brown-500 max-w-xl mx-auto mb-8">
                    Reach thousands of genuine puppy buyers across India. Free listing. No commission.
                    WhatsApp-simple process.
                </p>
                <Link
                    href={waLink}
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    List Puppy on WhatsApp
                </Link>
            </section>

            {/* Benefits */}
            <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {BENEFITS.map((b) => (
                        <div key={b.title} className="bg-white rounded-2xl border border-cream-200 p-5 text-center shadow-sm card-lift">
                            <span className="text-3xl">{b.icon}</span>
                            <h3 className="font-bold text-brown-800 mt-2 text-sm">{b.title}</h3>
                            <p className="text-xs text-brown-400 mt-1">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Steps */}
            <section className="py-14 bg-cream-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-1">Simple Process</p>
                        <h2 className="text-3xl font-extrabold text-brown-800">How to List Your Puppy</h2>
                    </div>
                    <div className="space-y-6">
                        {SELLER_STEPS.map((s) => (
                            <div key={s.step} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
                                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-brand-500 text-white text-2xl shadow">
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-brand-400 tracking-widest">STEP {s.step}</p>
                                    <h3 className="text-lg font-bold text-brown-800 mt-0.5">{s.title}</h3>
                                    <p className="text-sm text-brown-400 mt-1 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            href={waLink}
                            target="_blank"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Get Started on WhatsApp
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
