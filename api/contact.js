import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const client = await pool.connect();

  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const result = await client.query(
      'INSERT INTO contact_submissions (name, email, phone, service, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, service || 'General Inquiry', message || '']
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database error in contact submission:', error);
    return res.status(500).json({ error: 'Database operation failed' });
  } finally {
    client.release();
  }
}
