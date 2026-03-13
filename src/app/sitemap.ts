import type { MetadataRoute } from "next";
import { BREED_CONFIG, CITY_CONFIG } from "@/lib/breeds";

const BASE = "https://pawtrust.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE}/puppies`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
        { url: `${BASE}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ];

    const breedPages: MetadataRoute.Sitemap = BREED_CONFIG.map((b) => ({
        url: `${BASE}/${b.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const cityPages: MetadataRoute.Sitemap = CITY_CONFIG.map((c) => ({
        url: `${BASE}/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...breedPages, ...cityPages];
}
