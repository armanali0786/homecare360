import { Search, User, Menu } from 'lucide-react';
import { UserRole } from '../App';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: 'home' | 'browse' | 'profile' | 'user-dashboard' | 'provider-dashboard' | 'packages' | 'quote-estimator' | 'tracking' | 'become-provider') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onBackToHome: () => void;
}

export function Header({ currentView, setCurrentView, userRole, setUserRole, onBackToHome }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <button onClick={onBackToHome} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">ServiceHub</span>
            </button>
            
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setCurrentView('browse')}
                className="text-gray-600 hover:text-gray-900"
              >
                Browse Services
              </button>
              <button 
                onClick={() => setCurrentView('packages')}
                className="text-gray-600 hover:text-gray-900"
              >
                Packages
              </button>
              <button 
                onClick={() => setCurrentView('quote-estimator')}
                className="text-gray-600 hover:text-gray-900"
              >
                Get Quote
              </button>
              <button 
                onClick={() => setCurrentView('become-provider')}
                className="text-gray-600 hover:text-gray-900"
              >
                Become a Provider
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {!userRole ? (
              <>
                <button 
                  onClick={() => {
                    setUserRole('customer');
                    setCurrentView('user-dashboard');
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if (userRole === 'customer') {
                      setCurrentView('user-dashboard');
                    } else {
                      setCurrentView('provider-dashboard');
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {userRole === 'customer' ? 'My Bookings' : 'My Jobs'}
                  </span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}