export type Puppy = {
  id: string;
  breed: string;
  age: string; // e.g. "3 months"
  gender: "Male" | "Female";
  price: number;
  city: string;
  description: string;
  images: string[];
  vaccinated: boolean;
  verified: boolean;
  sold: boolean;
  sellerContact: string;
  createdAt: string;
};

export const puppies: Puppy[] = [
  {
    id: "1",
    breed: "Labrador Retriever",
    age: "3 months",
    gender: "Male",
    price: 18000,
    city: "Delhi",
    description:
      "Healthy, playful Golden Labrador pup. KCI registered parents. Vet-checked and dewormed. Ready for a loving home!",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
    ],
    vaccinated: true,
    verified: true,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    breed: "Golden Retriever",
    age: "2 months",
    gender: "Female",
    price: 22000,
    city: "Mumbai",
    description:
      "Adorable Golden Retriever pup. Very friendly and socialized. All vaccinations done. Parents are show quality.",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80",
    ],
    vaccinated: true,
    verified: true,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    breed: "Beagle",
    age: "4 months",
    gender: "Male",
    price: 15000,
    city: "Bangalore",
    description:
      "Sweet and curious Beagle puppy. Great with kids and other pets. Dewormed and vaccinated. Health certificate provided.",
    images: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
    ],
    vaccinated: true,
    verified: false,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    breed: "German Shepherd",
    age: "6 months",
    gender: "Male",
    price: 25000,
    city: "Hyderabad",
    description:
      "Intelligent and loyal German Shepherd. Training started. Excellent guard dog potential. Fully vaccinated.",
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80",
      "https://images.unsplash.com/photo-1575425186775-b8bf9c4a8b37?w=800&q=80",
    ],
    vaccinated: true,
    verified: true,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    breed: "Pomeranian",
    age: "2 months",
    gender: "Female",
    price: 12000,
    city: "Chennai",
    description:
      "Fluffy and adorable white Pomeranian. Very tiny and cute. Great apartment dog. Dewormed and first vaccination done.",
    images: [
      "https://images.unsplash.com/photo-1621887348744-6b0444f8a058?w=800&q=80",
      "https://images.unsplash.com/photo-1616944848612-fc6ca9b99e89?w=800&q=80",
    ],
    vaccinated: false,
    verified: true,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    breed: "Shih Tzu",
    age: "3 months",
    gender: "Female",
    price: 16000,
    city: "Pune",
    description:
      "Beautiful Shih Tzu puppy with lovely coat. Very calm and gentle temperament. Great with children. Fully vaccinated.",
    images: [
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&q=80",
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&q=80",
    ],
    vaccinated: true,
    verified: true,
    sold: true,
    sellerContact: "918273848985",
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    breed: "Dachshund",
    age: "4 months",
    gender: "Male",
    price: 14000,
    city: "Kolkata",
    description:
      "Charming Dachshund pup. Very playful and inquisitive. Good with families. Vaccinated and microchipped.",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
      "https://images.unsplash.com/photo-1515369271754-1ec1c33b3c11?w=800&q=80",
    ],
    vaccinated: true,
    verified: false,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-03-01",
  },
  {
    id: "8",
    breed: "Pug",
    age: "3 months",
    gender: "Male",
    price: 13000,
    city: "Delhi",
    description:
      "Classic fawn Pug puppy. Very loving and playful. All vaccinations done. Ready for a new forever home!",
    images: [
      "https://images.unsplash.com/photo-1529973625058-a665431328fb?w=800&q=80",
      "https://images.unsplash.com/photo-1534361960057-19f4434a4f66?w=800&q=80",
    ],
    vaccinated: true,
    verified: true,
    sold: false,
    sellerContact: "918273848985",
    createdAt: "2024-03-05",
  },
];

// In-memory store for admin to add/edit/delete
let puppyStore: Puppy[] = [...puppies];

export function getAllPuppies(): Puppy[] {
  return puppyStore;
}

export function getPuppyById(id: string): Puppy | undefined {
  return puppyStore.find((p) => p.id === id);
}

export function addPuppy(data: Omit<Puppy, "id" | "createdAt">): Puppy {
  const newPuppy: Puppy = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  puppyStore.push(newPuppy);
  return newPuppy;
}

export function updatePuppy(id: string, data: Partial<Puppy>): Puppy | null {
  const idx = puppyStore.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  puppyStore[idx] = { ...puppyStore[idx], ...data };
  return puppyStore[idx];
}

export function deletePuppy(id: string): boolean {
  const before = puppyStore.length;
  puppyStore = puppyStore.filter((p) => p.id !== id);
  return puppyStore.length < before;
}

export const BREEDS = [
  "Labrador Retriever",
  "Golden Retriever",
  "Beagle",
  "German Shepherd",
  "Pomeranian",
  "Shih Tzu",
  "Dachshund",
  "Pug",
  "Bulldog",
  "Husky",
  "Rottweiler",
  "Dobermann",
];

export const CITIES = [
  "Agra",
  "Ahmedabad",
  "Amritsar",
  "Aurangabad",
  "Bangalore",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Delhi",
  "Faridabad",
  "Ghaziabad",
  "Goa",
  "Gurgaon",
  "Guwahati",
  "Howrah",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Mangalore",
  "Meerut",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Udaipur",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
];

export const WHATSAPP_NUMBER = "918273848985";
