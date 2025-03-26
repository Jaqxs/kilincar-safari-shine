
/**
 * Dummy data for KilinCar app
 */

// Vehicle types
export const vehicleTypes = [
  {
    id: 'sedan',
    name: 'Sedan',
    icon: 'car',
    description: 'Standard 4-door sedan',
    basePrice: 10000, // in TZS
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: 'truck',
    description: 'Sport Utility Vehicle',
    basePrice: 15000, // in TZS
  },
  {
    id: 'pickup',
    name: 'Pickup',
    icon: 'car',
    description: 'Pickup truck',
    basePrice: 17000, // in TZS
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: 'car',
    description: 'Premium luxury vehicle',
    basePrice: 25000, // in TZS
  },
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    icon: 'bike',
    description: 'Motorcycles and scooters',
    basePrice: 7000, // in TZS
  },
];

// Service packages
export const servicePackages = [
  {
    id: 'basic',
    name: 'Basic Wash',
    description: 'Exterior wash, wheels cleaning, and dry',
    features: [
      'Exterior hand wash',
      'Wheel cleaning',
      'Tire dressing',
      'Hand drying',
      'Dust removal'
    ],
    priceMultiplier: 1,
    duration: 30, // minutes
    icon: 'droplets',
    color: 'savannah'
  },
  {
    id: 'premium',
    name: 'Premium Wash',
    description: 'Basic wash plus interior vacuum, window cleaning, and tire shine',
    features: [
      'All Basic Wash services',
      'Interior vacuum',
      'Window cleaning',
      'Premium tire shine',
      'Dashboard dusting'
    ],
    priceMultiplier: 1.7,
    duration: 60, // minutes
    icon: 'sparkles',
    color: 'tanzanite'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Wash',
    description: 'Premium wash plus waxing, upholstery cleaning, and dashboard care',
    features: [
      'All Premium Wash services',
      'Car waxing',
      'Upholstery cleaning',
      'Dashboard conditioning',
      'Air freshener'
    ],
    priceMultiplier: 2.5,
    duration: 90, // minutes
    icon: 'star',
    color: 'clay'
  },
  {
    id: 'mud-buster',
    name: 'Mud Buster',
    description: 'Special package for rainy season with underbody cleaning',
    features: [
      'Extra strong exterior wash',
      'Underbody cleaning',
      'Rust protection',
      'Mud removal from hard-to-reach areas',
      'Extra tire cleaning'
    ],
    priceMultiplier: 1.8,
    duration: 75, // minutes
    icon: 'cloud-rain',
    color: 'kilimanjaro',
    seasonal: true,
    seasonType: 'rainy'
  },
  {
    id: 'waterless',
    name: 'Waterless Wash',
    description: 'Eco-friendly wash using biodegradable sprays',
    features: [
      'No water used',
      'Biodegradable cleaning sprays',
      'Environmental friendly',
      'Works for light to medium dirt',
      'Includes hand wax'
    ],
    priceMultiplier: 1.3,
    duration: 45, // minutes
    icon: 'droplet-slash',
    color: 'safari',
    eco: true
  }
];

// Luxury add-ons
export const luxuryAddOns = [
  {
    id: 'uv-protection',
    name: 'UV Protection Coating',
    description: 'Protect your paint from harsh sunlight',
    price: 35000, // in TZS
    duration: 60, // additional minutes
    icon: 'sun'
  },
  {
    id: 'ceramic-coating',
    name: 'Eco-Ceramic Detailing',
    description: 'Premium eco-friendly ceramic coating',
    price: 90000, // in TZS
    duration: 120, // additional minutes
    icon: 'gem'
  },
  {
    id: 'leather-care',
    name: 'Leather Treatment',
    description: 'Special care for leather interiors',
    price: 25000, // in TZS
    duration: 45, // additional minutes
    icon: 'armchair'
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    description: 'Make old headlights look new again',
    price: 20000, // in TZS
    duration: 30, // additional minutes
    icon: 'flashlight'
  }
];

// Locations
export const locations = [
  {
    id: 'dar-central',
    name: 'Dar es Salaam Central',
    address: 'Msasani Peninsula, Dar es Salaam',
    coordinates: { lat: -6.7654, lng: 39.2583 },
    openingHours: '7:00 AM - 8:00 PM',
    phone: '+255 123 456 789',
    services: ['basic', 'premium', 'deluxe', 'mud-buster', 'waterless'],
    busy: false
  },
  {
    id: 'dar-mbezi',
    name: 'Mbezi Beach',
    address: 'Mbezi Beach Area, Dar es Salaam',
    coordinates: { lat: -6.7242, lng: 39.2191 },
    openingHours: '7:30 AM - 7:00 PM',
    phone: '+255 987 654 321',
    services: ['basic', 'premium', 'deluxe', 'waterless'],
    busy: true
  },
  {
    id: 'arusha',
    name: 'Arusha City',
    address: 'Central Arusha, near Clock Tower',
    coordinates: { lat: -3.3667, lng: 36.6833 },
    openingHours: '8:00 AM - 6:00 PM',
    phone: '+255 111 222 333',
    services: ['basic', 'premium', 'deluxe', 'waterless'],
    busy: false
  },
  {
    id: 'mwanza',
    name: 'Mwanza',
    address: 'Rock City Mall, Mwanza',
    coordinates: { lat: -2.5167, lng: 32.9000 },
    openingHours: '8:00 AM - 7:00 PM',
    phone: '+255 444 555 666',
    services: ['basic', 'premium', 'mud-buster'],
    busy: false
  },
  {
    id: 'mobile-unit-1',
    name: 'Mobile Unit 1',
    address: 'Varies daily - Currently: Kigamboni',
    coordinates: { lat: -6.8234, lng: 39.3085 },
    openingHours: '9:00 AM - 5:00 PM',
    phone: '+255 777 888 999',
    services: ['basic', 'premium', 'waterless'],
    mobile: true,
    busy: false
  }
];

// Rewards items
export const rewardsItems = [
  {
    id: 'free-basic',
    name: 'Free Basic Wash',
    description: 'Redeem for a free basic wash service',
    points: 500,
    category: 'service'
  },
  {
    id: 'free-premium',
    name: 'Free Premium Wash',
    description: 'Redeem for a free premium wash service',
    points: 800,
    category: 'service'
  },
  {
    id: 'discount-50',
    name: '50% Discount',
    description: '50% off your next wash service',
    points: 300,
    category: 'discount'
  },
  {
    id: 'car-mat',
    name: 'Artisanal Car Mat',
    description: 'Handcrafted Tanzanian car mat',
    points: 1200,
    category: 'product'
  },
  {
    id: 'air-freshener',
    name: 'Tanzanian Spice Air Freshener',
    description: 'Unique air freshener with Tanzanian spices',
    points: 200,
    category: 'product'
  }
];

// Weather data
export const weatherConditions = [
  {
    id: 'sunny',
    name: 'Sunny',
    icon: 'sun',
    washRecommendation: 'Great day for a wash! The sun will help your car dry quickly.',
    recommendedPackage: 'deluxe'
  },
  {
    id: 'cloudy',
    name: 'Cloudy',
    icon: 'cloud',
    washRecommendation: 'Good day for washing with less water evaporation.',
    recommendedPackage: 'premium'
  },
  {
    id: 'rainy',
    name: 'Rainy',
    icon: 'cloud-rain',
    washRecommendation: 'Consider our Mud Buster package to deal with rainwater and mud.',
    recommendedPackage: 'mud-buster'
  },
  {
    id: 'dust-storm',
    name: 'Dust Storm',
    icon: 'wind',
    washRecommendation: 'Wait until the dust settles before washing.',
    recommendedPackage: null
  },
  {
    id: 'post-dust',
    name: 'Post Dust Storm',
    icon: 'sun',
    washRecommendation: 'Perfect time for a wash to remove settled dust!',
    recommendedPackage: 'basic'
  }
];

// Dummy user data
export const dummyUser = {
  id: 'user123',
  name: 'John Nyerere',
  email: 'john@example.com',
  phone: '+255 123 456 789',
  points: 450,
  memberSince: '2023-01-15',
  vehicles: [
    {
      id: 'v1',
      type: 'sedan',
      name: 'Toyota Corolla',
      licensePlate: 'T 123 ABC'
    },
    {
      id: 'v2',
      type: 'suv',
      name: 'Nissan X-Trail',
      licensePlate: 'T 456 XYZ'
    }
  ],
  washHistory: [
    {
      id: 'w1',
      date: '2023-08-10',
      service: 'premium',
      vehicle: 'v1',
      location: 'dar-central',
      price: 25000
    },
    {
      id: 'w2',
      date: '2023-07-22',
      service: 'basic',
      vehicle: 'v2',
      location: 'dar-mbezi',
      price: 18000
    },
    {
      id: 'w3',
      date: '2023-06-15',
      service: 'mud-buster',
      vehicle: 'v2',
      location: 'dar-central',
      price: 28000
    }
  ]
};

// Payment methods
export const paymentMethods = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: 'smartphone',
    color: 'green'
  },
  {
    id: 'tigo-pesa',
    name: 'Tigo Pesa',
    icon: 'smartphone',
    color: 'blue'
  },
  {
    id: 'airtel-money',
    name: 'Airtel Money',
    icon: 'smartphone',
    color: 'red'
  },
  {
    id: 'cash',
    name: 'Cash',
    icon: 'banknote',
    color: 'gray'
  }
];

// Time slots for appointments
export const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00'
];

// Current weather (would be fetched from API in a real app)
export const currentWeather = {
  condition: 'sunny',
  temperature: 31, // celsius
  humidity: 65,
  recommendation: 'Great day for a car wash!',
  seasonType: 'dry' // 'dry' or 'rainy'
};
