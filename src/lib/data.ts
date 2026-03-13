import { supabase } from "./supabase";

// ─── Type ────────────────────────────────────────────────────────────────────

export type Puppy = {
  id: string;
  breed: string;
  age: string;
  gender: "Male" | "Female";
  price: number;
  city: string;
  description: string;
  images: string[];
  vaccinated: boolean;
  verified: boolean;
  sold: boolean;
  published: boolean;
  sellerContact: string;
  createdAt: string;
};

// ─── DB row ↔ Puppy mapper ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromRow(row: any): Puppy {
  return {
    id: row.id,
    breed: row.breed,
    age: row.age ?? "",
    gender: row.gender ?? "Male",
    price: row.price ?? 0,
    city: row.city ?? "",
    description: row.description ?? "",
    images: row.images ?? [],
    vaccinated: row.vaccinated ?? false,
    verified: row.verified ?? false,
    sold: row.sold ?? false,
    published: row.published ?? false,
    sellerContact: row.seller_contact ?? "",
    createdAt: row.created_at ?? "",
  };
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** All listings (for admin — includes drafts) */
export async function getAllPuppies(): Promise<Puppy[]> {
  const { data, error } = await supabase
    .from("puppies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("getAllPuppies:", error.message); return []; }
  return (data ?? []).map(fromRow);
}

/** Only published listings (for public pages) */
export async function getPublishedPuppies(): Promise<Puppy[]> {
  const { data, error } = await supabase
    .from("puppies")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("getPublishedPuppies:", error.message); return []; }
  return (data ?? []).map(fromRow);
}

export async function getPuppyById(id: string): Promise<Puppy | null> {
  const { data, error } = await supabase
    .from("puppies")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return fromRow(data);
}

export async function addPuppy(
  input: Omit<Puppy, "id" | "createdAt">
): Promise<Puppy> {
  const { data, error } = await supabase
    .from("puppies")
    .insert([{
      breed: input.breed,
      age: input.age,
      gender: input.gender,
      price: input.price,
      city: input.city,
      description: input.description,
      images: input.images,
      vaccinated: input.vaccinated,
      verified: input.verified,
      sold: input.sold,
      published: input.published,
      seller_contact: input.sellerContact,
    }])
    .select()
    .single();
  if (error || !data) throw new Error(error?.message ?? "Insert failed");
  return fromRow(data);
}

export async function updatePuppy(
  id: string,
  patch: Partial<Puppy>
): Promise<Puppy | null> {
  // Build DB patch (only include defined fields)
  const dbPatch: Record<string, unknown> = {};
  if (patch.breed !== undefined) dbPatch.breed = patch.breed;
  if (patch.age !== undefined) dbPatch.age = patch.age;
  if (patch.gender !== undefined) dbPatch.gender = patch.gender;
  if (patch.price !== undefined) dbPatch.price = patch.price;
  if (patch.city !== undefined) dbPatch.city = patch.city;
  if (patch.description !== undefined) dbPatch.description = patch.description;
  if (patch.images !== undefined) dbPatch.images = patch.images;
  if (patch.vaccinated !== undefined) dbPatch.vaccinated = patch.vaccinated;
  if (patch.verified !== undefined) dbPatch.verified = patch.verified;
  if (patch.sold !== undefined) dbPatch.sold = patch.sold;
  if (patch.published !== undefined) dbPatch.published = patch.published;
  if (patch.sellerContact !== undefined) dbPatch.seller_contact = patch.sellerContact;

  const { data, error } = await supabase
    .from("puppies")
    .update(dbPatch)
    .eq("id", id)
    .select()
    .single();
  if (error || !data) return null;
  return fromRow(data);
}

export async function deletePuppy(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("puppies")
    .delete()
    .eq("id", id);
  return !error;
}

// ─── Constants (unchanged) ────────────────────────────────────────────────────

export const BREEDS = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Siberian Husky",
  "Shih Tzu",
  "Pomeranian",
  "Beagle",
  "Pug",
  "Rottweiler",
  "Dobermann",
  "Dachshund",
  "Bulldog",
  "Border Collie",
  "Cocker Spaniel",
  "Maltese",
  "Dalmatian",
];

export const CITIES = [
  "Ahmedabad",
  "Bangalore",
  "Bhopal",
  "Chandigarh",
  "Chennai",
  "Delhi",
  "Gurgaon",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Meerut",
  "Mumbai",
  "Noida",
  "Pune",
];

export const WHATSAPP_NUMBER = "918273848985";
