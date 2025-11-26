import { createClient } from "@supabase/supabase-js";

export function initSupabase() {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_KEY!;
    return createClient(url, key);
}