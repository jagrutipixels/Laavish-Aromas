/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: number;
  name: string;
  notes: string;
  description: string;
  price: number;
  image: string;
  category: 'Signature' | 'Trending' | 'New' | 'Limited';
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oud Royal",
    notes: "Woody • Oriental • Bold",
    description: "A majestic blend of Cambodian Oud and rare spices, designed for those who command presence. Long-lasting and deeply resonant with notes of leather and saffron.",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80",
    category: 'Signature',
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: "Velvet Rose",
    notes: "Floral • Sweet • Delicate",
    description: "Capturing the morning dew on a Damask rose. A soft, romantic fragrance with hints of vanilla, white musk, and a touch of pink pepper.",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80",
    category: 'Signature',
    rating: 4.8,
    reviews: 94
  },
  {
    id: 3,
    name: "Midnight Musk",
    notes: "Earthy • Spicy • Intense",
    description: "An enigmatic scent that comes alive after dark. Dark patchouli meets black pepper and sensual musk for an unforgettable trail.",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80",
    category: 'Trending',
    rating: 4.7,
    reviews: 210
  },
  {
    id: 4,
    name: "Saffron Gold",
    notes: "Spicy • Warm • Opulent",
    description: "The 'Red Gold' of spices blended with amber and cedarwood. A warm embrace of luxury that feels like liquid gold on the skin.",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80",
    category: 'Trending',
    rating: 5.0,
    reviews: 56
  },
  {
    id: 5,
    name: "Azure Breeze",
    notes: "Fresh • Marine • Citrus",
    description: "Inspired by the Mediterranean coast. Crisp sea salt, bergamot, and sun-drenched neroli. A breath of fresh air in a bottle.",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80",
    category: 'New',
    rating: 4.6,
    reviews: 42
  },
  {
    id: 6,
    name: "Amber Nights",
    notes: "Sweet • Balsamic • Rich",
    description: "A rich, honeyed amber base with whispers of labdanum and tonka bean. Perfect for cold winter evenings and intimate gatherings.",
    price: 130.00,
    image: "https://images.unsplash.com/photo-1616948055599-960ce0649512?auto=format&fit=crop&q=80",
    category: 'New',
    rating: 4.9,
    reviews: 88
  },
  {
    id: 7,
    name: "Desert Bloom",
    notes: "Floral • Dry • Exotic",
    description: "A rare cactus flower accord mixed with dry sandalwood and white amber. Captures the unexpected beauty of the desert.",
    price: 115.00,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80",
    category: 'New',
    rating: 4.7,
    reviews: 34
  },
  {
    id: 8,
    name: "Imperial Jasmine",
    notes: "Floral • Green • Elegant",
    description: "Pure Sambac jasmine petals layered over green tea and white woods. The ultimate expression of floral elegance.",
    price: 105.00,
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80",
    category: 'Signature',
    rating: 4.8,
    reviews: 72
  },
  {
    id: 9,
    name: "Solar Citrus",
    notes: "Citrus • Bright • Energetic",
    description: "A burst of Sicilian lemon, blood orange, and sparkling grapefruit. An energetic scent that radiates sunshine.",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80",
    category: 'Trending',
    rating: 4.5,
    reviews: 112
  },
  {
    id: 10,
    name: "Black Orchid",
    notes: "Floral • Dark • Mysterious",
    description: "A deep, dark floral heart of black orchid and lotus, grounded by patchouli and dark chocolate. Intensely seductive.",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80",
    category: 'Limited',
    rating: 4.9,
    reviews: 45
  }
];
