import type { Metadata } from "next";
import { CITY_CONFIG } from "@/lib/breeds";
import { CityPageContent } from "@/components/SeoPageContent";
const C = CITY_CONFIG.find((c) => c.slug === "puppies-in-delhi")!;
export const metadata: Metadata = { title: C.seoTitle, description: C.seoDescription };
export default function Page() { return <CityPageContent config={C} />; }
