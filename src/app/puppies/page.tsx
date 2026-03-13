import { Suspense } from "react";
import { getPublishedPuppies } from "@/lib/data";
import PuppiesClient from "@/components/PuppiesClient";

export const dynamic = "force-dynamic"; // always fetch fresh from Supabase

export default async function PuppiesPage() {
    const puppies = await getPublishedPuppies();
    return (
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading puppies…</div>}>
            <PuppiesClient initialPuppies={puppies} />
        </Suspense>
    );
}
