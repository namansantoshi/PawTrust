"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Puppy } from "@/lib/data";
import { BREEDS, CITIES } from "@/lib/data";

const EMPTY_FORM = {
    breed: "",
    age: "",
    gender: "Male" as "Male" | "Female",
    price: "",
    city: "",
    description: "",
    images: "",       // comma-separated URLs
    vaccinated: false,
    verified: false,
    sold: false,
    published: false,
    sellerContact: "918273848985",
};

type FormState = typeof EMPTY_FORM;

export default function AdminPage() {
    const router = useRouter();
    const [listings, setListings] = useState<Puppy[]>([]);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const fetchListings = useCallback(async () => {
        const res = await fetch("/api/puppies");
        if (res.ok) setListings(await res.json());
    }, []);

    useEffect(() => { fetchListings(); }, [fetchListings]);

    function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMsg(null);

        const payload = {
            ...form,
            price: Number(form.price),
            images: form.images
                .split(/[\n,]+/)
                .map((s) => s.trim())
                .filter(Boolean),
        };

        const method = editId ? "PUT" : "POST";
        const url = editId ? `/api/puppies?id=${editId}` : "/api/puppies";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setMsg({ type: "ok", text: editId ? "Listing updated!" : "Listing published!" });
            setForm(EMPTY_FORM);
            setEditId(null);
            fetchListings();
        } else {
            setMsg({ type: "err", text: "Something went wrong. Please try again." });
        }
        setSaving(false);
    }

    function startEdit(p: Puppy) {
        setEditId(p.id);
        setForm({
            breed: p.breed,
            age: p.age,
            gender: p.gender,
            price: String(p.price),
            city: p.city,
            description: p.description,
            images: p.images.join("\n"),
            vaccinated: p.vaccinated,
            verified: p.verified,
            sold: p.sold,
            published: p.published,
            sellerContact: p.sellerContact,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function deleteListing(id: string) {
        if (!confirm("Delete this listing?")) return;
        await fetch(`/api/puppies?id=${id}`, { method: "DELETE" });
        fetchListings();
    }

    async function toggleField(id: string, field: "sold" | "published") {
        const puppy = listings.find((p) => p.id === id);
        if (!puppy) return;
        await fetch(`/api/puppies?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: !puppy[field] }),
        });
        fetchListings();
    }

    async function handleLogout() {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/admin/login");
    }

    const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent";
    const lbl = "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1";

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">PawTrust Admin</h1>
                    <p className="text-sm text-gray-400 mt-0.5">{listings.length} listing{listings.length !== 1 ? "s" : ""} total</p>
                </div>
                <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                    Log out
                </button>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-5 text-base">
                    {editId ? "✏️ Edit Listing" : "➕ Add New Listing"}
                </h2>

                {msg && (
                    <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-medium ${msg.type === "ok" ? "bg-teal-50 text-teal-700 border border-teal-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                        {msg.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Breed */}
                        <div>
                            <label className={lbl}>Breed</label>
                            <select value={form.breed} onChange={(e) => setField("breed", e.target.value)} required className={inp}>
                                <option value="">Select breed</option>
                                {BREEDS.map((b) => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>

                        {/* Age */}
                        <div>
                            <label className={lbl}>Age</label>
                            <input type="text" placeholder="e.g. 3 months" value={form.age} onChange={(e) => setField("age", e.target.value)} required className={inp} />
                        </div>

                        {/* Price */}
                        <div>
                            <label className={lbl}>Price (₹)</label>
                            <input type="number" placeholder="e.g. 18000" value={form.price} onChange={(e) => setField("price", e.target.value)} required min={0} className={inp} />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className={lbl}>Gender</label>
                            <select value={form.gender} onChange={(e) => setField("gender", e.target.value as "Male" | "Female")} className={inp}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* City */}
                        <div>
                            <label className={lbl}>City / Location</label>
                            <select value={form.city} onChange={(e) => setField("city", e.target.value)} required className={inp}>
                                <option value="">Select city</option>
                                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Seller contact */}
                        <div>
                            <label className={lbl}>Seller WhatsApp Number</label>
                            <input type="text" placeholder="918273848985" value={form.sellerContact} onChange={(e) => setField("sellerContact", e.target.value)} className={inp} />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className={lbl}>Description</label>
                            <textarea
                                rows={3}
                                placeholder="Describe the puppy — temperament, health, parents, etc."
                                value={form.description}
                                onChange={(e) => setField("description", e.target.value)}
                                className={inp + " resize-none"}
                            />
                        </div>

                        {/* Image URLs */}
                        <div className="md:col-span-2">
                            <label className={lbl}>Image URLs <span className="text-gray-400 normal-case font-normal">(one per line or comma-separated)</span></label>
                            <textarea
                                rows={3}
                                placeholder={"https://example.com/puppy1.jpg\nhttps://example.com/puppy2.jpg"}
                                value={form.images}
                                onChange={(e) => setField("images", e.target.value)}
                                className={inp + " resize-none font-mono text-xs"}
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                💡 Upload images to <a href="https://imgbb.com" target="_blank" className="text-teal-600 underline">imgbb.com</a> or <a href="https://cloudinary.com" target="_blank" className="text-teal-600 underline">Cloudinary</a> (free) and paste the direct links here.
                            </p>
                        </div>

                        {/* Toggles */}
                        <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
                            {(
                                [
                                    ["vaccinated", "✅ Vaccinated"],
                                    ["verified", "🛡️ Verified Breeder"],
                                    ["sold", "🔴 Mark as Sold"],
                                    ["published", "🌐 Publish (visible to buyers)"],
                                ] as const
                            ).map(([key, label]) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form[key]}
                                        onChange={(e) => setField(key, e.target.checked)}
                                        className="w-4 h-4 accent-teal-600 rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors disabled:opacity-60"
                        >
                            {saving ? "Saving…" : editId ? "Update Listing" : "Add Listing"}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={() => { setEditId(null); setForm(EMPTY_FORM); setMsg(null); }}
                                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listings Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 text-base">All Listings</h2>
                </div>

                {listings.length === 0 ? (
                    <div className="py-16 text-center text-gray-400">
                        <p className="text-3xl mb-3">🐾</p>
                        <p className="font-semibold">No listings yet.</p>
                        <p className="text-sm mt-1">Add your first puppy listing above.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {["Breed", "City", "Price", "Age", "Status", "Published", "Actions"].map((h) => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {listings.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-semibold text-gray-900">{p.breed}</div>
                                            <div className="text-xs text-gray-400">{p.gender} · {p.age}</div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{p.city}</td>
                                        <td className="px-4 py-3 font-semibold text-teal-700">₹{p.price.toLocaleString("en-IN")}</td>
                                        <td className="px-4 py-3 text-gray-600">{p.age}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleField(p.id, "sold")}
                                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.sold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                                            >
                                                {p.sold ? "Sold" : "Available"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleField(p.id, "published")}
                                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.published ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"}`}
                                            >
                                                {p.published ? "Live" : "Draft"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button onClick={() => startEdit(p)} className="text-xs text-blue-600 hover:underline">Edit</button>
                                                <button onClick={() => deleteListing(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
