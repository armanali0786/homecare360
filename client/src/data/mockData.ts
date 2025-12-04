import { ServiceProvider, Review, Booking } from '../App';

export const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    service: 'Plumbing',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 85,
    location: 'Downtown',
    distance: 1.2,
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjQ3NjA2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available Today',
    verified: true,
    description: 'Licensed plumber with 15 years of experience. Specializing in emergency repairs, installations, and maintenance.',
    experience: 15,
    specializations: ['Emergency Repairs', 'Pipe Installation', 'Water Heater Repair', 'Drain Cleaning'],
    completedJobs: 342,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    portfolio: [
      {
        id: 'p1',
        title: 'Modern Bathroom Renovation',
        image: 'https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzY0NzU3MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Complete bathroom plumbing installation with modern fixtures'
      },
      {
        id: 'p2',
        title: 'Kitchen Sink Installation',
        image: 'https://images.unsplash.com/photo-1578177154072-bbbd429d496f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcGx1bWJpbmclMjB3b3JrfGVufDF8fHx8MTc2NDgyNTE2MXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Professional kitchen plumbing with garbage disposal'
      }
    ],
    certifications: [
      {
        id: 'c1',
        name: 'Master Plumber License',
        issuer: 'State Board of Plumbing',
        year: '2015'
      },
      {
        id: 'c2',
        name: 'Backflow Prevention Certification',
        issuer: 'EPA',
        year: '2020'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Williams',
    service: 'Electrical',
    rating: 5.0,
    reviewCount: 89,
    hourlyRate: 95,
    location: 'Midtown',
    distance: 2.5,
    image: 'https://images.unsplash.com/photo-1759542877886-39d81e8f2eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHJlcGFpcnN8ZW58MXx8fHwxNzY0NzYwNjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available Tomorrow',
    verified: true,
    description: 'Certified electrician offering residential and commercial electrical services. Expert in smart home installations.',
    experience: 12,
    specializations: ['Wiring & Rewiring', 'Panel Upgrades', 'Smart Home Installation', 'LED Lighting'],
    completedJobs: 256,
    coordinates: { lat: 40.7580, lng: -73.9855 },
    portfolio: [
      {
        id: 'p3',
        title: 'Smart Home Lighting System',
        image: 'https://images.unsplash.com/photo-1752262167753-37a0ec83f614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjQ3NDgwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Complete smart lighting installation with app control'
      }
    ],
    certifications: [
      {
        id: 'c3',
        name: 'Licensed Electrician',
        issuer: 'State Electrical Board',
        year: '2012'
      },
      {
        id: 'c4',
        name: 'Smart Home Professional',
        issuer: 'CEDIA',
        year: '2021'
      }
    ]
  },
  {
    id: '3',
    name: 'Clean Pro Services',
    service: 'Cleaning',
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 65,
    location: 'Westside',
    distance: 3.1,
    image: 'https://images.unsplash.com/photo-1620563923430-f5845a5ddfb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjQ2NTA1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available This Week',
    verified: true,
    description: 'Professional cleaning team providing residential and commercial cleaning services with eco-friendly products.',
    experience: 8,
    specializations: ['Deep Cleaning', 'Move-in/Move-out', 'Office Cleaning', 'Eco-Friendly'],
    completedJobs: 567,
    coordinates: { lat: 40.7489, lng: -73.9680 }
  },
  {
    id: '4',
    name: 'Green Thumb Landscaping',
    service: 'Landscaping',
    rating: 4.7,
    reviewCount: 145,
    hourlyRate: 75,
    location: 'Suburbs',
    distance: 4.8,
    image: 'https://images.unsplash.com/photo-1706828950029-708474bcf938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGVyJTIwZ2FyZGVuaW5nfGVufDF8fHx8MTc2NDc2MDYyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available Next Week',
    verified: true,
    description: 'Full-service landscaping company specializing in garden design, lawn care, and outdoor maintenance.',
    experience: 10,
    specializations: ['Lawn Maintenance', 'Garden Design', 'Tree Trimming', 'Irrigation Systems'],
    completedJobs: 423,
    coordinates: { lat: 40.7282, lng: -73.7949 }
  },
  {
    id: '5',
    name: 'David Martinez',
    service: 'Painting',
    rating: 4.9,
    reviewCount: 98,
    hourlyRate: 70,
    location: 'Downtown',
    distance: 1.8,
    image: 'https://images.unsplash.com/photo-1513612027093-46da490bbd5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwc2VydmljZXxlbnwxfHx8fDE3NjQ2Nzg2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available Today',
    verified: true,
    description: 'Professional painter with expertise in interior and exterior painting. Attention to detail and clean work guaranteed.',
    experience: 9,
    specializations: ['Interior Painting', 'Exterior Painting', 'Cabinet Refinishing', 'Wallpaper'],
    completedJobs: 287,
    coordinates: { lat: 40.7128, lng: -74.0160 }
  },
  {
    id: '6',
    name: 'Fix-It-All Handyman',
    service: 'Handyman',
    rating: 4.6,
    reviewCount: 176,
    hourlyRate: 60,
    location: 'Eastside',
    distance: 3.5,
    image: 'https://images.unsplash.com/photo-1611134313089-c28c32796751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHRvb2xzfGVufDF8fHx8MTc2NDY4OTcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    availability: 'Available This Week',
    verified: true,
    description: 'Experienced handyman for all types of home repairs and installations. No job too small!',
    experience: 7,
    specializations: ['Furniture Assembly', 'Door/Window Repair', 'Drywall Repair', 'General Maintenance'],
    completedJobs: 512,
    coordinates: { lat: 40.7489, lng: -73.9380 }
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    providerId: '1',
    userName: 'Jennifer Smith',
    rating: 5,
    comment: 'Mike was fantastic! Fixed our leaking pipe quickly and professionally. Very reasonable pricing and arrived on time. Highly recommend!',
    date: '2024-11-15',
    verified: true
  },
  {
    id: 'r2',
    providerId: '1',
    userName: 'Robert Chen',
    rating: 5,
    comment: 'Excellent work on our bathroom renovation. Mike was professional, clean, and finished ahead of schedule.',
    date: '2024-11-08',
    verified: true
  },
  {
    id: 'r3',
    providerId: '1',
    userName: 'Lisa Anderson',
    rating: 4,
    comment: 'Good service overall. Took a bit longer than expected but the work quality was great.',
    date: '2024-10-28',
    verified: true
  },
  {
    id: 'r4',
    providerId: '2',
    userName: 'Mark Thompson',
    rating: 5,
    comment: 'Sarah installed our entire smart home lighting system. Incredibly knowledgeable and patient with all our questions!',
    date: '2024-11-20',
    verified: true
  },
  {
    id: 'r5',
    providerId: '2',
    userName: 'Amanda Rodriguez',
    rating: 5,
    comment: 'Best electrician we\'ve ever worked with. Fixed our panel issues and upgraded our outlets. Will definitely use again.',
    date: '2024-11-12',
    verified: true
  },
  {
    id: 'r6',
    providerId: '3',
    userName: 'John Davis',
    rating: 5,
    comment: 'Clean Pro did an amazing deep clean of our home. Every corner was spotless! The team was friendly and efficient.',
    date: '2024-11-18',
    verified: true
  },
  {
    id: 'r7',
    providerId: '3',
    userName: 'Emily White',
    rating: 5,
    comment: 'They cleaned our office space and it looks brand new. Very professional team and great attention to detail.',
    date: '2024-11-10',
    verified: true
  },
];

export const mockUserBookings: Booking[] = [
  {
    id: 'b1',
    providerId: '1',
    providerName: 'Mike Johnson',
    service: 'Plumbing',
    date: '2024-12-05',
    time: '10:00 AM',
    status: 'confirmed',
    price: 170
  },
  {
    id: 'b2',
    providerId: '3',
    providerName: 'Clean Pro Services',
    service: 'Cleaning',
    date: '2024-12-08',
    time: '2:00 PM',
    status: 'pending',
    price: 260
  },
  {
    id: 'b3',
    providerId: '2',
    providerName: 'Sarah Williams',
    service: 'Electrical',
    date: '2024-11-25',
    time: '11:00 AM',
    status: 'completed',
    price: 285
  },
];

export const mockProviderJobs: Booking[] = [
  {
    id: 'j1',
    providerId: '1',
    providerName: 'Mike Johnson',
    customerName: 'Jennifer Smith',
    service: 'Kitchen Sink Repair',
    date: '2024-12-04',
    time: '9:00 AM',
    status: 'confirmed',
    price: 150
  },
  {
    id: 'j2',
    providerId: '1',
    providerName: 'Mike Johnson',
    customerName: 'David Brown',
    service: 'Water Heater Installation',
    date: '2024-12-05',
    time: '10:00 AM',
    status: 'confirmed',
    price: 450
  },
  {
    id: 'j3',
    providerId: '1',
    providerName: 'Mike Johnson',
    customerName: 'Susan Lee',
    service: 'Bathroom Faucet Replacement',
    date: '2024-12-06',
    time: '2:00 PM',
    status: 'pending',
    price: 180
  },
  {
    id: 'j4',
    providerId: '1',
    providerName: 'Mike Johnson',
    customerName: 'Robert Chen',
    service: 'Complete Bathroom Renovation',
    date: '2024-11-20',
    time: '8:00 AM',
    status: 'completed',
    price: 2400
  },
];