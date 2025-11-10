import { createClient } from '@supabase/supabase-js';


export const supabase = createClient('https://pnhjbnxaxkilxfgkcdbh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuaGpibnhheGtpbHhmZ2tjZGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTY3MDEsImV4cCI6MjA3ODIzMjcwMX0.Ex6ziITvDmYeDBNL6HSGujtNzlWtDVikeBosCkJx-3o')