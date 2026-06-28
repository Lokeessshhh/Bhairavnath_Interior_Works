import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const { Client } = pg;

const initialArticles = [
  {
    id: 'ghar-renovate-karna-mumbai-thane',
    category: 'Material Care',
    title: 'Ghar Renovate Karna Hai? Thane aur Mumbai ke liye Carpentry Guide',
    description: 'Ghar renovate karna Mumbai Thane area mein? Check out our Hinglish guide explaining the carpentry work Thane details, costing, and finding an accha interior wala Thane.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      Agar aap apna ghar renovate karna Mumbai Thane region mein plan kar rahe hain, toh carpentry aur wood fittings sabse important part hote hain. Ek achha wardrobe, TV unit, ya custom furniture design aapke home renovation contractor Thane execution ko perfect banata hai. Let's discuss key steps.

      ### 1. Planning and Estimating Carpentry Work
      Sabse pehle decide karein ki aapko kis type ka material chahiye. Mumbai ki humidity ke liye hamesha BWP (Boiling Water Proof) marine plywood ka use karein. Carpentry work Thane sites par execute karne ke liye professional carpenters ki zarurat hoti hai jo raw sheet cutting aur joint alignment mein expert hon.

      ### 2. Finding an Accha Interior Wala Thane
      Jab log puchte hain ki "interior designer Thane mein kaun achha hai," toh answer design style aur execution quality par depend karta hai. Kisi large agency ko commission dene ke bajaye ek direct turnkey contractor ya custom furniture maker Mumbai workshop operator ke saath kaam karna sasta aur durable option hota hai.

      ### 3. Hiring a Carpenter
      Agar aapko sirf custom wardrobe ya cabinet banwana hai, toh aapko ek carpenter chahiye Thane location par jo modular fittings aur soft-close channels align kar sake. Ek direct team ke saath aap material transparency verify kar sakte hain aur middleman charges save kar sakte hain.
    `
  },
  {
    id: 'thane-modular-kitchen-rate-hinglish',
    category: 'Material Curation',
    title: 'Thane mein Modular Kitchen ka Rate Kya Hai? Material vs Price Guide',
    description: 'Janiye Thane mein modular kitchen ka rate kya hai, different finishes ki details, aur budget mein modular kitchen banwana hai Thane West mein toh planning tips.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Kitchen ko naye tareeqe se design karna har homeowner ka sapna hota hai. Agar aapko ek naya modular kitchen banwana hai Thane ya Mumbai suburbs mein, toh budget aur material specifications clear hona zaroori hai. Chaliye detailed rates aur layouts samajhte hain.

      ### 1. Thane mein Modular Kitchen ka Rate Kya Hai?
      Thane mein modular kitchen ka rate kya hai? Ye sawal laminate vs acrylic selection par depend karta hai. On average, basic commercial laminate kitchen rate ₹1,200 per sq ft se start hota hai, jabki high-gloss anti-scratch acrylic modular kitchen Thane price ₹1,800 se ₹2,500 per sq ft tak jata hai.

      ### 2. Layouts: L-Shaped aur Parallel Kitchens
      Ek small kitchen modular design Mumbai flat layouts ke liye parallel kitchen sabse best hota hai kyunki isme parallel work counters hote hain. L-shaped kitchens open-plan homes ke liye suitable hote hain aur corners ko utilize karne ke liye Hettich ya Blum corner accessories use ki jati hain.

      ### 3. Cost Control Hacks
      Budget limit ke andar modular kitchen design 2BHK Thane flat ke liye plan karne ke liye, overhead cabinets ke liye basic laminate aur lower cabinets ke liye high-durability acrylic sheet use karein. Is tarah aap high aesthetics aur pocket-friendly kitchen interior contractor near me Thane delivery dono ek sath paa sakte hain.
    `
  },
  {
    id: 'interior-designer-lodha-amara',
    category: 'Space Planning',
    title: 'Luxury Interior Work at Lodha Amara Thane: A Walkthrough',
    description: 'Explore our walkthrough of luxury interior work Lodha Amara Thane, highlighting modular wardrobe designs, false ceilings, and premium carpentry.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Lodha Amara on Kolshet Road is one of Thane's premier residential projects. Having executed multiple high-end projects here, our team shares a walkthrough of a premium 3BHK interior work Lodha Amara Thane renovation.

      ### 1. Concept and Spatial Zoning
      The layout was designed around the quiet luxury theme. As the primary interior designer Lodha Amara Thane contractor, we utilized natural wood textures, stone veneers, and soft lighting profiles to keep the space warm yet minimal. 

      ### 2. Modular Wardrobe and Carpentry Execution
      For the bedrooms, we designed custom floor-to-ceiling modular wardrobes Thane systems. In the master bedroom, a walk-in wardrobe Thane layout with tinted glass doors and warm LED profile lights was installed, showcasing our high-end carpentry work Majiwada Thane standards.

      ### 3. Integrated Living Room Setup
      The living room features a TV unit pooja unit wardrobe combo Thane configuration, finished in PU paint and brass accents. This layout keeps the television, spiritual zone, and display cabinetry integrated into a single seamless wall unit, perfect for modern premium society flats.
    `
  },
  {
    id: 'modular-kitchen-navi-mumbai',
    category: 'Material Curation',
    title: 'How to Design a Modern Modular Kitchen in Navi Mumbai',
    description: 'Planning a kitchen remodel? Learn how to choose the right materials and layouts for modular kitchen Navi Mumbai setups, from Kharghar to Vashi.',
    image: 'https://images.unsplash.com/photo-1556911220-115f6d2bb40f?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      Designing a kitchen in Navi Mumbai requires balancing style with humidity protection. Whether you reside in Kharghar, Vashi, or Seawoods, a well-planned modular kitchen Navi Mumbai setup is crucial for everyday Indian cooking.

      ### 1. Selecting the Ideal Kitchen Layout
      For typical apartments in Vashi and Nerul, an L-shaped modular kitchen Thane style or a parallel kitchen layout offers the best golden triangle flow. It separates the modular stove, sink, and refrigerator zones to maximize efficiency.

      ### 2. High-Performance Finishes
      Due to coastal humidity in Navi Mumbai, we recommend BWR marine plywood carcasses. For shutters, choosing acrylic modular kitchen Thane panels or a PU finish modular kitchen Mumbai setup protects against water splashes and offers easy-to-clean surfaces for turmeric spills.

      ### 3. Smart Cabinets & German Hardware
      Work with an experienced kitchen interior contractor near me Thane team to integrate modular kitchen with tandem drawers Thane setups. Smooth, soft-close hinges from Blum or Hettich prevent door rattling and extend the lifecycle of your kitchen cabinets.
    `
  },
  {
    id: '2bhk-interior-kalyan-budget',
    category: 'Space Planning',
    title: 'Affordable 2BHK Interior Design in Kalyan West: Budget Breakdown',
    description: 'A detailed cost breakdown for flat owners planning a 2BHK interior design Kalyan budget project, covering carpentry, false ceilings, and modular kitchens.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Moving into a new flat in Kalyan or Dombivli is an exciting milestone. However, executing premium interiors without overspending requires strategic layout planning and smart material selection. Here is our budget breakdown for a 2BHK interior design Kalyan budget project.

      ### 1. Smart Budgeting for Flat Interiors
      A standard flat interior price Thane and Kalyan budget ranges from ₹3.5 Lakhs to ₹6 Lakhs for carpentry and basic modular setups. To optimize cost, prioritize heavy-use areas like the main master bedroom wardrobes and the BWR kitchen cabinets.

      ### 2. Modular Wardrobe and TV Units
      Avoid expensive designer panels. Opt for custom wardrobe Thane Mumbai designs using moisture-resistant commercial ply finished in premium 1mm laminates. This gives a sleek look at a fraction of the cost of PU finishes. For living rooms, a simple TV unit design Thane layout with laminate drawers is highly functional.

      ### 3. Partnering with a Local Turnkey Contractor
      Work with a direct carpentry services Dombivli or interior designer Kalyan West contractor who runs their own local workshop. A direct turnkey interior contractor Thane team avoids designer markups and coordinates your gypsum false ceiling Thane and carpentry work in one package.
    `
  },
  {
    id: 'wardrobe-design-price-thane',
    category: 'Material Curation',
    title: 'Custom Wardrobe Design & Price Guide in Thane',
    description: 'Learn about wardrobe design price Thane variations, comparing materials, layout types like sliding wardrobes, and walk-in closets.',
    image: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Wardrobes are key storage assets in any Mumbai home. If you are planning to hire a wardrobe designer Thane specialist, understanding material grades, sliding accessories, and wardrobe design price Thane parameters is essential.

      ### 1. Wardrobe Cost Factors
      The overall wardrobe design price Thane residents pay depends on carcass materials and sliding mechanisms. Standard swing doors cost between ₹800 to ₹1,200 per sq ft of front elevation. Advanced sliding wardrobe Thane models using Hettich TopLine fittings range from ₹1,400 to ₹2,000 per sq ft.

      ### 2. Choosing Between Swing, Sliding, and Walk-in Wardrobes
      - **Modular Wardrobe Thane**: Factory edge-banded units that assemble in days.
      - **Sliding Wardrobes**: Best for narrow bedrooms in Majiwada or Ghodbunder flats because they require zero clearance space for doors.
      - **Walk-in Wardrobe Thane**: Custom layouts with glass shutters, vanity dressers, and drawer separators.

      ### 3. Recommended Materials
      Given Mumbai's humidity, we recommend Boiling Water Resistant (BWR) block boards for wardrobe shutters to prevent bending. Work with a trusted custom wardrobe Thane Mumbai maker to ensure high-pressure laminates or PU veneers are bonded correctly on both sides.
    `
  },
  {
    id: 'false-ceiling-rate-sqft-thane',
    category: 'Design Principles',
    title: 'Thane False Ceiling Rate Per Sq Ft (2026 Price Guide)',
    description: 'An updated guide to false ceiling rate Thane per sq ft, comparing gypsum vs POP ceiling contractor Thane options and modern light profiles.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      A false ceiling plays a vital role in integrating profile lights, hidden wiring, and cove lighting. If you are renovating your apartment in Thane or Dombivli, here is an updated breakdown of the false ceiling rate per sq ft Thane.

      ### 1. Current False Ceiling Rates
      The false ceiling rate per sq ft Thane homeowners pay starts from ₹65 for basic gypsum false ceiling Thane boards. A custom POP ceiling contractor Thane plaster setup using decorative moldings ranges from ₹85 to ₹110 per sq ft.

      ### 2. High-Performance Lighting Integrations
      Modern ceiling trends have moved beyond simple light bulbs. High-end false ceiling with profile lights Thane and magnetic track light false ceiling Thane layouts create a sleek architectural aesthetic, costing between ₹120 to ₹160 per sq ft including wiring.

      ### 3. Sourcing the Right Materials
      Always ensure your contractor uses moisture-resistant gypsum board ceiling Mumbai materials. Standard commercial board will sag over time under Mumbai's monsoons. Working with a dedicated false ceiling contractor Thane ensures proper steel framing grids and zero cracks.
    `
  },
  {
    id: 'office-interior-cost-thane',
    category: 'Space Planning',
    title: 'Office Interior Design Cost in Thane 2026',
    description: 'Planning an office fit-out? Get a detailed breakdown of office interior design cost in Thane 2026 and commercial contractor tips.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Setting up a new commercial office or workspace in Thane West, Wagle Estate, or Nerul requires careful capital budgeting. We discuss the current office interior design cost in Thane 2026 and fit-out factors.

      ### 1. Office Fit-out Cost Classes
      The office interior design cost in Thane 2026 ranges from:
      - **Basic Bareshell Office Interior Thane**: ₹1,200 to ₹1,800 per sq ft (includes partition glass drywall dividers, modular workstations, and basic electrical grids).
      - **Premium Corporate Workspaces**: ₹2,200 to ₹3,500 per sq ft (includes double-glazed acoustic glass partitions, HVAC integrations, executive veneer desks, and custom lounge seating).

      ### 2. Planning Partitions and Drywalls
      To keep office renovation Thane costs within budget, utilize modular acoustic gypsum drywall partitions. They are faster to construct than brick walls and offer flexible layouts for conference tables and executive cabins.

      ### 3. Hiring a Commercial Turnkey Contractor
      Work with a corporate interior designer Thane or turnkey office interior Thane contractor who handles all plumbing, electrical, HVAC, and carpentry work. Managing multiple subcontractors independently often leads to project delays and cost overruns.
    `
  },
  {
    id: 'vastu-interior-design-thane',
    category: 'Design Principles',
    title: 'Vastu-Compliant Interior Design Tips for Thane Homes',
    description: 'A complete guide to vastu compliant interior design Thane layouts. Learn the best pooja unit placement and kitchen door setup.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      Designing a home that invites peace and prosperity requires aligning modern layouts with ancient Vastu Shastra principles. Here are practical tips for achieving a vastu compliant interior design in Thane apartments.

      ### 1. Entrance and Main Door
      The main door represents the energy gateway. Ensure your entrance teak wood door is clean, solid, and faces East or North-East. Avoid placing custom wardrobes or mirrors directly opposite the entrance.

      ### 2. Pooja Unit Placement
      The North-East corner (Ishanya corner) is the ideal pooja unit placement vastu interior design zone. We design custom pooja unit design Thane models with backlit jaali screens that fit perfectly in this sacred space.

      ### 3. Kitchen Stove and Modular Layout
      The kitchen represents the fire element. The South-East corner is the best Vastu zone for cooking. When designing a modular kitchen in Thane, place the stove so the cook faces East. Working with the best interior designer Thane West specialists ensures Vastu rules are followed without compromising layout flow.
    `
  },
  {
    id: 'home-renovation-hiranandani-estate',
    category: 'Material Care',
    title: 'Before & After: Full Home Renovation in Hiranandani Estate Thane',
    description: 'Case study of a home renovation Hiranandani Estate Thane project. Custom wardrobe design and carpentry work details.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      Our team recently completed a turnkey home renovation in Hiranandani Estate, Thane. The project involved converting a bareshell flat into a warm-minimalist luxury home, featuring custom wardrobes and high-end carpentry.

      ### 1. The Design Challenge
      As the selected interior designer Hiranandani Estate Thane contractor, we had to maximize natural light while creating ample storage. The client requested walk-in wardrobes and custom carpentry work Thane setups that look flush.

      ### 2. Custom Wardrobes & TV Units
      Our wardrobe designer Thane team designed custom floor-to-ceiling sliding wardrobes in the bedrooms. We used high-pressure laminates and soft-close channels. A combined TV unit and pooja unit combo Thane layout was created for the living room.

      ### 3. Durability Against Mumbai Humidity
      Using BWP marine plywood for the modular wardrobes ensures they resist swelling during monsoons. Direct supervision of carpentry work Thane by our master carpenters ensured perfect 0mm-gap hardware alignments.
    `
  },
  {
    id: '2bhk-interior-design-thane-budget',
    category: 'Space Planning',
    title: '2BHK Interior Design in Thane Under ₹5 Lakhs',
    description: 'Learn how to get a premium 2BHK interior design in Thane under budget. A guide to turnkey interior contractor Thane cost savings.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    content: `
      Getting your new flat ready shouldn't break the bank. With smart planning, you can execute a premium 2BHK interior design in Thane under budget. Here are the cost-saving strategies used by experienced turnkey interior contractors in Thane.

      ### 1. Factory Modular vs. Onsite Carpentry
      To stay under budget, combine factory-made modular sliding wardrobes with custom site carpentry work for TV units and pooja units. This reduces onsite labor charges and ensures high-quality edge-band finishing.

      ### 2. Resale Flat Renovation Thane Hacks
      If you are executing a resale flat renovation, retain the existing wall plaster where possible. Focus your budget on high-impact areas like the living room POP ceiling design and a clean modular kitchen.

      ### 3. Hiring an Accha Interior Wala Thane
      Instead of hiring expensive design agencies that outsource execution, work with a direct turnkey interior contractor in Thane who operates their own workshop. This cuts out middleman commissions, keeping your flat interior price within budget.
    `
  },
  {
    id: 'gypsum-vs-pop-ceiling-thane',
    category: 'Design Principles',
    title: 'Gypsum vs POP Ceiling — Which is Better for Thane Homes?',
    description: 'Compare gypsum board ceilings with POP ceiling designs. Get the current false ceiling rate Thane per sq ft and design ideas for living rooms.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    content: `
      A false ceiling can completely transform the lighting and aesthetic of your apartment. But should you hire a gypsum false ceiling Thane contractor or go with a POP ceiling contractor Thane plaster setup? We compare both options for Thane and Mumbai flats.

      ### 1. Gypsum Board Ceilings
      Gypsum false ceiling Thane installations are fast, clean, and offer a perfectly flat surface. Using branded gypsum board ceiling Mumbai materials is ideal for high-rise apartments because it allows seamless integration of profile lights.

      ### 2. POP Ceilings (Plaster of Paris)
      POP plaster allows for custom organic shapes and heavy molding work. However, POP ceiling contractor Thane site work requires highly experienced local carpenters and plasterers, which takes longer to dry and cure.

      ### 3. Rate Comparison
      A typical false ceiling rate Thane per sq ft starts from ₹65 for simple boards. A false ceiling design living room Thane setup with cove lighting or profile lights will range from ₹90 to ₹120 per sq ft.
    `
  },
  {
    id: 'modular-kitchen-cost-thane',
    category: 'Material Curation',
    title: 'Modular Kitchen Cost in Thane 2026 — Full Breakdown',
    description: 'Planning a kitchen renovation? Check out the breakdown of modular kitchen cost in Thane 2026, comparing L-shaped and parallel modular kitchen Thane options.',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    content: `
      If you are planning to build a new modular kitchen in Thane or Mumbai, understanding the budget breakdown is key. The overall modular kitchen cost in Thane 2026 depends on several options including layout, materials, and hardware.

      ### 1. Layout Cost Differences
      Choosing between an L-shaped modular kitchen Thane setup and a parallel modular kitchen Thane layout impacts the total square footage of materials. Parallel kitchens are often more cost-effective for compact flats, while L-shaped designs maximize corner cabinetry.

      ### 2. Materials and Finishes
      For high-durability and moisture protection, a BWR (Boiling Water Resistant) ply core is recommended. The exterior finish (acrylic modular kitchen Thane panels vs. PU finish modular kitchen Mumbai setups) will determine the premium look and scratch resistance.

      ### 3. German Hardware & Accessories
      Integrating high-end German hardware modular kitchen Thane runners (such as soft-close tandem drawers from Blum or Hettich) adds to the cost but guarantees smooth execution and lifetime durability.
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

    // 4. Seed journals table: clear first then seed
    console.log('Clearing old journal articles...');
    await client.query('DELETE FROM journals');

    console.log('Seeding initial journal articles in chronological order...');
    // Seed in reverse order so the first item in the array (index 0) gets inserted last and has the latest timestamp
    for (let i = initialArticles.length - 1; i >= 0; i--) {
      const article = initialArticles[i];
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
      // Small delay to ensure distinct auto-generated timestamps
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.log('Successfully seeded 13 initial articles.');

    console.log('Database initialization completed successfully!');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
