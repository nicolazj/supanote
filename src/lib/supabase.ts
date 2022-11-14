import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { setupURLPolyfill } from "react-native-url-polyfill";
import { Buffer } from "buffer";

//   patch
setupURLPolyfill();
global.Buffer = Buffer;

const supabaseUrl = "https://helnloqztjqvzkfflusb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlbG5sb3F6dGpxdnprZmZsdXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MDYwNDUsImV4cCI6MTk4Mzk4MjA0NX0.Ys8HjcJnf8rD8ciraTqirrhrCdXgHjCwDJy90Oq6vgQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
