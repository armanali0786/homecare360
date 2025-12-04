import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, CheckCircle, User } from 'lucide-react';

interface TrackingData {
  providerName: string;
  service: string;
  status: 'on-way' | 'nearby' | 'arrived';
  eta: string;
  distance: string;
  currentLocation: string;
  phone: string;
  image: string;
}

export function LiveTracking() {
  const [tracking, setTracking] = useState<TrackingData>({
    providerName: 'Mike Johnson',
    service: 'Plumbing Repair',
    status: 'on-way',
    eta: '15 minutes',
    distance: '2.3 miles',
    currentLocation: 'Main St & 5th Ave',
    phone: '(555) 123-4567',
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NjQ3NjA2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTracking(prev => {
        const etaMinutes = parseInt(prev.eta);
        if (etaMinutes > 1) {
          const newEta = etaMinutes - 1;
          const newDistance = (parseFloat(prev.distance) - 0.2).toFixed(1);
          
          let newStatus = prev.status;
          if (newEta <= 5 && newStatus === 'on-way') {
            newStatus = 'nearby';
          } else if (newEta <= 1 && newStatus === 'nearby') {
            newStatus = 'arrived';
          }

          return {
            ...prev,
            eta: `${newEta} minutes`,
            distance: `${newDistance} miles`,
            status: newStatus
          };
        }
        return prev;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Track Your Service Provider</h1>
        <p className="text-gray-600">Real-time location and ETA updates</p>
      </div>

      {/* Status Banner */}
      <div
        className={`rounded-xl p-6 mb-6 ${
          tracking.status === 'arrived'
            ? 'bg-green-600'
            : tracking.status === 'nearby'
            ? 'bg-orange-600'
            : 'bg-blue-600'
        } text-white`}
      >
        <div className="flex items-center gap-3">
          {tracking.status === 'arrived' ? (
            <CheckCircle className="w-8 h-8" />
          ) : (
            <Navigation className="w-8 h-8 animate-pulse" />
          )}
          <div>
            <div className="text-2xl mb-1">
              {tracking.status === 'arrived'
                ? 'Provider Has Arrived!'
                : tracking.status === 'nearby'
                ? 'Provider is Nearby'
                : 'Provider is On The Way'}
            </div>
            <div className="text-white/90">
              {tracking.status === 'arrived'
                ? 'Your service provider is at your location'
                : `Estimated arrival in ${tracking.eta}`}
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          {/* Simulated Map */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Grid lines */}
              {[...Array(20)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={i * 15}
                  x2="400"
                  y2={i * 15}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
              {[...Array(27)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 15}
                  y1="0"
                  x2={i * 15}
                  y2="300"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          {/* Destination Marker */}
          <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
            <div className="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg" />
            <div className="mt-2 px-3 py-1 bg-white rounded shadow text-sm text-gray-900">
              Your Location
            </div>
          </div>

          {/* Provider Marker (animated) */}
          <div
            className="absolute bottom-1/3 left-1/3 flex flex-col items-center animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div className="mt-2 px-3 py-1 bg-white rounded shadow">
              <div className="text-sm text-gray-900">{tracking.providerName}</div>
              <div className="text-xs text-gray-600">{tracking.eta} away</div>
            </div>
          </div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 133 200 Q 200 150 300 75"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>

          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2">
            <div className="text-sm text-gray-600">Distance</div>
            <div className="text-lg text-gray-900">{tracking.distance}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Provider Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Service Provider</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <div className="text-lg text-gray-900">{tracking.providerName}</div>
              <div className="text-gray-600">{tracking.service}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Currently at: {tracking.currentLocation}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>ETA: {tracking.eta}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </button>
            <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* Journey Updates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Journey Updates</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tracking.status === 'arrived' ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  {tracking.status === 'arrived' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Arrived at destination</div>
                <div className="text-sm text-gray-500">
                  {tracking.status === 'arrived' ? 'Just now' : 'Pending'}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tracking.status === 'nearby' || tracking.status === 'arrived'
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  }`}
                >
                  {tracking.status === 'nearby' || tracking.status === 'arrived' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Nearby (within 5 min)</div>
                <div className="text-sm text-gray-500">
                  {tracking.status === 'nearby' || tracking.status === 'arrived'
                    ? '5 min ago'
                    : 'Pending'}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-600">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Started journey</div>
                <div className="text-sm text-gray-500">20 min ago</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-600">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Booking confirmed</div>
                <div className="text-sm text-gray-500">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Report Issue
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel Service
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
