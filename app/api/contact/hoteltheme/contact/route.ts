import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Loaded" : "MISSING");
console.log("Supabase Key:", supabaseAnonKey ? "Loaded" : "MISSING");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or ANON_KEY is missing. Check .env.local");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, Email and message required" }, { status: 400 });
    }

    const { error } = await supabase
      .from('HotelthemeContact')
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}