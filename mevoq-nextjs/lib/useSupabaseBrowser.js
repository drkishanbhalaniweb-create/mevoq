'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

/**
 * Custom hook to create Supabase browser client at runtime
 * This ensures environment variables are available when the client is created
 * 
 * @returns {Object} { supabase, isLoading }
 */
export function useSupabaseBrowser() {
    const [supabase, setSupabase] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Create client at runtime (not build time)
        // This ensures process.env values are available
        const client = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        setSupabase(client);
        setIsLoading(false);
    }, []);

    return { supabase, isLoading };
}
