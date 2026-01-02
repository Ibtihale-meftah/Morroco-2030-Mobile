export interface City {
  id: string;
  name: string;
  description: string;
  history: string;
  specialties: string[];
  climate: string;
  languages: string[];
  tips: string[];
  image?: string;
}

export const cities: City[] = [
  {
    id: "casablanca",
    name: "Casablanca",
    description:
      "Casablanca est la plus grande ville du Maroc. C’est le centre économique du pays et une ville très moderne. Vous y trouvez un mélange entre architecture Art déco, quartiers d’affaires, corniche et plages. La ville est aussi connue pour sa vie nocturne, ses cafés, ses centres commerciaux et son tramway pratique.",
    history:
      "Le site était connu sous le nom d’Anfa. La ville s’est développée fortement au 19ème et 20ème siècle, surtout pendant le protectorat français. Casablanca est devenue un grand port et un pôle industriel. Aujourd’hui, elle reste la porte d’entrée business du Maroc, avec une identité urbaine très marquée.",
    specialties: ["Fruits de mer", "Poisson grillé", "Pastilla", "Couscous", "Thé à la menthe"],
    climate: "Océanique à influence méditerranéenne, doux en hiver, chaud et humide en été.",
    languages: ["Arabe", "Français", "Amazigh"],
    tips: [
      "Visitez la Mosquée Hassan II tôt le matin pour éviter l’affluence",
      "Marchez sur la Corniche d’Aïn Diab au coucher du soleil",
      "Explorez le centre-ville Art déco autour du boulevard Mohammed V",
      "Utilisez le tramway pour vous déplacer facilement",
      "Prévoyez une veste légère le soir, même en été",
    ],
    image: "https://sl.bing.net/fAt4oUtUT48",
  },
  {
    id: "rabat",
    name: "Rabat",
    description:
      "Rabat est la capitale administrative du Maroc. La ville est calme, propre et très agréable à visiter. Vous y trouvez des sites historiques, des jardins, une corniche et des musées. Rabat mélange patrimoine, quartiers modernes et ambiance côtière, avec de bons déplacements en tramway.",
    history:
      "Rabat a joué un rôle important sous les Almohades. Elle est devenue capitale moderne au début du 20ème siècle. Son patrimoine inclut la Kasbah des Oudayas, la Tour Hassan et des monuments royaux. Aujourd’hui, Rabat est un centre politique et culturel, avec une qualité de vie reconnue.",
    specialties: ["Harira", "Poisson", "Pastilla", "Cornes de gazelle", "Thé à la menthe"],
    climate: "Tempéré océanique, étés chauds mais supportables, hivers doux.",
    languages: ["Arabe", "Français", "Amazigh"],
    tips: [
      "Visitez la Tour Hassan et le Mausolée Mohammed V le même jour",
      "Baladez-vous dans la Kasbah des Oudayas et ses ruelles bleues et blanches",
      "Passez par Chellah en fin d’après-midi pour une visite plus calme",
      "Profitez de la corniche et de la marina pour une pause",
      "Utilisez le tramway pour relier Rabat et Salé rapidement",
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rabat_Kasbah_Oudayas_%282%29.jpg",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    description:
      "Marrakech est une ville très vivante et touristique. Elle est connue pour sa médina, ses souks, ses palais et ses riads. L’ambiance est intense autour de Jemaa el-Fna, surtout le soir. Vous pouvez aussi découvrir des quartiers modernes comme Guéliz, des jardins et des excursions vers l’Atlas.",
    history:
      "Fondée au 11ème siècle, Marrakech a été une capitale majeure de dynasties marocaines. Son patrimoine inclut des remparts, des palais, des tombeaux et des jardins historiques. La ville reste un centre culturel important, avec artisanat, festivals et traditions très présentes.",
    specialties: ["Tanjia marrakchia", "Tajine aux pruneaux", "Couscous", "Jus d’orange frais", "Thé à la menthe"],
    climate: "Semi-aride, très chaud en été, doux en hiver, soirées parfois fraîches.",
    languages: ["Arabe", "Amazigh", "Français", "Anglais"],
    tips: [
      "Visitez Jemaa el-Fna en journée puis le soir pour voir la différence",
      "Négociez dans les souks, mais fixez un budget avant d’acheter",
      "Réservez le Jardin Majorelle à l’avance quand c’est possible",
      "Prévoyez de l’eau, un chapeau et de la crème solaire en été",
      "Choisissez un guide officiel si vous voulez une visite historique détaillée",
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Jemaa_el-Fnaa_at_night_-_Maroco_-_Marrakesh.jpg",
  },
  {
    id: "tanger",
    name: "Tanger",
    description:
      "Tanger est une ville du nord ouverte sur l’Europe. Elle a une ambiance cosmopolite, entre médina, cafés historiques et front de mer. Vous profitez de points de vue sur le détroit de Gibraltar, de plages proches et d’excursions vers Cap Spartel et les Grottes d’Hercule.",
    history:
      "Tanger a connu plusieurs influences et a eu un statut international au 20ème siècle. Cette histoire a attiré artistes, écrivains et diplomates. Aujourd’hui, la ville se modernise rapidement tout en gardant une médina active et un héritage culturel fort.",
    specialties: ["Poisson frais", "Fruits de mer", "Harira", "Pâtisseries marocaines", "Thé à la menthe"],
    climate: "Méditerranéen océanique, hivers humides, étés doux comparés au sud.",
    languages: ["Arabe", "Français", "Espagnol", "Anglais"],
    tips: [
      "Allez à Cap Spartel pour le panorama océan et détroit",
      "Visitez la Kasbah et le musée pour comprendre l’histoire de la ville",
      "Marchez sur la corniche pour une promenade simple et sûre",
      "Faites une sortie aux Grottes d’Hercule tôt pour éviter les groupes",
      "Prévoyez un coupe-vent, surtout en bord de mer",
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cap_Spartel%2C_Tangier%2C_Morocco_-_panoramio.jpg",
  },
  {
    id: "agadir",
    name: "Agadir",
    description:
      "Agadir est une grande station balnéaire sur la côte atlantique. La ville est connue pour sa longue plage, sa promenade, ses activités nautiques et son ambiance détente. Vous y trouvez aussi un grand souk, des restaurants de poissons et des points de vue depuis les hauteurs.",
    history:
      "Agadir a été reconstruite après le tremblement de terre de 1960. Cette reconstruction explique son urbanisme moderne et ses grands axes. La région du Souss est aussi connue pour sa culture amazighe, son artisanat et ses produits à base d’argan.",
    specialties: ["Poisson grillé", "Fruits de mer", "Amlou", "Tajine de poisson", "Huile d’argan"],
    climate: "Doux et ensoleillé presque toute l’année, brise océanique fréquente.",
    languages: ["Arabe", "Amazigh", "Français"],
    tips: [
      "Choisissez la matinée pour la plage si vous voulez moins de vent",
      "Visitez le Souk El Had pour acheter épices et produits locaux",
      "Testez le surf ou le bodyboard sur les spots proches",
      "Montez vers Agadir Oufella pour la vue panoramique",
      "Goûtez les plats de poisson dans les restaurants du front de mer",
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Agadir_beach%2C_Morocco.JPG",
  },
  {
    id: "fes",
    name: "Fès",
    description:
      "Fès est une ville impériale très riche culturellement. Sa médina est l’une des plus grandes du monde et elle est connue pour ses ruelles, ses artisans, ses médersas et ses souks. Vous y vivez une expérience traditionnelle forte, avec un patrimoine religieux et universitaire important.",
    history:
      "Fondée au 9ème siècle, Fès a été un grand centre intellectuel et spirituel. La ville a gardé une médina historique très active. Elle abrite l’Université Al Quaraouiyine, souvent citée parmi les plus anciennes institutions d’enseignement, et un artisanat réputé comme le cuir et la céramique.",
    specialties: ["Pastilla de Fès", "Seffa", "Tajine", "Zaalouk", "Pâtisseries marocaines"],
    climate: "Continental, hivers frais et parfois froids, étés chauds et secs.",
    languages: ["Arabe", "Amazigh", "Français"],
    tips: [
      "Prenez un guide officiel pour éviter de vous perdre dans la médina",
      "Visitez les médersas Bou Inania ou Attarine pour l’architecture",
      "Allez aux tanneries tôt et prenez de la menthe pour l’odeur",
      "Portez des chaussures confortables, vous allez beaucoup marcher",
      "Prévoyez un pull en hiver, surtout le matin et le soir",
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fez_Chouara_Tannery_%2854237913722%29.jpg",
  },
];
