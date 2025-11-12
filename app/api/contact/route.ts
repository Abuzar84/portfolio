// app/api/contact/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Optional: simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('messages')               // <-- YOUR TABLE NAME
      .insert([{ email, message }]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Supabase insert error:', err);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}