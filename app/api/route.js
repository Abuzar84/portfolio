import { supabase } from '../utils/supabaseClient'; // Server-side client with service key

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body; // Removed title

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  const { data, error } = await supabase
    .from('userMessage') // Match schema case
    .insert([{ email, message }]) // Only schema-matched fields
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ data });
}