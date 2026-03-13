import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PuppyCard from "@/components/PuppyCard";
import { getPublishedPuppies } from "@/lib/data";
import { BREED_CONFIG } from "@/lib/breeds";

export const metadata: Metadata = {
  title: "Find Healthy Puppies From Trusted Breeders Near You | PawTrust",
  description:
    "Connect with trusted breeders and bring home a healthy puppy today. Vaccinated • Verified breeders • Safe buying. Browse Labrador, Golden Retriever, Husky and more puppies across India.",
};

const TRUST_BADGES = [
  { icon: "✔", label: "Verified Breeders", desc: "Every breeder is vetted by our team" },
  { icon: "💉", label: "Vaccinated Puppies", desc: "All pups come with health records" },
  { icon: "🏡", label: "Trusted by Pet Parents", desc: "500+ happy families across India" },
  { icon: "🛡️", label: "Safe Buying Guidance", desc: "We guide you through every step" },
];

const STEPS = [
  { n: "1", title: "Browse Puppies", desc: "Explore verified, healthy puppies from responsible breeders." },
  { n: "2", title: "Enquiry on WhatsApp", desc: "Chat directly with the breeder — no middlemen, instant replies." },
  { n: "3", title: "Bring Home Your Puppy", desc: "Meet your pup, verify health records, and welcome them home!" },
];

const WA_URL = (msg: string) =>
  `https://wa.me/918273848985?text=${encodeURIComponent(msg)}`;

export default async function HomePage() {
  const listings = (await getPublishedPuppies()).filter((p) => !p.sold).slice(0, 4);


  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-gray-50 border-b border-gray-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 text-xs text-teal-700 font-semibold mb-5">
              🐾 India's Most Trusted Puppy Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Find Healthy Puppies From{" "}
              <span className="gradient-text">Trusted Breeders</span> Near You
            </h1>
            <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect with trusted breeders and bring home a healthy puppy today.<br className="hidden sm:block" />
              <span className="text-teal-700 font-medium">Vaccinated</span> •{" "}
              <span className="text-teal-700 font-medium">Verified breeders</span> •{" "}
              <span className="text-teal-700 font-medium">Safe buying</span>
            </p>
            {/* Buttons — WA is primary */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href={WA_URL("Hello PawTrust, I am looking for a puppy. Please help me.")}
                target="_blank"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg hover:bg-[#22c55e] transition-colors"
              >
                <WaIcon /> Chat on WhatsApp
              </Link>
              <Link
                href="/puppies"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-700 transition-colors shadow-sm"
              >
                Browse Puppies →
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=85"
                alt="Happy puppy — PawTrust"
                fill className="object-cover" priority
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl px-3 py-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-teal-50 rounded-full flex items-center justify-center text-sm">✅</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Verified Breeder</p>
                    <p className="text-xs text-gray-500">Labrador · Delhi · ₹18,000</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-3 p-3">
                <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-teal-50 flex items-center justify-center text-lg">{b.icon}</div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{b.label}</p>
                  <p className="text-xs text-gray-400 leading-tight">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Available Now</p>
            <h2 className="text-2xl font-bold text-gray-900">Browse Puppies</h2>
          </div>
          <Link href="/puppies" className="text-sm font-semibold text-teal-600 hover:text-teal-700 hidden sm:block">
            View all →
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {listings.map((p) => <PuppyCard key={p.id} puppy={p} />)}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
            <p className="text-4xl mb-3">🐾</p>
            <p className="font-semibold text-gray-700 text-lg">Listings coming soon!</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">We&apos;re onboarding verified breeders. Check back soon or chat with us on WhatsApp.</p>
            <Link
              href={WA_URL("Hello PawTrust, I am looking for a puppy. Please let me know when new listings are available.")}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-sm"
            >
              <WaIcon size={15} /> Notify Me on WhatsApp
            </Link>
          </div>
        )}
      </section>

      {/* ─── POPULAR BREEDS ─── */}
      <section id="breeds" className="bg-gray-50 py-14 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Browse by Breed</p>
            <h2 className="text-2xl font-bold text-gray-900">Popular Breeds</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {BREED_CONFIG.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="card-lift bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm text-center group"
              >
                <div className="relative h-28 w-full">
                  <Image src={b.image} alt={b.breed} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="px-2 py-2.5">
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{b.breed}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Simple Process</p>
          <h2 className="text-2xl font-bold text-gray-900">How PawTrust Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm card-lift">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 text-white text-lg font-bold mx-auto mb-4">{s.n}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-teal-600 py-14 text-center px-4 text-white">
        <p className="text-sm font-semibold opacity-80 mb-2">Ready to find your match?</p>
        <h2 className="text-3xl font-bold mb-3">Find Your Perfect Puppy Today</h2>
        <p className="text-sm opacity-90 max-w-md mx-auto mb-7">
          Thousands of verified puppies are waiting for a loving home. Start your search now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={WA_URL("Hello PawTrust, I am looking for a puppy. Please help me.")}
            target="_blank"
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#22c55e] transition-colors"
          >
            <WaIcon /> Chat on WhatsApp
          </Link>
          <Link href="/puppies" className="px-7 py-3 rounded-xl bg-white text-teal-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-md">
            Browse Puppies
          </Link>
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
