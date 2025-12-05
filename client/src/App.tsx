import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ServiceProviderList } from './components/ServiceProviderList';
import { ServiceProviderProfile } from './components/ServiceProviderProfile';
import { UserDashboard } from './components/UserDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { ServicePackages } from './components/ServicePackages';
import { QuoteEstimator } from './components/QuoteEstimator';
import { LiveTracking } from './components/LiveTracking';
import { BecomeProvider } from './components/BecomeProvider';

export type UserRole = 'customer' | 'provider' | null;

export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  distance: number;
  image: string;
  availability: string;
  verified: boolean;
  description: string;
  experience: number;
  specializations: string[];
  completedJobs: number;
  coordinates: { lat: number; lng: number };
  portfolio?: { id: string; title: string; image: string; description: string }[];
  certifications?: { id: string; name: string; issuer: string; year: string }[];
}

export interface Review {
  id: string;
  providerId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  customerName?: string;
}

type View = 'home' | 'browse' | 'profile' | 'user-dashboard' | 'provider-dashboard' | 'packages' | 'quote-estimator' | 'tracking' | 'become-provider';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleSearch = (query: string, service: string) => {
    setSearchQuery(query);
    setSelectedService(service);
    setCurrentView('browse');
  };

  const handleViewProfile = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setCurrentView('profile');
  };

  const handleBackToBrowse = () => {
    setCurrentView('browse');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        onBackToHome={handleBackToHome}
      />
      
      {currentView === 'home' && (
        <HomePage 
          onSearch={handleSearch} 
          onBecomeProvider={() => setCurrentView('become-provider')}
        />
      )}
      
      {currentView === 'browse' && (
        <ServiceProviderList 
          searchQuery={searchQuery}
          selectedService={selectedService}
          onViewProfile={handleViewProfile}
        />
      )}
      
      {currentView === 'profile' && selectedProvider && (
        <ServiceProviderProfile 
          provider={selectedProvider}
          onBack={handleBackToBrowse}
        />
      )}
      
      {currentView === 'user-dashboard' && (
        <UserDashboard />
      )}
      
      {currentView === 'provider-dashboard' && (
        <ProviderDashboard />
      )}
      
      {currentView === 'packages' && (
        <ServicePackages />
      )}
      
      {currentView === 'quote-estimator' && (
        <QuoteEstimator />
      )}
      
      {currentView === 'tracking' && (
        <LiveTracking />
      )}
      
      {currentView === 'become-provider' && (
        <BecomeProvider />
      )}
    </div>
  );
}