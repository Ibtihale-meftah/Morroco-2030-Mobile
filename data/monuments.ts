export interface Monument {
  id: string;
  name: string;
  cityId: string;
  description: string;
  hours: string;
  price: string;
  location: string; // Google Maps link or coordinates
  photos: string[]; // URLs
}

export const monuments: Monument[] = [
  {
    id: 'hassan2',
    name: 'Mosquée Hassan II',
    cityId: 'casablanca',
    description: 'La plus grande mosquée du Maroc et l\'une des plus grandes au monde.',
    hours: '9h-12h, 14h-18h',
    price: 'Gratuit pour les non-musulmans',
    location: 'https://maps.google.com/?q=Mosquée+Hassan+II',
    photos: ['https://example.com/hassan2.jpg'],
  },
  {
    id: 'jemaa',
    name: 'Place Jemaa el-Fna',
    cityId: 'marrakech',
    description: 'Place principale animée avec des marchands, des musiciens et des charmeurs de serpents.',
    hours: 'Toute la journée',
    price: 'Gratuit',
    location: 'https://maps.google.com/?q=Place+Jemaa+el-Fna',
    photos: ['https://example.com/jemaa.jpg'],
  },
  {
    id: 'oudayas',
    name: 'Kasbah des Oudayas',
    cityId: 'rabat',
    description: 'Ancien quartier fortifié avec des jardins andalous.',
    hours: '9h-17h',
    price: '10 MAD',
    location: 'https://maps.google.com/?q=Kasbah+des+Oudayas',
    photos: ['https://example.com/oudayas.jpg'],
  },
  {
    id: 'medinafes',
    name: 'Médina de Fès',
    cityId: 'fes',
    description: 'Le plus grand quartier médiéval intact au monde.',
    hours: 'Toute la journée',
    price: 'Gratuit',
    location: 'https://maps.google.com/?q=Médina+de+Fès',
    photos: ['https://example.com/medinafes.jpg'],
  },
  {
    id: 'capspatel',
    name: 'Cap Spartel',
    cityId: 'tanger',
    description: 'Point où la Méditerranée rencontre l\'Atlantique.',
    hours: 'Toute la journée',
    price: 'Gratuit',
    location: 'https://maps.google.com/?q=Cap+Spartel',
    photos: ['https://example.com/capspatel.jpg'],
  },
  {
    id: 'agadirbeach',
    name: 'Plages d\'Agadir',
    cityId: 'agadir',
    description: 'Magnifiques plages de sable fin sur la côte atlantique.',
    hours: 'Toute la journée',
    price: 'Gratuit',
    location: 'https://maps.google.com/?q=Plages+Agadir',
    photos: ['https://example.com/agadirbeach.jpg'],
  },
];