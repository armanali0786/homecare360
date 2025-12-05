import { Search, User, Menu } from 'lucide-react';
import { UserRole } from '../App';
import Logo from '../styles/images/logo1.png'
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
            <img src={Logo} alt="Logo HomeCare360" className="h-16 w-16 cursor-pointer" title="HomeCare360" onClick={onBackToHome}/>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setCurrentView('browse')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Browse Services
              </button>
              <button
                onClick={() => setCurrentView('quote-estimator')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Get Quote
              </button>
              <button
                onClick={() => setCurrentView('tracking')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Live Tracking
              </button>
              {/* <button
                onClick={() => setCurrentView('become-provider')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                Become a Provider
                </button>
                <button
                onClick={() => setCurrentView('provider-dashboard')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Provider-dashboard
                </button>
                <button
                onClick={() => setCurrentView('user-dashboard')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                User-dashboard
                </button> */}
              <button
                onClick={() => setCurrentView('packages')}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Packages
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
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Sign In
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
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