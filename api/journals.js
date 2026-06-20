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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = await pool.connect();

  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const result = await client.query('SELECT * FROM journals WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(200).json(result.rows[0]);
      } else {
        const result = await client.query('SELECT * FROM journals ORDER BY created_at DESC, id DESC');
        return res.status(200).json(result.rows);
      }
    }

    if (req.method === 'POST') {
      const { id: inputId, category, title, description, image, readTime, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
      }

      // Generate a slug if id is not provided
      const slugId = inputId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const result = await client.query(
        `INSERT INTO journals (id, category, title, description, image, read_time, content)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE 
         SET category = EXCLUDED.category, title = EXCLUDED.title, description = EXCLUDED.description, 
             image = EXCLUDED.image, read_time = EXCLUDED.read_time, content = EXCLUDED.content
         RETURNING *`,
        [
          slugId,
          category || 'General',
          title,
          description || '',
          image || 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
          readTime || '5 min read',
          content
        ]
      );

      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'Article ID is required for deletion.' });
      }

      const result = await client.query('DELETE FROM journals WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Article not found or already deleted.' });
      }

      return res.status(200).json({ success: true, message: 'Article deleted successfully.', deleted: result.rows[0] });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Database error in journals:', error);
    return res.status(500).json({ error: 'Database operation failed' });
  } finally {
    client.release();
  }
}
