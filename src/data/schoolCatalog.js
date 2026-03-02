/**
 * Mock school catalog – replace with API call later.
 * Template supports any number of categories and products per school.
 */

const DEFAULT_CLASSES = ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export const PRE_PRIMARY_CLASSES = ['Nursery', 'KG', 'LKG', 'UKG'];
export const GRADE_1_ONWARDS_CLASSES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export const GRADE_FILTER_OPTIONS = [
  { value: '', label: 'All grades' },
  { value: 'preprimary', label: 'Pre-school / Pre-primary' },
  { value: 'grade1onwards', label: 'Grade 1 onwards' },
];

export const DETAIL_SIZES = ['18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46'];

const DEFAULT_COLORS = [{ name: 'White', hex: '#ffffff' }, { name: 'Navy', hex: '#0f172a' }, { name: 'Black', hex: '#1a1a1a' }];

/** Base path for catalog images. BVRTSE uses subfolder bvrtse/ with names like track-pant-blue_1.jpg, sport-tshirt-blue_1.jpg */
const CATALOG_IMAGE_BASE = '/images/catalog';
const B = (path) => `${CATALOG_IMAGE_BASE}/bvrtse/${path}`;

const CATALOG_BY_SLUG = {
  'nanded-city-public': {
    id: 'nanded-city-public',
    name: "Vidya Pratishthan's Nanded City Public School",
    slug: 'nanded-city-public',
    imagePrefix: 'ncp',
    classes: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    categories: [
      {
        id: 'shirts',
        name: 'Shirts',
        products: [
          { id: 's1', name: 'White Full Sleeve Shirt', price: 449, image: `${CATALOG_IMAGE_BASE}/ncp-white-full-sleeve-shirt.jpg`, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Light Blue', hex: '#add8e6' }, { name: 'Cream', hex: '#fffdd0' }] },
          { id: 's2', name: 'White Half Sleeve Shirt', price: 399, image: `${CATALOG_IMAGE_BASE}/ncp-white-half-sleeve-shirt.jpg`, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Light Blue', hex: '#add8e6' }] },
          { id: 's3', name: 'White Formal Shirt (Stretch)', price: 479, image: `${CATALOG_IMAGE_BASE}/ncp-white-formal-shirt-stretch.jpg`, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Cream', hex: '#fffdd0' }] },
          { id: 's4', name: 'White Cotton Poplin Shirt', price: 429, image: `${CATALOG_IMAGE_BASE}/ncp-white-cotton-poplin-shirt.jpg`, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Light Blue', hex: '#add8e6' }] },
        ],
      },
      {
        id: 'pants',
        name: 'Pants / Trousers',
        products: [
          { id: 'p1', name: 'Navy Blue Trousers', price: 599, image: `${CATALOG_IMAGE_BASE}/ncp-navy-blue-trousers.jpg`, sizes: ['28', '30', '32', '34'], colors: [{ name: 'Navy', hex: '#0f172a' }, { name: 'Charcoal', hex: '#36454f' }] },
          { id: 'p2', name: 'Grey Trousers', price: 549, image: `${CATALOG_IMAGE_BASE}/ncp-grey-trousers.jpg`, sizes: ['28', '30', '32', '34'], colors: [{ name: 'Grey', hex: '#6b7280' }, { name: 'Charcoal', hex: '#36454f' }] },
          { id: 'p3', name: 'Navy Blue Track Pants', price: 449, image: `${CATALOG_IMAGE_BASE}/ncp-navy-blue-track-pants.jpg`, sizes: ['28', '30', '32', '34'], colors: [{ name: 'Navy', hex: '#0f172a' }] },
          { id: 'p4', name: 'Black Formal Trousers', price: 579, image: `${CATALOG_IMAGE_BASE}/ncp-black-formal-trousers.jpg`, sizes: ['28', '30', '32', '34'], colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#0f172a' }] },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        products: [
          { id: 'a1', name: 'School Tie', price: 199, image: `${CATALOG_IMAGE_BASE}/ncp-school-tie.jpg` },
          { id: 'a2', name: 'Belt', price: 249, image: `${CATALOG_IMAGE_BASE}/ncp-belt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'a3', name: 'Socks (Pair)', price: 99, image: `${CATALOG_IMAGE_BASE}/ncp-socks-pair.jpg` },
          { id: 'a4', name: 'School Badge / Emblem', price: 49, image: `${CATALOG_IMAGE_BASE}/ncp-school-badge-emblem.jpg` },
        ],
      },
      {
        id: 'shoes',
        name: 'Shoes',
        products: [
          { id: 'sh1', name: 'Black School Shoes', price: 899, image: `${CATALOG_IMAGE_BASE}/ncp-black-school-shoes.jpg`, sizes: ['2', '3', '4', '5', '6'] },
          { id: 'sh2', name: 'Black Leather School Shoes', price: 999, image: `${CATALOG_IMAGE_BASE}/ncp-black-leather-school-shoes.jpg`, sizes: ['2', '3', '4', '5', '6'] },
          { id: 'sh3', name: 'Black Canvas School Shoes', price: 649, image: `${CATALOG_IMAGE_BASE}/ncp-black-canvas-school-shoes.jpg`, sizes: ['2', '3', '4', '5', '6'] },
          { id: 'sh4', name: 'Black Formal School Shoes', price: 1099, image: `${CATALOG_IMAGE_BASE}/ncp-black-formal-school-shoes.jpg`, sizes: ['2', '3', '4', '5', '6'] },
        ],
      },
    ],
  },
  'the-orbis-school': {
    id: 'the-orbis-school',
    name: 'The Orbis School',
    slug: 'the-orbis-school',
    imagePrefix: 'orbis',
    classes: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    categories: [
      {
        id: 'uniform',
        name: 'Regular Uniform',
        products: [
          { id: 'u1', name: 'White Shirt', price: 499, image: `${CATALOG_IMAGE_BASE}/orbis-white-shirt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'u2', name: 'Navy Pants', price: 649, image: `${CATALOG_IMAGE_BASE}/orbis-navy-pants.jpg`, sizes: ['28', '30', '32'] },
          { id: 'u3', name: 'Blazer', price: 1299, image: `${CATALOG_IMAGE_BASE}/orbis-blazer.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'u4', name: 'White Half Sleeve Shirt', price: 429, image: `${CATALOG_IMAGE_BASE}/orbis-white-half-sleeve-shirt.jpg`, sizes: ['S', 'M', 'L'] },
        ],
      },
      {
        id: 'house',
        name: 'House Uniforms',
        products: [
          { id: 'h1', name: 'Red House T-Shirt', price: 349, image: `${CATALOG_IMAGE_BASE}/orbis-red-house-tshirt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'h2', name: 'Blue House T-Shirt', price: 349, image: `${CATALOG_IMAGE_BASE}/orbis-blue-house-tshirt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'h3', name: 'Green House T-Shirt', price: 349, image: `${CATALOG_IMAGE_BASE}/orbis-green-house-tshirt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'h4', name: 'Yellow House T-Shirt', price: 349, image: `${CATALOG_IMAGE_BASE}/orbis-yellow-house-tshirt.jpg`, sizes: ['S', 'M', 'L'] },
        ],
      },
      {
        id: 'sports',
        name: 'Sports Day',
        products: [
          { id: 'sp1', name: 'Sports T-Shirt', price: 299, image: `${CATALOG_IMAGE_BASE}/orbis-sports-tshirt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'sp2', name: 'Sports Shorts', price: 249, image: `${CATALOG_IMAGE_BASE}/orbis-sports-shorts.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'sp3', name: 'Sports Track Pants', price: 349, image: `${CATALOG_IMAGE_BASE}/orbis-sports-track-pants.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'sp4', name: 'Sports Cap', price: 179, image: `${CATALOG_IMAGE_BASE}/orbis-sports-cap.jpg`, sizes: ['One Size'] },
        ],
      },
      {
        id: 'acc',
        name: 'Tie, Belt, Socks',
        products: [
          { id: 'ac1', name: 'School Tie', price: 219, image: `${CATALOG_IMAGE_BASE}/orbis-school-tie.jpg` },
          { id: 'ac2', name: 'Belt', price: 279, image: `${CATALOG_IMAGE_BASE}/orbis-belt.jpg`, sizes: ['S', 'M', 'L'] },
          { id: 'ac3', name: 'Socks (Pair)', price: 119, image: `${CATALOG_IMAGE_BASE}/orbis-socks-pair.jpg` },
          { id: 'ac4', name: 'School Badge', price: 59, image: `${CATALOG_IMAGE_BASE}/orbis-school-badge.jpg` },
        ],
      },
    ],
  },
  'bharati-rabindranath-tagore': {
    id: 'bharati-rabindranath-tagore',
    name: "Bharati Vidyapeeth's Rabindranath Tagore School of Excellence",
    slug: 'bharati-rabindranath-tagore',
    imagePrefix: 'bvrtse',
    classes: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    categories: [
      {
        id: 'shirts-tops',
        name: 'Shirts & Tops',
        products: [
          { id: 'bp1', name: 'White Shirt (Unisex)', price: 459, image: B('WHITE_SHIRT_UNISEX_2.jpeg'), images: [B('WHITE_SHIRT_UNISEX_2.jpeg'), B('WHITE_SHIRT_UNISEX_1.png')], sizes: ['S', 'M', 'L', 'XL'] },
          { id: 'bp2', name: 'Blazer', price: 1299, image: B('blazer_2.png'), images: [B('blazer_2.png'), B('blazer_1.jpg')], sizes: ['S', 'M', 'L', 'XL'] },
          { id: 'bp3', name: 'Hoodies', price: 599, image: B('HOODIES_2.jpeg'), images: [B('HOODIES_2.jpeg'), B('HOODIES_1.jpg')], sizes: ['S', 'M', 'L', 'XL'] },
        ],
      },
      {
        id: 'pants-trousers',
        name: 'Pants & Trousers',
        products: [
          { id: 'bp4', name: 'Full Pant (Grey)', price: 579, image: B('FULL_PANT_GREY2.jpeg'), images: [B('FULL_PANT_GREY2.jpeg'), B('FULL_PANT_GERY_1.jpg')], sizes: ['28', '30', '32', '34'] },
          { id: 'bp5', name: 'Half Pant', price: 449, image: B('HALF_PANT_2.jpeg'), images: [B('HALF_PANT_2.jpeg'), B('HALF_PANT_1.jpg')], sizes: ['28', '30', '32', '34'] },
          {
            id: 'bp6',
            name: 'Track Pant',
            price: 499,
            image: B('track-pant-blue_2.jpeg'),
            sizes: ['28', '30', '32', '34'],
            colors: [{ name: 'Blue', hex: '#2563eb' }, { name: 'Red', hex: '#dc2626' }, { name: 'Green', hex: '#16a34a' }, { name: 'Yellow', hex: '#eab308' }],
            imagesByColor: {
              Blue:   [B('track-pant-blue_2.jpeg'),   B('track-pant-blue_1.jpg')],
              Red:    [B('track-pant-red_2.jpeg'),    B('track-pant-red_1.jpg')],
              Green:  [B('track-pant-green_2.jpeg'),  B('track-pant-green_1.jpg')],
              Yellow: [B('track-pant-yellow_2.jpeg'), B('track-pant-yellow_1.jpg')],
            },
          },
        ],
      },
      {
        id: 'pre-primary',
        name: 'Pre-Primary',
        products: [
          { id: 'bp7', name: 'Pre-Primary Skirt (Navy)', price: 429, image: B('PRE-PRIMARY_SKIRT_NAVY_2.jpeg'), images: [B('PRE-PRIMARY_SKIRT_NAVY_2.jpeg'), B('PRE-PRIMARY_SKIRT_NAVY_1.jpg')], sizes: ['S', 'M', 'L'] },
          { id: 'bp8', name: 'Pre-Primary Short (Navy)', price: 399, image: B('PRE-PRIMARY_SHORT_NAVY_2.jpeg'), images: [B('PRE-PRIMARY_SHORT_NAVY_2.jpeg'), B('PRE-PRIMARY_SHORT_NAVY_1.jpg')], sizes: ['S', 'M', 'L'] },
          { id: 'bp9', name: 'Pre-Primary CTS', price: 349, image: B('PRE-PRIMARY_CTS_2.jpeg'), images: [B('PRE-PRIMARY_CTS_2.jpeg'), B('PRE-PRIMARY_CTS_1.jpg')], sizes: ['S', 'M', 'L'] },
        ],
      },
      {
        id: 'skirts',
        name: 'Skirts',
        products: [
          { id: 'bp10', name: 'Divided Skirt', price: 479, image: B('DIVIDED_SKIRT_2.jpeg'), images: [B('DIVIDED_SKIRT_2.jpeg'), B('DIVIDED_SKIRT_1.jpg')], sizes: ['S', 'M', 'L'] },
        ],
      },
      {
        id: 'sports',
        name: 'Sports',
        products: [
          {
            id: 'bp11',
            name: 'Sport T-Shirt',
            price: 349,
            image: B('Sport_T-Shirt_Blue_12.png'),
            sizes: ['S', 'M', 'L'],
            colors: [{ name: 'Blue', hex: '#2563eb' }, { name: 'Red', hex: '#dc2626' }, { name: 'Green', hex: '#16a34a' }, { name: 'Yellow', hex: '#eab308' }],
            imagesByColor: {
              Blue:   [B('Sport_T-Shirt_Blue_12.png'),   B('Sport_T-Shirt_Blue_11.png')],
              Red:    [B('Sport_T-Shirt_Red_12.png'),    B('Sport_T-Shirt_Red_11.png')],
              Green:  [B('Sport_T-Shirt_Green_12.png'),  B('Sport_T-Shirt_Green_11.png')],
              Yellow: [B('Sport_T-Shirt_Yellow_12.png'), B('Sport_T-Shirt_Yellow_11.png')],
            },
          },
          { id: 'bp12', name: 'Cap', price: 179, image: B('CAP_1.jpg'), images: [B('CAP_1.jpg')], sizes: ['One Size'] },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        products: [
          { id: 'ba1', name: 'Tie', price: 189, image: B('Tie_2.jpeg'), images: [B('Tie_2.jpeg'), B('Tie_1.png')] },
          { id: 'ba2', name: 'Regular Tie', price: 219, image: B('REGULAR_TIE_2.jpeg'), images: [B('REGULAR_TIE_2.jpeg'), B('REGULAR_TIE_1.png')] },
          { id: 'ba3', name: 'Belt', price: 229, image: B('Belt_2.jpeg'), images: [B('Belt_2.jpeg'), B('belt_1.JPG')] },
          { id: 'ba4', name: 'Socks', price: 89, image: B('Bvrtse_Socks_1.png'), images: [B('Bvrtse_Socks_1.png')] },
          { id: 'ba5', name: 'Velcro', price: 99, image: B('Velcro_2.jpeg'), images: [B('Velcro_2.jpeg'), B('velcro_1.JPG')] },
        ],
      },
      {
        id: 'shoes',
        name: 'Shoes',
        products: [
          { id: 'bs1', name: 'School Shoes', price: 899, image: B('LESS_SHOES_2.jpeg'), images: [B('LESS_SHOES_2.jpeg'), B('LESS_SHOES_1.JPG')], sizes: ['2', '3', '4', '5', '6', '7'] },
        ],
      },
    ],
  },
};

export function getSchoolCatalog(slug) {
  const normalized = typeof slug === 'string' ? slug : (Array.isArray(slug) ? slug[slug.length - 1] : '');
  return CATALOG_BY_SLUG[normalized] ?? null;
}

export function getAllSchoolSlugs() {
  return Object.keys(CATALOG_BY_SLUG);
}

export function getProductColors(product) {
  if (product?.colors?.length) return product.colors;
  return DEFAULT_COLORS;
}

/**
 * Returns array of image URLs for a product. Uses imagesByColor when product has colors and colorName is set;
 * otherwise uses product.images or [product.image]. Used for gallery and for correct variant image in cart/detail.
 * Case-insensitive color matching to handle differences between local and production environments.
 */
export function getProductImages(product, colorName) {
  if (!product) return [];
  if (product.imagesByColor && colorName) {
    // Case-insensitive lookup
    const lowerColorName = colorName.toLowerCase();
    const matchingKey = Object.keys(product.imagesByColor).find(
      (k) => k.toLowerCase() === lowerColorName
    );
    if (matchingKey && product.imagesByColor[matchingKey]?.length) {
      return product.imagesByColor[matchingKey];
    }
  }
  if (Array.isArray(product.images) && product.images.length) return product.images;
  if (product.image) return [product.image];
  return [];
}

/**
 * Optional: get image path for a specific color variant.
 * Use when you have separate images per color, e.g. ncp-white-full-sleeve-shirt.jpg, ncp-light-blue-full-sleeve-shirt.jpg
 * @param {Object} product - catalog product
 * @param {string} schoolSlug - e.g. 'nanded-city-public'
 * @param {string} colorName - e.g. 'White', 'Light Blue'
 * @returns {string} path like /images/catalog/ncp-light-blue-full-sleeve-shirt.jpg
 */
export function getProductImageForColor(product, schoolSlug, colorName) {
  const school = CATALOG_BY_SLUG[schoolSlug];
  const prefix = school?.imagePrefix || schoolSlug.replace(/-/g, '').slice(0, 4);
  const slug = (product?.name || '')
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const colorSlug = (colorName || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const name = colorSlug ? `${prefix}-${colorSlug}-${slug}` : `${prefix}-${slug}`;
  return `${CATALOG_IMAGE_BASE}/${name}.jpg`;
}

export function productMatchesGradeFilter(product, gradeFilterValue) {
  if (!gradeFilterValue) return true;
  const classes = product.classes;
  if (!classes || classes.length === 0) return true;
  if (gradeFilterValue === 'preprimary') return classes.some((c) => PRE_PRIMARY_CLASSES.includes(c));
  if (gradeFilterValue === 'grade1onwards') return classes.some((c) => GRADE_1_ONWARDS_CLASSES.includes(c));
  return false;
}

export { DEFAULT_CLASSES };
