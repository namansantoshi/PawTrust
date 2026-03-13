"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import PuppyCard from "@/components/PuppyCard";
import { BREEDS, CITIES } from "@/lib/data";
import type { Puppy } from "@/lib/data";

export default function PuppiesClient({ initialPuppies }: { initialPuppies: Puppy[] }) {
    const params = useSearchParams();

    const [search, setSearch] = useState(params.get("breed") ?? "");
    const [filterBreed, setFilterBreed] = useState(params.get("breed") ?? "");
    const [filterCity, setFilterCity] = useState(params.get("city") ?? "");
    const [filterGender, setFilterGender] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Searchable city combobox
    const [cityQuery, setCityQuery] = useState(params.get("city") ?? "");
    const [cityOpen, setCityOpen] = useState(false);
    const cityRef = useRef<HTMLDivElement>(null);

    const filteredCities = CITIES.filter((c) =>
        c.toLowerCase().includes(cityQuery.toLowerCase())
    );

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
                setCityOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        const b = params.get("breed") ?? "";
        const c = params.get("city") ?? "";
        setSearch(b); setFilterBreed(b);
        setFilterCity(c); setCityQuery(c);
    }, [params]);

    const filtered = useMemo<Puppy[]>(() => {
        return initialPuppies.filter((p) => {
            if (search && !p.breed.toLowerCase().includes(search.toLowerCase())) return false;
            if (filterBreed && p.breed !== filterBreed) return false;
            if (filterCity && p.city !== filterCity) return false;
            if (filterGender && p.gender !== filterGender) return false;
            if (minPrice && p.price < Number(minPrice)) return false;
            if (maxPrice && p.price > Number(maxPrice)) return false;
            return true;
        });
    }, [initialPuppies, search, filterBreed, filterCity, filterGender, minPrice, maxPrice]);

    function clearFilters() {
        setSearch(""); setFilterBreed(""); setFilterCity("");
        setCityQuery(""); setFilterGender(""); setMinPrice(""); setMaxPrice("");
    }

    const hasFilters = search || filterBreed || filterCity || filterGender || minPrice || maxPrice;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Browse Puppies</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found across India.
                </p>
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-sm font-medium text-gray-500 mr-1">Filters:</span>

                {/* Breed */}
                <select
                    value={filterBreed}
                    onChange={(e) => { setFilterBreed(e.target.value); setSearch(e.target.value); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterBreed ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"}`}
                >
                    <option value="">All Breeds ▾</option>
                    {BREEDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>

                {/* Searchable city combobox */}
                <div ref={cityRef} className="relative">
                    <input
                        type="text"
                        placeholder="Select City ▾"
                        value={cityQuery}
                        onChange={(e) => { setCityQuery(e.target.value); setCityOpen(true); if (!e.target.value) setFilterCity(""); }}
                        onFocus={() => setCityOpen(true)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors w-36 ${filterCity ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"} focus:outline-none focus:border-teal-400`}
                    />
                    {cityOpen && filteredCities.length > 0 && (
                        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto py-1">
                            <button
                                className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:bg-gray-50"
                                onClick={() => { setFilterCity(""); setCityQuery(""); setCityOpen(false); }}
                            >
                                All cities (India)
                            </button>
                            {filteredCities.map((c) => (
                                <button
                                    key={c}
                                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                                    onClick={() => { setFilterCity(c); setCityQuery(c); setCityOpen(false); }}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price range */}
                <div className="flex items-center gap-1">
                    <input type="number" placeholder="Min ₹" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        className="w-20 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400" />
                    <span className="text-gray-300 text-xs">—</span>
                    <input type="number" placeholder="Max ₹" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-20 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400" />
                </div>

                {/* Gender */}
                {(["Male", "Female"] as const).map((g) => (
                    <button key={g} onClick={() => setFilterGender(filterGender === g ? "" : g)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterGender === g ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"}`}
                    >{g}</button>
                ))}

                {/* Search */}
                <div className="relative ml-auto">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                    <input type="text" placeholder="Search breeds…" value={search} onChange={(e) => setSearch(e.target.value)}
                        className="pl-7 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400 w-36" />
                </div>

                {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear all</button>
                )}
            </div>

            {/* Grid / Empty */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                    <p className="text-4xl mb-4">🐾</p>
                    {initialPuppies.length === 0 ? (
                        <>
                            <p className="font-semibold text-gray-700">Listings coming soon!</p>
                            <p className="text-sm text-gray-400 mt-1">We&apos;re onboarding verified breeders. Check back soon.</p>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-700">No puppies match your filters.</p>
                            <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">Clear Filters</button>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((p) => <PuppyCard key={p.id} puppy={p} />)}
                </div>
            )}
        </div>
    );
}
