// Comprehensive Yeezy Footwear Product Catalog

export const categories = [
  { id: 'all', label: 'All Silhouettes' },
  { id: '350', label: 'Yeezy Boost 350 V2' },
  { id: 'slide', label: 'Yeezy Slides' },
  { id: 'foam', label: 'Yeezy Foam Runner' }
];

export const colorFilters = [
  { id: 'all', label: 'All Colors' },
  { id: 'black', label: 'Black / Onyx' },
  { id: 'white', label: 'White / Bone' },
  { id: 'grey', label: 'Grey / Granite' },
  { id: 'earth', label: 'Earth / Brown' },
  { id: 'blue', label: 'Azure / Marine' },
  { id: 'green', label: 'Glow Green' }
];

export const productsData = [
  {
    id: 'yeezy-350-zebra',
    name: 'Yeezy Boost 350 V2 "Zebra"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'white',
    colorway: 'White / Core Black / Red',
    sku: 'CP9654',
    price: 230,
    rating: 4.9,
    reviewsCount: 328,
    image: '/shoes/g1_1.webp',
    galleryImages: ['/shoes/g1_1.webp'],
    description: 'The Adidas Yeezy Boost 350 V2 "Zebra" is one of the most recognizable and coveted sneakers of the modern era. Featuring a signature black and white Primeknit patterned upper, red mirrored "SPLY-350" text, and full-length Boost encapsulated within a translucent white ribbed rubber midsole.',
    specs: [
      { label: 'Upper', value: 'Re-engineered Primeknit' },
      { label: 'Midsole', value: 'Full-length adidas Boost technology' },
      { label: 'Outsole', value: 'Translucent rubber cage' },
      { label: 'Lacing', value: 'Integrated loop lacing system' }
    ]
  },
  {
    id: 'yeezy-350-granite',
    name: 'Yeezy Boost 350 V2 "Granite"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'grey',
    colorway: 'Granite / Core Black',
    sku: 'HQ2059',
    price: 230,
    rating: 4.8,
    reviewsCount: 184,
    image: '/shoes/g1_2.webp',
    galleryImages: [
      '/shoes/g1_2.webp',
      '/shoes/g3_main.webp',
      '/shoes/g3_1.webp',
      '/shoes/g3_2.webp',
      '/shoes/g3_4.webp'
    ],
    description: 'The Yeezy Boost 350 V2 "Granite" delivers a muted neutral aesthetic with a two-tone Primeknit upper in versatile grey tones, offset by a bold black monofilament side stripe with reverse "SPLY-350" branding. Supported by a semi-translucent Boost sole unit.',
    specs: [
      { label: 'Upper', value: 'Two-tone engineered Primeknit' },
      { label: 'Midsole', value: 'Full-length Boost cushioning' },
      { label: 'Outsole', value: 'Ribbed TPU wrap sole' },
      { label: 'Stripe', value: 'Monofilament post-dyed stripe' }
    ]
  },
  {
    id: 'yeezy-350-mx-dark-salt',
    name: 'Yeezy Boost 350 V2 "MX Dark Salt"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'grey',
    colorway: 'MX Dark Salt / Black / Grey',
    sku: 'ID5428',
    price: 230,
    rating: 4.9,
    reviewsCount: 156,
    image: '/shoes/g1_3.webp',
    galleryImages: ['/shoes/g1_3.webp'],
    description: 'Highlighted by an intricate swirl of dark charcoal, silver, and black Primeknit yarn, the MX Dark Salt edition brings artistic texture to the classic 350 V2 silhouette.',
    specs: [
      { label: 'Upper', value: 'MX marled multi-yarn Primeknit' },
      { label: 'Midsole', value: 'Enclosed Boost cushioning' },
      { label: 'Outsole', value: 'Dark smoked rubber sole' },
      { label: 'Heel Tab', value: 'Traditional pull tab' }
    ]
  },
  {
    id: 'yeezy-350-bred',
    name: 'Yeezy Boost 350 V2 "Core Black / Red"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'black',
    colorway: 'Core Black / Red',
    sku: 'CP9652',
    price: 230,
    rating: 5.0,
    reviewsCount: 412,
    image: '/shoes/g1_4.webp',
    galleryImages: ['/shoes/g1_4.webp'],
    description: 'Universally hailed as the "Bred" colorway, this iconic edition features an obsidian black Primeknit upper contrasted with vibrant solar red backwards "SPLY-350" lettering on the lateral side.',
    specs: [
      { label: 'Upper', value: 'Heavyweight black Primeknit' },
      { label: 'Midsole', value: 'Full-length Boost cushion unit' },
      { label: 'Accents', value: 'Infra-red embroidery' },
      { label: 'Outsole', value: 'Semi-translucent black TPU' }
    ]
  },
  {
    id: 'yeezy-350-beluga-reflective',
    name: 'Yeezy Boost 350 V2 "Beluga Reflective"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'grey',
    colorway: 'Steeple Grey / Solar Red',
    sku: 'GW1229',
    price: 240,
    rating: 4.9,
    reviewsCount: 295,
    image: '/shoes/g1_5.webp',
    galleryImages: ['/shoes/g1_5.webp'],
    description: 'Upgrading the legendary original Beluga, this Reflective edition weaves hi-vis 3M threads into the grey and orange Primeknit upper, coming alive under flash photography.',
    specs: [
      { label: 'Upper', value: '3M reflective intertwined Primeknit' },
      { label: 'Midsole', value: 'Boost cushioning' },
      { label: 'Stripe', value: 'Solar Red accent bar' },
      { label: 'Outsole', value: 'Gunmetal ribbed rubber' }
    ]
  },
  {
    id: 'yeezy-350-bone',
    name: 'Yeezy Boost 350 V2 "Bone"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'white',
    colorway: 'Bone / Pure White',
    sku: 'HQ6316',
    price: 230,
    rating: 4.8,
    reviewsCount: 198,
    image: '/shoes/g1_6.webp',
    galleryImages: ['/shoes/g1_6.webp'],
    description: 'An immaculate minimalist expression of the 350 V2 silhouette in clean alabaster bone white, featuring a translucent monofilament side stripe that exposes the inner architectural cage.',
    specs: [
      { label: 'Upper', value: 'Alabaster white Primeknit' },
      { label: 'Midsole', value: 'Full-length Boost' },
      { label: 'Outsole', value: 'Translucent white rubber' },
      { label: 'Laces', value: 'Tonal round cotton laces' }
    ]
  },
  {
    id: 'yeezy-350-carbon',
    name: 'Yeezy Boost 350 V2 "Carbon Beluga"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'black',
    colorway: 'Carbon / Solar Red',
    sku: 'HQ7045',
    price: 230,
    rating: 4.8,
    reviewsCount: 167,
    image: '/shoes/g1_7.webp',
    galleryImages: ['/shoes/g1_7.webp'],
    description: 'A dark, brooding remix of the classic Beluga colorway with deep carbon grey Primeknit, dark accents, and an electrifying solar red stripe.',
    specs: [
      { label: 'Upper', value: 'Multi-patterned carbon knit' },
      { label: 'Midsole', value: 'Encapsulated Boost core' },
      { label: 'Outsole', value: 'Dark tinted cage' },
      { label: 'Insole', value: 'Ortholite antimicrobial footbed' }
    ]
  },
  {
    id: 'yeezy-350-onyx',
    name: 'Yeezy Boost 350 V2 "Onyx"',
    category: '350',
    categoryLabel: 'Yeezy Boost 350 V2',
    colorKey: 'black',
    colorway: 'Onyx / Triple Black',
    sku: 'HQ4540',
    price: 230,
    rating: 4.9,
    reviewsCount: 380,
    image: '/shoes/g4_1.webp',
    galleryImages: ['/shoes/g4_1.webp'],
    description: 'The quintessential blackout sneaker. Murdered-out in rich obsidian tones from heel tab to toe box, offering unparalleled versatility and sleek stealth appeal.',
    specs: [
      { label: 'Upper', value: 'Triple black Primeknit' },
      { label: 'Midsole', value: 'Enclosed Boost foam' },
      { label: 'Outsole', value: 'Smoked black ribbed outsole' },
      { label: 'Profile', value: 'Low-cut ergonomic collar' }
    ]
  },
  {
    id: 'yeezy-slide-azure',
    name: 'Yeezy Slide "Azure"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'blue',
    colorway: 'Azure Blue',
    sku: 'ID4133',
    price: 70,
    rating: 4.9,
    reviewsCount: 242,
    image: '/shoes/g2_1.webp',
    galleryImages: ['/shoes/g2_1.webp', '/shoes/g5_1.webp'],
    description: 'Dressed in a vibrant royal blue tone, the Yeezy Slide Azure is cast in seamless injected EVA foam for lightweight durability. Strategic groove placement on the serrated outsole maximizes traction and step flexibility.',
    specs: [
      { label: 'Material', value: 'Injected EVA foam compound' },
      { label: 'Footbed', value: 'Soft seamless footbed with subtle arch support' },
      { label: 'Outsole', value: 'Exaggerated saw-tooth traction grooves' },
      { label: 'Design', value: 'Single-piece molded unibody' }
    ]
  },
  {
    id: 'yeezy-slide-flax',
    name: 'Yeezy Slide "Flax"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'earth',
    colorway: 'Flax / Earth Brown',
    sku: 'FZ5896',
    price: 70,
    rating: 4.8,
    reviewsCount: 190,
    image: '/shoes/g2_2.webp',
    galleryImages: ['/shoes/g2_2.webp', '/shoes/g5_2.webp'],
    description: 'A warm monochromatic earth tone slide perfect for cozy loungewear or outdoor street style. Contoured footbed delivers instant cloud-like step-in comfort.',
    specs: [
      { label: 'Material', value: 'High-density EVA foam' },
      { label: 'Traction', value: 'Deep horizontal flex ridges' },
      { label: 'Weight', value: 'Ultralight featherweight build' },
      { label: 'Fit', value: 'Recommended to size up one full size' }
    ]
  },
  {
    id: 'yeezy-slide-glow-green',
    name: 'Yeezy Slide "Glow Green"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'green',
    colorway: 'Glow Green',
    sku: 'GX6138',
    price: 70,
    rating: 4.7,
    reviewsCount: 178,
    image: '/shoes/g2_3.webp',
    galleryImages: ['/shoes/g2_3.webp', '/shoes/g5_3.webp'],
    description: 'An audacious electric neon tone that turns heads wherever you walk. Single-piece injected foam structure cradles the foot in responsive plush comfort.',
    specs: [
      { label: 'Colorway', value: 'High-visibility neon green' },
      { label: 'Material', value: 'Injected EVA polymer' },
      { label: 'Sole', value: 'Serrated outdoor tooth tread' },
      { label: 'Cushioning', value: 'Shock-absorbing foam density' }
    ]
  },
  {
    id: 'yeezy-slide-ochre',
    name: 'Yeezy Slide "Ochre"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'earth',
    colorway: 'Ochre / Muted Amber',
    sku: 'GW1931',
    price: 70,
    rating: 4.8,
    reviewsCount: 164,
    image: '/shoes/g2_4.webp',
    galleryImages: ['/shoes/g2_4.webp', '/shoes/g5_4.webp'],
    description: 'A refined mineral ochre finish featuring a subtle marbled texture through the injected foam compound, offering understated luxury.',
    specs: [
      { label: 'Material', value: 'Textured injected EVA' },
      { label: 'Finish', value: 'Matte mineral swirl' },
      { label: 'Comfort', value: 'Anatomic arch cradle' },
      { label: 'Sole', value: 'Heavy tooth ripple pattern' }
    ]
  },
  {
    id: 'yeezy-slide-pure',
    name: 'Yeezy Slide "Pure"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'white',
    colorway: 'Pure / Bone Ecru',
    sku: 'GW1934',
    price: 70,
    rating: 4.9,
    reviewsCount: 310,
    image: '/shoes/g2_5.webp',
    galleryImages: ['/shoes/g2_5.webp', '/shoes/g5_5.webp'],
    description: 'The quintessential minimalist Yeezy slide in pure ivory ecru. Perfectly balanced, ultra-plush, and seamlessly sculpted.',
    specs: [
      { label: 'Material', value: 'Injected EVA' },
      { label: 'Color', value: 'Ivory Bone' },
      { label: 'Weight', value: 'Under 250g per shoe' },
      { label: 'Outsole', value: 'Serrated traction sole' }
    ]
  },
  {
    id: 'yeezy-slide-onyx',
    name: 'Yeezy Slide "Onyx"',
    category: 'slide',
    categoryLabel: 'Yeezy Slide',
    colorKey: 'black',
    colorway: 'Onyx Black',
    sku: 'HQ6448',
    price: 70,
    rating: 5.0,
    reviewsCount: 520,
    image: '/shoes/g4_2.webp',
    galleryImages: ['/shoes/g4_2.webp', '/shoes/g5_6.webp'],
    description: 'The all-black Yeezy Slide Onyx is the ultimate daily footwear choice, combining stealth aesthetics with cloud-like foam ergonomics.',
    specs: [
      { label: 'Color', value: 'Matte Charcoal / Deep Onyx' },
      { label: 'Build', value: 'Seamless injected foam unibody' },
      { label: 'Tread', value: 'Deep horizontal teeth' },
      { label: 'Water', value: 'Water-resistant quick dry' }
    ]
  },
  {
    id: 'yeezy-foam-onyx',
    name: 'Yeezy Foam Runner "Onyx"',
    category: 'foam',
    categoryLabel: 'Yeezy Foam Runner',
    colorKey: 'black',
    colorway: 'Onyx Black',
    sku: 'HP8739',
    price: 90,
    rating: 4.9,
    reviewsCount: 345,
    image: '/shoes/g2_6.webp',
    galleryImages: ['/shoes/g2_6.webp'],
    description: 'An avant-garde sculpted slip-on silhouette made from a blend of lightweight EVA and harvested algae foam. Aerodynamic ventilation cutouts provide maximum airflow and futuristic style.',
    specs: [
      { label: 'Material', value: 'Hydro-harvested Algae Foam + EVA' },
      { label: 'Ventilation', value: 'Sculpted multi-port airflow cutouts' },
      { label: 'Collar', value: 'Contoured slip-on ankle lock' },
      { label: 'Sustainability', value: 'Eco-conscious algae blend' }
    ]
  },
  {
    id: 'yeezy-foam-sand',
    name: 'Yeezy Foam Runner "Sand"',
    category: 'foam',
    categoryLabel: 'Yeezy Foam Runner',
    colorKey: 'white',
    colorway: 'Sand / Off-White',
    sku: 'FY4567',
    price: 90,
    rating: 4.9,
    reviewsCount: 290,
    image: '/shoes/g2_7.webp',
    galleryImages: ['/shoes/g2_7.webp'],
    description: 'The coveted Sand Foam Runner showcases the organic, alien-inspired geometry of the silhouette in an elegant, versatile off-white tone.',
    specs: [
      { label: 'Material', value: 'EVA & Algae foam blend' },
      { label: 'Design', value: 'Single mold organic lattice' },
      { label: 'Weight', value: 'Featherlight architecture' },
      { label: 'Tread', value: 'Wavy herringbone traction' }
    ]
  },
  {
    id: 'yeezy-foam-carbon',
    name: 'Yeezy Foam Runner "Carbon"',
    category: 'foam',
    categoryLabel: 'Yeezy Foam Runner',
    colorKey: 'grey',
    colorway: 'Carbon / Dark Slate',
    sku: 'IG5349',
    price: 90,
    rating: 4.8,
    reviewsCount: 215,
    image: '/shoes/g2_8.webp',
    galleryImages: ['/shoes/g2_8.webp'],
    description: 'Cloaked in a smoky carbon tone, this Foam Runner highlights the sculpted contours, deep vents, and aerodynamic heel cup of modern Yeezy footwear.',
    specs: [
      { label: 'Color', value: 'Smoked Carbon Slate' },
      { label: 'Construction', value: 'One-piece molded EVA' },
      { label: 'Airflow', value: 'Dynamic geometric cutouts' },
      { label: 'Footbed', value: 'Textured non-slip footbed' }
    ]
  },
  {
    id: 'yeezy-foam-mx-cinder',
    name: 'Yeezy Foam Runner "MX Cinder"',
    category: 'foam',
    categoryLabel: 'Yeezy Foam Runner',
    colorKey: 'black',
    colorway: 'MX Cinder / Multi-Swirl',
    sku: 'ID4126',
    price: 90,
    rating: 4.9,
    reviewsCount: 270,
    image: '/shoes/g4_4.webp',
    galleryImages: ['/shoes/g4_4.webp'],
    description: 'Featuring a mesmerizing marbled swirl of dark cinder, deep tan, and sky blue accents, each pair of MX Cinder Foam Runners possesses a completely unique, 1-of-1 pattern.',
    specs: [
      { label: 'Pattern', value: 'One-of-a-kind randomized MX swirl' },
      { label: 'Material', value: 'Algae-infused lightweight foam' },
      { label: 'Fit', value: 'Snug lockdown with cushioned support' },
      { label: 'Sole', value: 'Flexible high-traction grooves' }
    ]
  }
];
