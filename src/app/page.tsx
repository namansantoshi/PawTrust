import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PuppyCard from "@/components/PuppyCard";
import { getAllPuppies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Find Your Perfect Puppy Companion",
  description:
    "Browse verified puppies for sale in India. Labrador, Golden Retriever, Beagle, German Shepherd and more. Safe, trusted, and WhatsApp-ready.",
};

const BREEDS = [
  { name: "Labrador Retriever", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=70" },
  { name: "Golden Retriever", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=70" },
  { name: "German Shepherd", img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=70" },
  { name: "Beagle", img: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&q=70" },
  { name: "Pomeranian", img: "https://images.unsplash.com/photo-1621887348744-6b0444f8a058?w=400&q=70" },
  { name: "Pug", img: "https://images.unsplash.com/photo-1529973625058-a665431328fb?w=400&q=70" },
];

const STEPS = [
  { step: "1", title: "Browse Puppies", desc: "Explore our curated listings of verified, healthy puppies from responsible breeders." },
  { step: "2", title: "Enquiry on WhatsApp", desc: "Contact the breeder directly on WhatsApp with a pre-filled message. Instant replies." },
  { step: "3", title: "Bring Home Puppy", desc: "Meet your pup, review health records, and welcome your new family member!" },
];

const TRUST = [
  { icon: "🛡️", title: "Verified Breeders", desc: "Every breeder is manually vetted by our team before listing." },
  { icon: "💉", title: "Health Guarantee", desc: "All pups come with vet checks and vaccination records." },
  { icon: "🤝", title: "Safe & Transparent", desc: "Direct connection, no middlemen, full transparency." },
  { icon: "⭐", title: "Top Rated", desc: "Thousands of happy families across India." },
];

export default function HomePage() {
  const allPuppies = getAllPuppies();
  const featured = allPuppies.filter((p) => p.verified && !p.sold).slice(0, 4);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gray-50 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left fade-in-up">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 text-xs text-teal-700 font-semibold mb-5">
              <span className="paw-bounce">🐾</span> India&apos;s Most Trusted Puppy Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Find Your{" "}
              <span className="gradient-text">Perfect Puppy</span>{" "}
              Companion
            </h1>
            <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connecting you with healthy, verified puppies from responsible breeders.
              Your new best friend is just a bark away.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/puppies"
                className="btn-primary px-6 py-3 rounded-lg font-semibold text-sm shadow-sm"
              >
                Browse All Puppies
              </Link>
              <Link
                href={`https://wa.me/918273848985?text=${encodeURIComponent("Hello PawTrust, I am interested in finding a puppy. Please help me.")}`}
                target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-700 transition-colors shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </Link>
            </div>
            {/* Stats */}
            <div className="mt-10 flex gap-8 justify-center lg:justify-start">
              {[["500+", "Happy Families"], ["100+", "Verified Breeders"], ["20+", "Breeds"]].map(([num, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="text-xl font-extrabold text-teal-600">{num}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Hero image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=85"
                alt="Happy puppy"
                fill
                className="object-cover"
                priority
              />
              {/* Floating card */}
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

      {/* ─── Filter bar ─── */}
      <section className="bg-white border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 mr-2">Filters:</span>
          {["Breed ▾", "City / San Francisco ▾", "Price Range ▾", "Age ▾"].map((f) => (
            <Link key={f} href="/puppies" className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:border-teal-400 hover:text-teal-700 transition-colors bg-white">
              {f}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Puppies ─── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Featured Listings</p>
            <h2 className="text-2xl font-bold text-gray-900">Available Puppies</h2>
            <p className="text-sm text-gray-500 mt-1">Discover healthy, happy puppies from verified breeders.</p>
          </div>
          <Link href="/puppies" className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <PuppyCard key={p.id} puppy={p} />
          ))}
        </div>
        <div className="text-center mt-7 sm:hidden">
          <Link href="/puppies" className="inline-block px-5 py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm">
            View All Puppies
          </Link>
        </div>
      </section>

      {/* ─── Popular Breeds ─── */}
      <section className="bg-gray-50 py-14 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Browse by Breed</p>
            <h2 className="text-2xl font-bold text-gray-900">Popular Breeds</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {BREEDS.map((breed) => (
              <Link
                key={breed.name}
                href={`/puppies?breed=${encodeURIComponent(breed.name)}`}
                className="card-lift bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm text-center"
              >
                <div className="relative h-28 w-full">
                  <Image src={breed.img} alt={breed.name} fill className="object-cover" />
                </div>
                <div className="px-2 py-2.5">
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{breed.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Simple Process</p>
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm card-lift">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 text-white text-lg font-bold mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Trust & Safety ─── */}
      <section className="bg-gray-50 py-14 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Why PawTrust</p>
            <h2 className="text-2xl font-bold text-gray-900">Trust &amp; Safety is Our Top Priority</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {TRUST.map((t) => (
              <div key={t.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm card-lift text-center">
                <span className="text-3xl">{t.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 text-sm">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-teal-600 py-14 text-center px-4 text-white">
        <p className="text-sm font-semibold opacity-80 mb-2">Ready to find your match?</p>
        <h2 className="text-3xl font-bold mb-3">Find Your Perfect Puppy Today</h2>
        <p className="text-sm opacity-90 max-w-md mx-auto mb-7">
          Thousands of verified puppies are waiting for a loving home. Start your search now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/puppies" className="px-7 py-3 rounded-lg bg-white text-teal-700 font-bold text-sm shadow-md hover:bg-gray-50 transition-colors">
            Browse Puppies
          </Link>
          <Link
            href={`https://wa.me/918273848985?text=${encodeURIComponent("Hello PawTrust, I am interested in finding a puppy.")}`}
            target="_blank"
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Chat on WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}
