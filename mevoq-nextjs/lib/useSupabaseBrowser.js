'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

// Singleton instance to avoid recreating client on every render
let supabaseInstance = null;

/**
 * Custom hook to create Supabase browser client at runtime
 * Uses singleton pattern for performance optimization
 * 
 * @returns {Object} { supabase, isLoading }
 */
export function useSupabaseBrowser() {
    const [supabase] = useState(() => {
        // Only create client once
        if (!supabaseInstance) {
            supabaseInstance = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );
        }
        return supabaseInstance;
    });

    return { supabase, isLoading: false };
}
