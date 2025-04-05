// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://oxdmjvvdvrvknsasjsel.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZG1qdnZkdnJ2a25zYXNqc2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODg3MDUsImV4cCI6MjA1OTI2NDcwNX0.7JSdsZ1nKkxfhDvo4g8nqhMpowPniOaKcZclDYPGU7Y"
);