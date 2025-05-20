import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, BarChart2, Clock, Check, Info, X, Heart, Share2, Star, ChevronRight } from 'lucide-react';

const tabs = [
  { label: 'Overview', key: 'overview', icon: <Info size={18} /> },
  { label: 'Itinerary', key: 'itinerary', icon: <Calendar size={18} /> },
  { label: 'Inclusion/Exclusion', key: 'inclusion', icon: <Check size={18} /> },
  { label: 'Additional Info', key: 'additionalInfo', icon: <BarChart2 size={18} /> },
];

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  const handleBooking = () => {
    if (pkg && pkg._id) {
      navigate(`/booking/${pkg._id}`);
    } else {
      console.error('Package ID is undefined');
    }
  };

  // Fetch package details
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/packages/${id}`)
      .then(res => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching package:', err);
        setError('Failed to load package details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-700 font-medium">Loading amazing destinations...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-red-500 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/packages')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-md w-full"
        >
          View Other Packages
        </button>
      </div>
    </div>
  );
  
  if (!pkg) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info size={32} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h2>
        <p className="text-gray-600 mb-6">The package you're looking for doesn't seem to exist.</p>
        <button 
          onClick={() => navigate('/packages')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-md w-full"
        >
          Explore Packages
        </button>
      </div>
    </div>
  );

  // Sample data for tabs in case backend doesn't provide it
  const dummyItinerary = [
    { day: 1, title: "Arrival & Welcome", description: "Arrive at the destination, transfer to your hotel and attend a welcome dinner." },
    { day: 2, title: "Exploration Day", description: "Explore local attractions and immerse in the culture." },
    { day: 3, title: "Adventure Activities", description: "Participate in various adventure activities tailored to the location." },
    { day: 4, title: "Relaxation Day", description: "Relax at the beach or spa, or take optional excursions." },
    { day: 5, title: "Departure", description: "Check out from hotel and transfer to airport." }
  ];
  
  const inclusions = [
    "Accommodation in handpicked hotels",
    "Daily breakfast and selected meals",
    "Private air-conditioned transportation",
    "Professional English-speaking guides",
    "Entrance fees to all attractions as per itinerary",
    "Welcome dinner with local cuisine"
  ];
  
  const exclusions = [
    "International or domestic airfare",
    "Personal expenses and gratuities",
    "Travel insurance",
    "Optional activities not mentioned in the itinerary",
    "Meals not specified in the itinerary"
  ];
  
  const additionalInfo = [
    { title: "Best time to visit", content: "March to May and September to November offer the best weather conditions." },
    { title: "What to pack", content: "Comfortable walking shoes, sunscreen, light clothing, and a light jacket for evenings." },
    { title: "Currency", content: "Local currency is recommended for small purchases. Major credit cards are accepted in most establishments." },
    { title: "Health & Safety", content: "No specific vaccinations required. Basic precautions regarding food and water apply." }
  ];

  const relatedPackages = [
    { id: 1, name: "Mountain Trekking Adventure", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", price: 45000, duration: "7 Days" },
    { id: 2, name: "Beach Paradise Getaway", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", price: 38000, duration: "5 Days" },
    { id: 3, name: "Cultural Heritage Tour", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7", price: 52000, duration: "8 Days" }
  ];

  // Generate the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6" style={{marginLeft: '50px'}}>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">About This Package</h3>
              <p className="text-gray-600 leading-relaxed">{pkg.description || "Experience an unforgettable journey through breathtaking landscapes and immerse yourself in local culture. This carefully crafted package offers the perfect balance of adventure, relaxation, and authentic experiences."}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Guided tours with expert local guides",
                  "Authentic cultural experiences",
                  "Comfortable accommodation throughout",
                  "Carefully planned itinerary",
                  "Free time for personal exploration",
                  "24/7 customer support"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="mt-1 flex-shrink-0">
                      <Check size={16} className="text-green-500" />
                    </div>
                    <p className="text-gray-600">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'itinerary':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Day-by-Day Itinerary</h3>
            <div className="space-y-4">
              {(pkg.itinerary || dummyItinerary).map((day, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 pb-6 relative">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-10px] top-0"></div>
                  <h4 className="font-bold text-gray-800">Day {day.day}: {day.title}</h4>
                  <p className="text-gray-600 mt-1">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'inclusion':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Check size={20} className="text-green-500 mr-2" />
                Inclusions
              </h3>
              <ul className="space-y-2">
                {(pkg.inclusions || inclusions).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <X size={20} className="text-red-500 mr-2" />
                Exclusions
              </h3>
              <ul className="space-y-2">
                {(pkg.exclusions || exclusions).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'additionalInfo':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
            <div className="space-y-5">
              {(pkg.additionalInfo || additionalInfo).map((info, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-96 md:h-screen/2 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000" 
          style={{ 
            backgroundImage: `url('${pkg.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}')`,
            transformOrigin: 'center center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
        
        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <div className="flex items-center text-white text-sm">
            <a href="/" className="hover:text-blue-300 transition">Home</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="/packages" className="hover:text-blue-300 transition">Packages</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-blue-300">{pkg.name}</span>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
              {pkg.category || 'Adventure'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              {pkg.name}
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto font-medium">
              {pkg.shortDescription || 'Discover the perfect adventure that combines exploration, relaxation, and unforgettable experiences.'}
            </p>
            
            {/* Quick Info Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                <Clock size={16} className="text-white mr-2" />
                <span className="text-white font-medium">{pkg.duration} Days</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                <MapPin size={16} className="text-white mr-2" />
                <span className="text-white font-medium">{pkg.location || 'Multiple Destinations'}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                <Users size={16} className="text-white mr-2" />
                <span className="text-white font-medium">Max {pkg.maxGroupSize} People</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                <Star size={16} className="text-white mr-2" />
                <span className="text-white font-medium">{pkg.rating || '4.8'} Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl w-full mx-auto px-2 py-8 flex flex-col lg:flex-row gap-6" style={{marginTop: '30px', marginBottom: '30px', marginLeft: '200px'}}>
        {/* Main Package Details */}
        <div className="w-full lg:w-2/3">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide" style={{marginLeft: '50px'}}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800" style={{marginLeft:"50px", marginRight:"50px"}}>Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={20} 
                      className={star <= (pkg.rating || 4.8) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">{pkg.reviewCount || 24} reviews</span>
              </div>
            </div>
            
            {/* Sample Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  date: "March 15, 2025",
                  rating: 5,
                  comment: "This was the trip of a lifetime! Every detail was perfectly planned, and our guide was exceptional. Would highly recommend this package to anyone looking for an authentic experience."
                },
                {
                  name: "David Thompson",
                  date: "February 8, 2025",
                  rating: 4,
                  comment: "Great experience overall. The accommodations were comfortable and the itinerary was well-balanced. Only suggestion would be to allow more free time for personal exploration."
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0" style={{marginLeft: '50px', marginRight: '50px'}}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-6 w-full border border-blue-600 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Read All Reviews
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          {/* Booking Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 sticky top-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4" style={{marginLeft: '50px', marginRight: '50px'}}>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">₹{pkg.price}</h3>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      size={22} 
                      className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} 
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 size={22} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-medium">₹{pkg.basePrice || pkg.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">₹{pkg.taxes || Math.round(pkg.price * 0.18)}</span>
                </div>
                {pkg.discount && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{pkg.discount}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-md mb-4"
              >
                Book Now
              </button>
              
              <div className="text-center text-sm text-gray-500">
                <p>Free cancellation up to 7 days before departure</p>
              </div>
            </div>
            
            {/* Tour Guide */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Your Tour Guide</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
                    alt="Tour Guide" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">{pkg.guideName || "Emily Chen"}</h5>
                  <p className="text-sm text-gray-500">{pkg.guideExperience || "5+ years experience"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Need Help Card */}
          <div className="bg-blue-600 rounded-xl shadow-md overflow-hidden p-6 mb-8 text-white">
            <h3 className="font-bold text-xl mb-3">Need Help?</h3>
            <p className="mb-4">Our travel experts are here to assist you with your booking and answer any questions.</p>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Call us at</p>
                <p className="font-medium">+91 12345 67890</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Email us at</p>
                <p className="font-medium">support@destinex.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 w-full">
        <div className="max-w-7xl mx-auto py-12 px-4">
          {/* Destinex Logo Centered */}
          <div className="mb-8 flex flex-col items-center" style={{marginLeft: '50px'}}>
            <img src="/images/logo.png" alt="Destinex Logo" className="h-12 w-auto mb-2" />
            <h2 className="text-2xl font-bold tracking-wide">Destinex</h2>
            <p className="text-gray-400 text-sm mt-2 text-center max-w-md">Explore the world with confidence and comfort. Your journey begins with us.</p>
          </div>
          
          {/* Footer Links and Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto" style={{marginTop: '20px', marginLeft: '200px'}}>
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="/packages" className="text-gray-300 hover:text-white transition">Packages</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Destinations */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Top Destinations</h3>
              <ul className="space-y-2">
                <li><a href="/destinations/bali" className="text-gray-300 hover:text-white transition">Bali</a></li>
                <li><a href="/destinations/maldives" className="text-gray-300 hover:text-white transition">Maldives</a></li>
                <li><a href="/destinations/switzerland" className="text-gray-300 hover:text-white transition">Switzerland</a></li>
                <li><a href="/destinations/thailand" className="text-gray-300 hover:text-white transition">Thailand</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">info@destinex.com</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+91 12345 67890</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">123 Travel Street, Tourism City</span>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Subscribe</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest deals and offers</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-l-lg py-2 px-4 outline-none text-gray-800 flex-grow"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg px-4 transition-colors">
                  Join
                </button>
              </form>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">Destinex © 2025. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms & Conditions</a>
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="/faq" className="text-gray-400 hover:text-white text-sm transition">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PackageDetail;