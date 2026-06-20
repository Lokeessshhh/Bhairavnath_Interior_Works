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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = await pool.connect();

  try {
    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM testimonials ORDER BY id DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { name, role, rating, comment } = req.body;
      if (!name || !rating || !comment) {
        return res.status(400).json({ error: 'Name, rating, and comment are required.' });
      }

      const ratingNum = parseInt(rating, 10);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5.' });
      }

      const result = await client.query(
        'INSERT INTO testimonials (name, role, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, role || 'Client', ratingNum, comment]
      );

      return res.status(201).json(result.rows[0]);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Database error in testimonials:', error);
    return res.status(500).json({ error: 'Database operation failed' });
  } finally {
    client.release();
  }
}
