import Link from "next/link";
import Image from "next/image";
import type { Puppy } from "@/lib/data";

interface Props {
    puppy: Puppy;
}

export default function PuppyCard({ puppy }: Props) {
    return (
        <div className="card-lift bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm relative flex flex-col">
            {/* Sold overlay badge */}
            {puppy.sold && (
                <div className="absolute top-3 left-3 z-10 bg-gray-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Sold
                </div>
            )}
            {/* Verified badge */}
            {puppy.verified && !puppy.sold && (
                <div className="absolute top-3 left-3 z-10 bg-teal-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Verified
                </div>
            )}
            {/* Favorite heart */}
            <button className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>

            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                    src={puppy.images[0]}
                    alt={`${puppy.breed} puppy`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-300 hover:scale-105 ${puppy.sold ? "grayscale opacity-60" : ""}`}
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{puppy.breed}</h3>
                        <span className="text-teal-600 text-xs font-medium">{puppy.breed}</span>
                    </div>
                    <span className="text-sm font-bold text-teal-700 shrink-0">₹{puppy.price.toLocaleString("en-IN")}</span>
                </div>

                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {puppy.description}
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <Chip>{puppy.age}</Chip>
                    <Chip>{puppy.gender}</Chip>
                    <Chip>📍 {puppy.city}</Chip>
                    {puppy.vaccinated && <Chip variant="teal">Vaccinated</Chip>}
                </div>

                {/* CTA */}
                <div className="mt-4">
                    {!puppy.sold ? (
                        <Link
                            href={`/puppies/${puppy.id}`}
                            className="block w-full text-center py-2 text-sm font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                        >
                            View Details
                        </Link>
                    ) : (
                        <div className="block w-full text-center py-2 text-sm font-semibold rounded-lg bg-gray-100 text-gray-400">
                            Sold
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Chip({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "teal" }) {
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variant === "teal" ? "bg-teal-50 text-teal-700 border border-teal-100" : "bg-gray-100 text-gray-600"
            }`}>
            {children}
        </span>
    );
}
