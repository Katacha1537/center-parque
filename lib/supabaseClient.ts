
import { createClient } from '@supabase/supabase-js';

// NOTE: To connect to your real database, replace these values with your Supabase URL and Anon Key
// You can find them in your Supabase Dashboard -> Project Settings -> API
// We use a valid URL format here to prevent the app from crashing if keys aren't set.
const supabaseUrl = 'https://dudvbdxfwwwamjjskfkp.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_h2MM1p0G6RaoJvLcT3n0bg_EUZIHqUx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
