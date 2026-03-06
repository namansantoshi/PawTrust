"use client";
import { useState, useEffect } from "react";
import type { Puppy } from "@/lib/data";
import { BREEDS, CITIES } from "@/lib/data";

const EMPTY_FORM = {
    breed: "",
    age: "",
    gender: "Male" as "Male" | "Female",
    price: "",
    city: "",
    description: "",
    images: "",
    vaccinated: false,
    verified: false,
    sold: false,
    sellerContact: "",
};

export default function AdminPage() {
    const [puppies, setPuppies] = useState<Puppy[]>([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const fetchPuppies = async () => {
        const res = await fetch("/api/puppies");
        const data = await res.json();
        setPuppies(data);
    };

    useEffect(() => { fetchPuppies(); }, []);

    const flash = (text: string, type: "success" | "error") => {
        setMsg({ text, type });
        setTimeout(() => setMsg(null), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        setForm((prev) => ({
            ...prev,
            [target.name]: target.type === "checkbox" ? target.checked : target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...form,
            price: Number(form.price),
            images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        };
        try {
            if (editId) {
                await fetch("/api/puppies", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, ...payload }) });
                flash("Puppy updated!", "success");
            } else {
                await fetch("/api/puppies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                flash("Puppy added!", "success");
            }
            setForm(EMPTY_FORM);
            setEditId(null);
            fetchPuppies();
        } catch {
            flash("Something went wrong.", "error");
        }
        setLoading(false);
    };

    const startEdit = (p: Puppy) => {
        setEditId(p.id);
        setForm({
            breed: p.breed,
            age: p.age,
            gender: p.gender,
            price: String(p.price),
            city: p.city,
            description: p.description,
            images: p.images.join(", "),
            vaccinated: p.vaccinated,
            verified: p.verified,
            sold: p.sold,
            sellerContact: p.sellerContact,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this puppy listing?")) return;
        await fetch("/api/puppies", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        flash("Deleted.", "success");
        fetchPuppies();
    };

    const handleMarkSold = async (p: Puppy) => {
        await fetch("/api/puppies", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, sold: !p.sold }) });
        fetchPuppies();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">🛠️</span>
                <div>
                    <h1 className="text-2xl font-extrabold text-brown-800">Admin Dashboard</h1>
                    <p className="text-sm text-brown-400">Manage PawTrust puppy listings</p>
                </div>
            </div>

            {/* Flash message */}
            {msg && (
                <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {msg.text}
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8 mb-10">
                <h2 className="text-lg font-bold text-brown-800 mb-6">{editId ? "✏️ Edit Listing" : "➕ Add New Puppy"}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <AdminField label="Breed">
                        <select name="breed" value={form.breed} onChange={handleChange} required className={inputCls}>
                            <option value="">Select Breed</option>
                            {BREEDS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </AdminField>
                    <AdminField label="Age (e.g. 3 months)">
                        <input type="text" name="age" value={form.age} onChange={handleChange} required placeholder="3 months" className={inputCls} />
                    </AdminField>
                    <AdminField label="Gender">
                        <select name="gender" value={form.gender} onChange={handleChange} className={inputCls}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </AdminField>
                    <AdminField label="Price (₹)">
                        <input type="number" name="price" value={form.price} onChange={handleChange} required placeholder="18000" className={inputCls} />
                    </AdminField>
                    <AdminField label="City">
                        <select name="city" value={form.city} onChange={handleChange} required className={inputCls}>
                            <option value="">Select City</option>
                            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </AdminField>
                    <AdminField label="Seller Contact (WhatsApp number with country code)">
                        <input type="text" name="sellerContact" value={form.sellerContact} onChange={handleChange} placeholder="919876543210" className={inputCls} />
                    </AdminField>
                    <AdminField label="Image URLs (comma-separated)" className="sm:col-span-2">
                        <input type="text" name="images" value={form.images} onChange={handleChange} placeholder="https://... , https://..." className={inputCls} />
                    </AdminField>
                    <AdminField label="Description" className="sm:col-span-2">
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe the puppy…" className={`${inputCls} resize-none`} />
                    </AdminField>
                    {/* Toggles */}
                    <div className="sm:col-span-2 flex flex-wrap gap-6">
                        {(["vaccinated", "verified", "sold"] as const).map((field) => (
                            <label key={field} className="flex items-center gap-2 cursor-pointer select-none">
                                <input type="checkbox" name={field} checked={form[field] as boolean} onChange={handleChange} className="w-4 h-4 rounded accent-brand-500" />
                                <span className="text-sm font-medium text-brown-700 capitalize">{field}</span>
                            </label>
                        ))}
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                        <button type="submit" disabled={loading} className="px-6 py-3 rounded-full btn-shine text-white font-bold disabled:opacity-60">
                            {loading ? "Saving…" : editId ? "Update Listing" : "Add Listing"}
                        </button>
                        {editId && (
                            <button type="button" onClick={() => { setEditId(null); setForm(EMPTY_FORM); }} className="px-6 py-3 rounded-full border-2 border-brand-400 text-brand-600 font-bold hover:bg-brand-50 transition">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listings table */}
            <h2 className="text-lg font-bold text-brown-800 mb-4">All Listings ({puppies.length})</h2>
            <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-cream-100 text-brown-500 text-xs font-bold uppercase tracking-wider">
                        <tr>
                            {["Breed", "Age", "Gender", "Price", "City", "Status", "Actions"].map((h) => (
                                <th key={h} className="px-4 py-3 text-left">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                        {puppies.map((p) => (
                            <tr key={p.id} className="hover:bg-cream-50 transition">
                                <td className="px-4 py-3 font-semibold text-brown-800">
                                    {p.verified && <span className="text-brand-500 mr-1" title="Verified">✅</span>}
                                    {p.breed}
                                </td>
                                <td className="px-4 py-3 text-brown-400">{p.age}</td>
                                <td className="px-4 py-3 text-brown-400">{p.gender}</td>
                                <td className="px-4 py-3 font-bold text-brown-800">₹{p.price.toLocaleString("en-IN")}</td>
                                <td className="px-4 py-3 text-brown-400">{p.city}</td>
                                <td className="px-4 py-3">
                                    {p.sold ? (
                                        <span className="px-2 py-0.5 rounded-full bg-brown-200 text-brown-700 text-xs font-bold">Sold</span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Active</span>
                                    )}
                                    {p.vaccinated && <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">Vacc</span>}
                                </td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <button onClick={() => startEdit(p)} className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold hover:bg-brand-200 transition">Edit</button>
                                    <button onClick={() => handleMarkSold(p)} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${p.sold ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-brown-100 text-brown-700 hover:bg-brown-200"}`}>
                                        {p.sold ? "Unmark Sold" : "Mark Sold"}
                                    </button>
                                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {puppies.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-brown-300">No listings yet. Add one above!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const inputCls = "w-full rounded-xl border border-cream-300 px-3 py-2 text-sm text-brown-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400";

function AdminField({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={className}>
            <label className="block text-xs font-bold text-brown-600 uppercase tracking-wider mb-1.5">{label}</label>
            {children}
        </div>
    );
}
