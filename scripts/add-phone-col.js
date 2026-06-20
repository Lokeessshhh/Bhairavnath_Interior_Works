import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Adding phone column to contact_submissions table...');
    await client.query('ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone VARCHAR(50);');
    console.log('Successfully added phone column!');
  } catch (e) {
    console.error('Error modifying table:', e);
  } finally {
    await client.end();
  }
}
run();
