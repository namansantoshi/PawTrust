import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Use the anon/publishable key — works for both read and write
// when RLS is disabled (or has permissive policies) on the puppies table.
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
    console.warn(
        "⚠️ Supabase keys missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
}

/**
 * Supabase client for server API routes.
 * Requires RLS to be disabled (or open insert/update/delete policies) on the puppies table.
 */
export const supabase = createClient(supabaseUrl, supabaseKey || "placeholder", {
    auth: { persistSession: false },
});
