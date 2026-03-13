import type { Metadata } from "next";
import { BREED_CONFIG } from "@/lib/breeds";
import { BreedPageContent } from "@/components/SeoPageContent";
const C = BREED_CONFIG.find((b) => b.slug === "labrador-puppies")!;
export const metadata: Metadata = { title: C.seoTitle, description: C.seoDescription };
export default function Page() { return <BreedPageContent config={C} />; }
