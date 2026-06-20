import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const { Client } = pg;

const initialArticles = [
  {
    id: 'monsoon-proofing',
    category: 'Material Care',
    title: 'Monsoon-Proofing Your Wooden Furniture in Mumbai',
    description: 'How to protect solid timber doors, veneer sheets, and modular cabinetry from swelling during Mumbai’s heavy monsoon humidity.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Mumbai's heavy monsoons bring moisture levels that can wreak havoc on custom woodwork and modular setups. Wood is a hygroscopic material, meaning it naturally absorbs moisture from the air, leading to swelling, jammed drawers, and veneer warping. 

      Here are key preventative guidelines to monsoon-proof your home:

      ### 1. Sourcing BWR Plywood
      Never settle for commercial-grade plywood in kitchens or bathrooms. Always specify Boiling Water Resistant (BWR) or marine-grade IS:710 plywood. These are bonded with synthetic phenol-formaldehyde resin, which resists moisture absorption and prevents layers from delaminating under humid conditions.

      ### 2. Edges and Sealing
      Unsealed edges are the primary entry points for water. Ensure that all modular boards are edge-banded with hot-melt glue machines at the factory, leaving zero gaps. For site-finished wood, apply clear sealer coats before the monsoon season starts.

      ### 3. Ventilation and Spacing
      Always leave a 1-inch air gap between your wardrobes and concrete walls. Mumbai walls absorb rain and sweat moisture; direct contact will transfer dampness to the back panels of your closets. Use silica gel packets inside drawers to keep micro-environments dry.
    `
  },
  {
    id: 'space-saving-mumbai',
    category: 'Space Planning',
    title: 'Space-Saving Ideas for 1BHK & 2BHK Mumbai Apartments',
    description: 'Smart space layouts, concealed fold-down study tables, and custom pull-out kitchen units designed for Dadar apartments.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      With apartment sizes shrinking in Mumbai, utilizing every square inch of carpet area is no longer optional—it’s an art form. Designing for a 1BHK or 2BHK flat requires multi-functional thinking and modular precision.

      ### 1. Vertical Storage Wardrobes
      In Mumbai flats, vertical space is your best asset. Build wardrobes right up to the ceiling lintel. The top lofts can store seasonal items, suitcases, and monsoon gear, keeping your floor area clutter-free.

      ### 2. Multi-Functional Furniture
      Invest in custom furniture that serves double duty:
      - Hydraulic lift beds that house heavy blankets and bedsheets.
      - A console table in the hallway that unfolds into a 4-seater dining layout.
      - Study tables that fold flush against veneer wall panels when not in use.

      ### 3. Kitchen Pull-Outs and Corner Units
      Traditional cabinet corners are often dead space. By integrating Hettich corner carousels or Hafele cargo pull-outs, we convert awkward layout corners into highly accessible storage for spice jars and steel containers.
    `
  },
  {
    id: 'vastu-layouts',
    category: 'Design Principles',
    title: 'Vastu Shastra: Layouts for East-Facing Mumbai Homes',
    description: 'Ideal placements for doors, beds, and modular stoves to invite positive energy flow inside urban apartment configurations.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    content: `
      Vastu Shastra is deep-rooted in Indian architecture. Aligning your apartment's layout with natural elements ensures peaceful living and positive energy circulation. For east-facing flats in Mumbai, the placement of key zones is crucial.

      ### 1. The Entrance Door
      For east-facing homes, the main door should ideally be positioned in the North-East or East direction. Teak wood doors with traditional brass fittings are recommended as they welcome positive solar energy.

      ### 2. Modular Kitchen Placement
      According to Vastu, the kitchen represents the fire element (Agni). The South-East corner of the apartment is the ideal location for the kitchen. When designing modular layouts, ensure the cooking stove is placed such that you face East while cooking.

      ### 3. Master Bedroom Position
      The master bedroom should be placed in the South-West zone of the home to bring stability and peace. When positioning wardrobes and custom timber headboards, ensure your head points South while sleeping.
    `
  },
  {
    id: 'countertop-choices',
    category: 'Material Curation',
    title: 'Travertine vs. Granite: Deciding Countertops in Indian Kitchens',
    description: 'Comparing scratch resistance, heat tolerances, and staining from turmeric and spices in daily Indian cooking.',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Choosing a kitchen countertop in an Indian household is a serious decision. Indian cooking involves heavy spice usage (like turmeric, which stains easily), hot kadhais placed directly on surfaces, and active kneading. We compare two popular luxury choices.

      ### 1. Granite: The Workhorse
      Granite is the absolute champion of Indian kitchens. It is a natural igneous rock, making it highly scratch-resistant, heat-resistant, and non-porous when sealed correctly. Spilled masalas or hot pans will not damage quality black granite.

      ### 2. Travertine & Marble: The Luxury Statement
      Travertine and Italian marble offer a soft, luxurious aesthetic. However, they are calcium carbonate-based, which makes them highly porous and acidic-sensitive. Lemon juice, vinegar, or turmeric will etch and stain travertine if not cleaned immediately. 

      ### 3. Our Recommendation
      If you cook heavy daily meals, go with sealed dark Granite or high-end Quartz. If you prefer a dry service kitchen or open breakfast counter, Travertine provides a stunning warm sand visual that makes your home look like an editorial catalog.
    `
  },
  {
    id: 'festive-decor-hacks',
    category: 'Styling & Decor',
    title: 'Preparing Your Living Room for Diwali & Ganesh Chaturthi',
    description: 'Quick lighting swaps, modular display rearrangements, and space-clearing layouts for festive hosting in Mumbai.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      Festivals are times of joy, warmth, and hosting guests. In Mumbai apartments, welcoming relatives for Ganpati and Diwali requires clearing floor space and setting up ambient lights. 

      ### 1. Modular Furniture Arrangements
      Move heavy coffee tables to the side to create a clear path for guests. If you have modular sofa units, separate them to create modular seating corners.

      ### 2. Warm Accent Lighting
      Turn off harsh overhead tubelights. Introduce quiet luxury: place brass diya platters, install 3000K warm LED strips under modular shelves, and use fabric floor lamps to create a cozy, premium festive glow.

      ### 3. Displaying Decor
      Clear your modular tv-unit shelves of daily clutter. Dedicate these open shelves to display traditional marigold flower pots, brass lamps, and heritage carvings.
    `
  }
];

async function run() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('ERROR: DATABASE_URL not found in environment.');
    process.exit(1);
  }

  console.log('Connecting to Neon PostgreSQL...');
  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    // 1. Create testimonials table
    console.log('Creating testimonials table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('testimonials table verified.');

    // 2. Create journals table
    console.log('Creating journals table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS journals (
        id VARCHAR(255) PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image TEXT,
        read_time VARCHAR(50),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('journals table verified.');

    // 3. Create contact_submissions table
    console.log('Creating contact_submissions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('contact_submissions table verified.');

    // 4. Seed journals table if empty
    const checkRes = await client.query('SELECT COUNT(*) FROM journals');
    const count = parseInt(checkRes.rows[0].count, 10);
    if (count === 0) {
      console.log('Seeding initial journal articles...');
      for (const article of initialArticles) {
        await client.query(`
          INSERT INTO journals (id, category, title, description, image, read_time, content)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          article.id,
          article.category,
          article.title,
          article.description,
          article.image,
          article.readTime,
          article.content
        ]);
      }
      console.log('Successfully seeded 5 initial articles.');
    } else {
      console.log('journals table already contains articles. Skipping seed.');
    }

    console.log('Database initialization completed successfully!');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
