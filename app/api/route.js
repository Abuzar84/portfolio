// pages/api/route.js (or app/api/route/route.js if using App Router)
// import { supabaseAdmin } from '../utils/supabaseClient'; // Adjust path as needed

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('userMessage') // Ensure this table exists in Supabase
      .insert([{ email, message }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to insert data' });
    }

    res.status(200).json({ message: 'Data inserted successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}