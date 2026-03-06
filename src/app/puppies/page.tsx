"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PuppyCard from "@/components/PuppyCard";
import { getAllPuppies, BREEDS, CITIES } from "@/lib/data";
import type { Puppy } from "@/lib/data";

function PuppiesContent() {
    const searchParams = useSearchParams();
    const allPuppies = getAllPuppies();

    const [search, setSearch] = useState(searchParams.get("breed") ?? "");
    const [filterBreed, setFilterBreed] = useState(searchParams.get("breed") ?? "");
    const [filterCity, setFilterCity] = useState("");
    const [filterGender, setFilterGender] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        const b = searchParams.get("breed") ?? "";
        setSearch(b); setFilterBreed(b);
    }, [searchParams]);

    const filtered = useMemo<Puppy[]>(() => {
        return allPuppies.filter((p) => {
            if (search && !p.breed.toLowerCase().includes(search.toLowerCase())) return false;
            if (filterBreed && p.breed !== filterBreed) return false;
            if (filterCity && p.city !== filterCity) return false;
            if (filterGender && p.gender !== filterGender) return false;
            if (minPrice && p.price < Number(minPrice)) return false;
            if (maxPrice && p.price > Number(maxPrice)) return false;
            return true;
        });
    }, [allPuppies, search, filterBreed, filterCity, filterGender, minPrice, maxPrice]);

    const clearFilters = () => {
        setSearch(""); setFilterBreed(""); setFilterCity("");
        setFilterGender(""); setMinPrice(""); setMaxPrice("");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Available Puppies</h1>
                <p className="text-sm text-gray-500 mt-1">Discover healthy, happy puppies from verified breeders. {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found.</p>
            </div>

            {/* Top filter bar */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-sm font-medium text-gray-500">Filters:</span>

                {/* Breed dropdown */}
                <select
                    value={filterBreed}
                    onChange={(e) => setFilterBreed(e.target.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterBreed ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"}`}
                >
                    <option value="">Breed ▾</option>
                    {BREEDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>

                {/* City dropdown */}
                <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterCity ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"}`}
                >
                    <option value="">City ▾</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                {/* Price range */}
                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        placeholder="Min ₹"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-24 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-gray-400 text-xs">—</span>
                    <input
                        type="number"
                        placeholder="Max ₹"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-24 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400"
                    />
                </div>

                {/* Gender */}
                {(["Male", "Female"] as const).map((g) => (
                    <button
                        key={g}
                        onClick={() => setFilterGender(filterGender === g ? "" : g)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterGender === g ? "border-teal-400 text-teal-700 bg-teal-50" : "border-gray-200 text-gray-700 bg-white"}`}
                    >
                        {g}
                    </button>
                ))}

                {/* Search */}
                <div className="relative ml-auto">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                    <input
                        type="text"
                        placeholder="Search breeds…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-7 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-teal-400 w-40"
                    />
                </div>

                {(filterBreed || filterCity || filterGender || minPrice || maxPrice || search) && (
                    <button onClick={clearFilters} className="text-xs text-red-500 hover:underline ml-1">Clear all</button>
                )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-4xl mb-4">🐾</p>
                    <p className="font-semibold text-gray-700">No puppies match your filters.</p>
                    <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">Clear Filters</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((p) => <PuppyCard key={p.id} puppy={p} />)}
                </div>
            )}
        </div>
    );
}

export default function PuppiesPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading puppies…</div>}>
            <PuppiesContent />
        </Suspense>
    );
}
