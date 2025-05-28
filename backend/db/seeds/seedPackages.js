const mongoose = require('mongoose');
const Package = require('../models/packageModel');
require('dotenv').config();

const travelPackages = [
  {
    name: "Mumbai Heritage Explorer",
    description: "Discover Mumbai's iconic landmarks including Gateway of India, Marine Drive, and Elephanta Caves. Perfect introduction to the city's rich colonial heritage and vibrant culture.",
    image: "https://mediaindia.eu/wp-content/uploads/2020/01/sarang-pande-k3SHcT9zGkE-unsplash-e1578503286127-800x800.jpg",
    duration: 3,
    price: 8500,
    inclusions: [
      "Accommodation for 2 nights",
      "Breakfast and dinner",
      "Ferry tickets to Elephanta Caves",
      "Local transportation",
      "Professional guide",
      "Entry fees to monuments"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        description: "Arrival and South Mumbai exploration",
        activities: ["Check-in to hotel", "Visit Gateway of India", "Explore Colaba Causeway", "Evening at Marine Drive"]
      },
      {
        day: 2,
        description: "Elephanta Caves and local markets",
        activities: ["Ferry to Elephanta Island", "Explore ancient caves", "Return to Mumbai", "Shopping at Crawford Market"]
      },
      {
        day: 3,
        description: "City tour and departure",
        activities: ["Visit Hanging Gardens", "Explore Dhobi Ghat", "Last-minute shopping", "Departure"]
      }
    ],
    category: "Heritage",
    groupType: "Family",
    maxGroupSize: 15,
    difficulty: "Easy",
    destination: "68360751b433f4991ec48170"
  },
  {
    name: "Romantic Mumbai Getaway",
    description: "A perfect 2-day romantic escape featuring sunset walks at Marine Drive, private dinner with Gateway of India views, and cozy moments in Mumbai's most scenic spots.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Marine_Drive_Skyline.jpg",
    duration: 2,
    price: 12000,
    inclusions: [
      "Luxury hotel accommodation",
      "Candlelight dinner",
      "Private transportation",
      "Couple photography session",
      "Welcome drinks",
      "Breakfast"
    ],
    exclusions: [
      "Airfare",
      "Lunch",
      "Personal shopping",
      "Spa services",
      "Room service"
    ],
    itinerary: [
      {
        day: 1,
        description: "Arrival and romantic evening",
        activities: ["Hotel check-in", "Sunset at Marine Drive", "Romantic dinner at hotel", "Night walk at Gateway of India"]
      },
      {
        day: 2,
        description: "City exploration and departure",
        activities: ["Couple photography session", "Visit Hanging Gardens", "Shopping at Linking Road", "Departure"]
      }
    ],
    category: "Romance",
    groupType: "Couple",
    maxGroupSize: 2,
    difficulty: "Easy",
    destination: "68360751b433f4991ec48170"
  },
  {
    name: "Delhi Capital Discovery",
    description: "Comprehensive 4-day exploration of India's capital, covering Red Fort, India Gate, Qutub Minar, and both Old and New Delhi's treasures.",
    image: "https://static.toiimg.com/thumb/65666850/redfort1.jpg?width=1200&height=900",
    duration: 4,
    price: 15000,
    inclusions: [
      "3 nights accommodation",
      "All meals",
      "AC transportation",
      "Professional guide",
      "Monument entry fees",
      "Metro card"
    ],
    exclusions: [
      "Airfare/train fare",
      "Personal expenses",
      "Shopping",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        description: "Old Delhi exploration",
        activities: ["Arrival and check-in", "Red Fort visit", "Jama Masjid tour", "Chandni Chowk rickshaw ride", "Spice market exploration"]
      },
      {
        day: 2,
        description: "New Delhi highlights",
        activities: ["India Gate visit", "Rashtrapati Bhavan drive", "Lotus Temple", "Humayun's Tomb", "Connaught Place shopping"]
      },
      {
        day: 3,
        description: "Historical monuments",
        activities: ["Qutub Minar complex", "Iron Pillar", "Safdarjung Tomb", "National Museum", "Lodhi Gardens"]
      },
      {
        day: 4,
        description: "Cultural immersion and departure",
        activities: ["Akshardham Temple", "Craft market visit", "Last-minute shopping", "Departure"]
      }
    ],
    category: "Cultural",
    groupType: "Family",
    maxGroupSize: 20,
    difficulty: "Moderate",
    destination: "68360751b433f4991ec48171"
  },
  {
    name: "Bangalore Garden City Experience",
    description: "Explore Bangalore's green spaces, royal palaces, and modern attractions. Perfect blend of nature, history, and contemporary culture in India's Silicon Valley.",
    image: "https://sceneloc8.com/wp-content/uploads/2024/03/Lalbagh-Botanical-Garden-4.png",
    duration: 3,
    price: 9500,
    inclusions: [
      "2 nights hotel stay",
      "Breakfast and dinner",
      "Local sightseeing",
      "Garden entry fees",
      "Palace tour",
      "Transportation"
    ],
    exclusions: [
      "Airfare",
      "Lunch",
      "Personal expenses",
      "Bar bills",
      "Laundry"
    ],
    itinerary: [
      {
        day: 1,
        description: "Gardens and parks",
        activities: ["Arrival and check-in", "Lalbagh Botanical Garden", "Glass House visit", "Cubbon Park evening walk"]
      },
      {
        day: 2,
        description: "Royal heritage",
        activities: ["Bangalore Palace tour", "Tipu Sultan's Summer Palace", "Bull Temple visit", "Commercial Street shopping"]
      },
      {
        day: 3,
        description: "Modern Bangalore",
        activities: ["Vidhana Soudha", "UB City Mall", "Brewery visit", "Departure"]
      }
    ],
    category: "Nature",
    groupType: "Friends",
    maxGroupSize: 12,
    difficulty: "Easy",
    destination: "68360751b433f4991ec48172"
  },
  {
    name: "Hyderabad Royal Heritage",
    description: "Immerse in the Nizami culture with visits to Charminar, Golconda Fort, and Ramoji Film City. Experience royal grandeur and modern entertainment.",
    image: "https://tourism.telangana.gov.in/storage/app/media/charminar-landscape.jpg",
    duration: 4,
    price: 13500,
    inclusions: [
      "3 nights accommodation",
      "All meals",
      "Ramoji Film City tour",
      "Local transportation",
      "Guide services",
      "Entry tickets"
    ],
    exclusions: [
      "Airfare",
      "Personal shopping",
      "Tips",
      "Laundry",
      "Phone calls"
    ],
    itinerary: [
      {
        day: 1,
        description: "Historic city center",
        activities: ["Arrival", "Charminar visit", "Laad Bazaar shopping", "Mecca Masjid", "Traditional dinner"]
      },
      {
        day: 2,
        description: "Fortress exploration",
        activities: ["Golconda Fort", "Sound and Light show", "Qutb Shahi Tombs", "Local handicrafts shopping"]
      },
      {
        day: 3,
        description: "Film City adventure",
        activities: ["Full day at Ramoji Film City", "Studio tours", "Entertainment shows", "Theme park rides"]
      },
      {
        day: 4,
        description: "Culture and departure",
        activities: ["Salar Jung Museum", "Hussain Sagar Lake", "Birla Mandir", "Departure"]
      }
    ],
    category: "Heritage",
    groupType: "Family",
    maxGroupSize: 18,
    difficulty: "Moderate",
    destination: "68360751b433f4991ec48173"
  },
  {
    name: "Chennai Cultural Immersion",
    description: "Experience Tamil culture through ancient temples, colonial forts, and the world's second-longest urban beach. Perfect introduction to South Indian heritage.",
    image: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/21/d5e6f1afee6178b111a4d9ab82170c3e_1000x1000.jpg",
    duration: 3,
    price: 8000,
    inclusions: [
      "2 nights accommodation",
      "Traditional meals",
      "Temple visits",
      "Beach activities",
      "Cultural show",
      "Local transport"
    ],
    exclusions: [
      "Airfare",
      "Personal expenses",
      "Shopping",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        description: "Temple and beach",
        activities: ["Arrival", "Kapaleeshwarar Temple", "Mylapore exploration", "Marina Beach evening", "Street food tour"]
      },
      {
        day: 2,
        description: "Colonial heritage",
        activities: ["Fort St. George", "Government Museum", "San Thome Cathedral", "Express Avenue shopping"]
      },
      {
        day: 3,
        description: "Art and culture",
        activities: ["DakshinaChitra", "Traditional craft shopping", "Bharatanatyam performance", "Departure"]
      }
    ],
    category: "Cultural",
    groupType: "Family",
    maxGroupSize: 16,
    difficulty: "Easy",
    destination: "68360751b433f4991ec48174"
  },
  {
    name: "Kolkata Cultural Capital",
    description: "Explore the intellectual and cultural heart of India with Victoria Memorial, Howrah Bridge, and spiritual Dakshineswar Temple. Rich literary and artistic heritage.",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/victoria-memorial-kolkata-wb-2-attr-hero?qlt=82&ts=1726644062097",
    duration: 4,
    price: 11000,
    inclusions: [
      "3 nights hotel stay",
      "Bengali cuisine meals",
      "Monument visits",
      "River cruise",
      "Cultural programs",
      "Transportation"
    ],
    exclusions: [
      "Airfare/train fare",
      "Personal shopping",
      "Tips",
      "Laundry",
      "Phone calls"
    ],
    itinerary: [
      {
        day: 1,
        description: "Colonial heritage",
        activities: ["Arrival", "Victoria Memorial", "St. Paul's Cathedral", "Maidan walk", "Park Street evening"]
      },
      {
        day: 2,
        description: "River and bridges",
        activities: ["Howrah Bridge", "River Hooghly cruise", "Flower market", "College Street book shopping"]
      },
      {
        day: 3,
        description: "Spiritual journey",
        activities: ["Dakshineswar Kali Temple", "Belur Math", "Kalighat Temple", "Cultural performance"]
      },
      {
        day: 4,
        description: "Art and departure",
        activities: ["Indian Museum", "Kumortuli pottery district", "New Market shopping", "Departure"]
      }
    ],
    category: "Cultural",
    groupType: "Solo",
    maxGroupSize: 8,
    difficulty: "Easy",
    destination: "68360751b433f4991ec48175"
  },
  {
    name: "Pune Historical Adventure",
    description: "Discover Maratha history through Shaniwar Wada palace and adventurous trek to Sinhagad Fort. Perfect blend of history and outdoor activities.",
    image: "https://www.savaari.com/blog/wp-content/uploads/2022/11/Shaniwaarwada_Pune_11zon.jpg",
    duration: 2,
    price: 6500,
    inclusions: [
      "1 night accommodation",
      "Meals",
      "Trekking guide",
      "Transportation",
      "Entry fees",
      "Safety equipment"
    ],
    exclusions: [
      "Personal gear",
      "Tips",
      "Personal expenses",
      "Travel insurance",
      "Medical expenses"
    ],
    itinerary: [
      {
        day: 1,
        description: "Palace and city",
        activities: ["Arrival", "Shaniwar Wada visit", "Light and sound show", "Pune city tour", "Local dinner"]
      },
      {
        day: 2,
        description: "Fort trekking",
        activities: ["Early morning Sinhagad trek", "Fort exploration", "Panoramic views", "Traditional lunch", "Departure"]
      }
    ],
    category: "Adventure",
    groupType: "Friends",
    maxGroupSize: 10,
    difficulty: "Moderate",
    destination: "68360751b433f4991ec48176"
  }
];

const seedPackages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://ravish99055:Ravish%4099055.@cluster0.llvgerm.mongodb.net/destinex");
    console.log('Connected to MongoDB');

    // Log the number of packages we're trying to insert
    console.log(`Attempting to insert ${travelPackages.length} packages`);

    // Insert new packages
    const result = await Package.insertMany(travelPackages, { ordered: false });
    console.log(`Successfully seeded ${result.length} packages`);

    // Verify the insertion by counting documents
    const count = await Package.countDocuments();
    console.log(`Total packages in database: ${count}`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    if (error.writeErrors) {
      console.error('Write errors:', error.writeErrors);
    }
    
    process.exit(1);
  }
};

// Run the seed function
seedPackages(); 