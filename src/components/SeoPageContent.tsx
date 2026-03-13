import Image from "next/image";
import Link from "next/link";
import PuppyCard from "@/components/PuppyCard";
import { getPublishedPuppies } from "@/lib/data";
import type { BreedConfig, CityConfig } from "@/lib/breeds";

const WA = (msg: string) =>
    `https://wa.me/918273848985?text=${encodeURIComponent(msg)}`;

// ── Breed SEO Page ──────────────────────────────────────────────────────────
export async function BreedPageContent({ config }: { config: BreedConfig }) {
    const listings = (await getPublishedPuppies()).filter(
        (p) => !p.sold && p.breed.toLowerCase() === config.breed.toLowerCase()
    );

    return (
        <>
            {/* Hero */}
            <section className="bg-gray-50 border-b border-gray-200 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <nav className="text-xs text-gray-400 mb-3">
                            <Link href="/" className="hover:text-teal-600">Home</Link>
                            <span className="mx-1">/</span>
                            <Link href="/puppies" className="hover:text-teal-600">Browse Puppies</Link>
                            <span className="mx-1">/</span>
                            <span className="text-gray-600">{config.breed}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                            {config.h1}
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mb-5">{config.intro}</p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={WA(`Hello PawTrust, I am interested in a ${config.breed} puppy. Please share available listings.`)}
                                target="_blank"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow hover:bg-[#22c55e] transition-colors"
                            >
                                <WaIcon /> Enquire on WhatsApp
                            </Link>
                            <Link href="/puppies" className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-teal-300 hover:text-teal-700 transition-colors">
                                Browse All Breeds
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-64 h-52 md:w-72 md:h-60 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                        <Image src={config.image} alt={`${config.breed} puppy`} fill className="object-cover" priority />
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {config.breed} Puppies Available Now
                </h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {listings.map((p) => <PuppyCard key={p.id} puppy={p} />)}
                    </div>
                ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-14 text-center mb-8">
                        <p className="text-3xl mb-3">{config.emoji}</p>
                        <p className="font-semibold text-gray-700">No {config.breed} listings yet</p>
                        <p className="text-sm text-gray-400 mt-1 mb-5">New listings are added regularly. Chat with us on WhatsApp to be notified.</p>
                        <Link
                            href={WA(`Hello PawTrust, I am looking for a ${config.breed} puppy. Please notify me when one is available.`)}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-sm"
                        >
                            <WaIcon size={14} /> Notify Me on WhatsApp
                        </Link>
                    </div>
                )}

                {/* SEO Content */}
                <div className="bg-teal-50/40 border border-teal-100 rounded-2xl p-6 md:p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">About the {config.breed}</h2>
                    <ul className="space-y-2.5">
                        {config.about.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                                <span className="text-teal-600 mt-0.5 flex-shrink-0">✔</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

// ── City SEO Page ────────────────────────────────────────────────────────────
export async function CityPageContent({ config }: { config: CityConfig }) {
    const listings = (await getPublishedPuppies()).filter(
        (p) => !p.sold && p.city.toLowerCase() === config.city.toLowerCase()
    );

    return (
        <>
            {/* Hero */}
            <section className="bg-gray-50 border-b border-gray-200 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-xs text-gray-400 mb-3">
                        <Link href="/" className="hover:text-teal-600">Home</Link>
                        <span className="mx-1">/</span>
                        <Link href="/puppies" className="hover:text-teal-600">Browse Puppies</Link>
                        <span className="mx-1">/</span>
                        <span className="text-gray-600">{config.city}</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                        {config.h1}
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-5">{config.intro}</p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={WA(`Hello PawTrust, I am looking for a puppy in ${config.city}. Please share available listings.`)}
                            target="_blank"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow hover:bg-[#22c55e] transition-colors"
                        >
                            <WaIcon /> Enquire on WhatsApp
                        </Link>
                        <Link
                            href={`/puppies?city=${encodeURIComponent(config.city)}`}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-teal-300 hover:text-teal-700 transition-colors"
                        >
                            Browse All Breeds
                        </Link>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Puppies Available in {config.city}
                </h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {listings.map((p) => <PuppyCard key={p.id} puppy={p} />)}
                    </div>
                ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-14 text-center mb-8">
                        <p className="text-3xl mb-3">📍</p>
                        <p className="font-semibold text-gray-700">No listings in {config.city} yet</p>
                        <p className="text-sm text-gray-400 mt-1 mb-5">Chat with us and we&apos;ll help you find a puppy near you.</p>
                        <Link
                            href={WA(`Hello PawTrust, I am looking for a puppy in ${config.city}. Please help me find one.`)}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-sm"
                        >
                            <WaIcon size={14} /> Chat on WhatsApp
                        </Link>
                    </div>
                )}

                {/* SEO — why buy in city */}
                <div className="bg-teal-50/40 border border-teal-100 rounded-2xl p-6 md:p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Why Buy a Puppy in {config.city} Through PawTrust?</h2>
                    <ul className="space-y-2.5">
                        {[
                            `All breeders in ${config.city} are manually verified by our team before listing.`,
                            "Every puppy comes with vaccination records and a health check.",
                            `Browse puppies from ${config.city} and chat directly with breeders via WhatsApp — no middlemen.`,
                            "PawTrust provides safe buying guidance to help you make the right choice.",
                        ].map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                                <span className="text-teal-600 mt-0.5 flex-shrink-0">✔</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

function WaIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}
