import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://ttwewexsotqwxisgnntg.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0d2V3ZXhzb3Rxd3hpc2dubnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzAyNTAsImV4cCI6MjAyODI0NjI1MH0.08M6Zn1pEAYSb7KrJnxrYWsaiVlurYpdBpkqV2HfFoE'; // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Export Supabase client instance
export { supabase };
