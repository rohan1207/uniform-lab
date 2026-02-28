/**
 * Featured schools list – shared by FeaturedProducts section and Navbar dropdown.
 * Keep in sync with schoolCatalog slugs where applicable.
 *
 * color  — brand accent used for the logo-zone gradient overlay
 * logo   — path to logo PNG (transparent preferred). Set null to show initials badge.
 */
export const featuredSchools = [
  {
    id: 'nanded-city-public',
    slug: 'nanded-city-public',
    name: "Vidya Pratishthan's Nanded City Public School",
    level: 'CBSE',
    image: '/nanded.png',
    logo: '/nanded_logo.png',
    color: '#1e40af',   // deep navy blue
  },
  {
    id: 'the-orbis-school',
    slug: 'the-orbis-school',
    name: 'The Orbis School',
    level: 'CBSE',
    image: '/orbis.png',
    logo: '/orbis_logo.png',
    color: '#b91c1c',   // deep red
  },
  {
    id: 'bharati-rabindranath-tagore',
    slug: 'bharati-rabindranath-tagore',
    name: "Bharati Vidyapeeth's Rabindranath Tagore School of Excellence",
    level: 'School of Excellence',
    image: '/bvrtse.png',
    logo: '/bvrtse_logo.png',
    color: '#065f46',   // deep emerald
  },
  {
    id: 'indo-scots-global-school',
    slug: 'indo-scots-global-school',
    name: 'Indo Scots Global School',
    level: 'CBSE',
    image: '/indo.png',
  
    logo: '/indo_logo.png',
    color: '#6d28d9',   // violet
  },
  {
    id: 'magarpatta-city-public-school',
    slug: 'magarpatta-city-public-school',
    name: 'Magarpatta City Public School',
    level: 'ICSE',
    image: '/orbis.png',
    logo: '/magarpatta_logo.jpg',
  
    color: '#b45309',   // amber-brown
  },
];
