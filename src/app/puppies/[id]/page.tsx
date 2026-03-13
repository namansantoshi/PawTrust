import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPuppyById, WHATSAPP_NUMBER } from "@/lib/data";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const puppy = await getPuppyById(id);
    if (!puppy) return { title: "Puppy Not Found" };
    return {
        title: `${puppy.breed} Puppy for Sale in ${puppy.city}`,
        description: `${puppy.breed}, ${puppy.age}, ${puppy.gender}. Price ₹${puppy.price.toLocaleString("en-IN")}. ${puppy.description.slice(0, 120)}`,
    };
}

export default async function PuppyDetailPage({ params }: Props) {
    const { id } = await params;
    const puppy = await getPuppyById(id);
    if (!puppy) notFound();

    const waMessage = encodeURIComponent(
        `Hello PawTrust, I am interested in the ${puppy.breed} puppy listed on PawTrust.in. Please share more details. (ID: ${puppy.id})`
    );
    const waVideoMessage = encodeURIComponent(
        `Hello PawTrust, can you please send a video of the ${puppy.breed} puppy (ID: ${puppy.id})?`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
    const waVideoLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waVideoMessage}`;

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                <Link href="/puppies" className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Puppy Details
                </Link>
                <span className="text-xs text-teal-500 font-medium px-2 py-0.5 bg-teal-50 rounded-full ml-auto flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                </span>
                <button className="text-gray-400 hover:text-teal-600">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
            </nav>

            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-5 bg-gray-100">
                <div className="relative h-72 md:h-80">
                    <Image
                        src={puppy.images[0]}
                        alt={`${puppy.breed} puppy`}
                        fill
                        className="object-cover"
                        priority
                    />
                    {puppy.sold && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                            <span className="bg-gray-800 text-white text-lg font-black px-5 py-1.5 rounded-full">SOLD</span>
                        </div>
                    )}
                    {/* Image counter */}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        1/{puppy.images.length}
                    </div>
                </div>
                {/* Image dots */}
                <div className="flex justify-center gap-1 py-2 bg-white border-t border-gray-100">
                    {puppy.images.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-teal-600" : "bg-gray-300"}`} />
                    ))}
                </div>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{puppy.breed.split(" ")[0]}</h1>
                    <p className="text-teal-600 font-medium text-sm">{puppy.breed}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹{puppy.price.toLocaleString("en-IN")}</p>
                    {!puppy.sold && <p className="text-xs text-teal-600 font-semibold">Available</p>}
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
                {puppy.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
                        <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Verified Breeder
                    </span>
                )}
                {puppy.vaccinated && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
                        <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Fully Vaccinated
                    </span>
                )}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                    { label: "Age", value: puppy.age },
                    { label: "Gender", value: puppy.gender },
                    { label: "Vaccinations", value: puppy.vaccinated ? "Up to date" : "Pending" },
                    { label: "Location", value: puppy.city },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-teal-50/50 rounded-xl p-3 border border-teal-100/50">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-gray-900">{value}</p>
                    </div>
                ))}
            </div>

            {/* About */}
            <div className="mb-5">
                <h2 className="font-bold text-gray-900 mb-2">About {puppy.breed.split(" ")[0]}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{puppy.description}</p>
            </div>

            {/* Breeder info */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-3 text-sm">Breeder Information</h2>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-lg">🐾</div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                            PawTrust Verified Breeder
                            <svg width="12" height="12" viewBox="0 0 20 20" fill="#0d9488"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </p>
                        <p className="text-xs text-gray-500">Member since 2023 · Trusted seller</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3, 4, 5].map((s) => <svg key={s} width="10" height="10" viewBox="0 0 20 20" fill="#f59e0b"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            <span className="text-xs text-gray-400 ml-1">4.9 (24 reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location map placeholder */}
            <div className="bg-teal-50 rounded-xl h-24 mb-5 flex items-center justify-center text-sm text-teal-600 font-medium border border-teal-100">
                📍 {puppy.city}, India
            </div>

            {/* CTAs — matching Stitch exactly */}
            {!puppy.sold && (
                <div className="space-y-3">
                    <Link
                        href={waLink}
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors shadow-md"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        Send Enquiry on WhatsApp
                    </Link>
                    <Link
                        href={waVideoLink}
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-50 text-teal-700 font-semibold text-sm hover:bg-teal-100 transition-colors border border-teal-200"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Request Video of Puppy
                    </Link>
                </div>
            )}

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: `${puppy.breed} Puppy`,
                        description: puppy.description,
                        offers: {
                            "@type": "Offer",
                            priceCurrency: "INR",
                            price: puppy.price,
                            availability: puppy.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
                        },
                    }),
                }}
            />
        </div>
    );
}
