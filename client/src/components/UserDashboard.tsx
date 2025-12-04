import { useState } from 'react';
import { Calendar, Clock, DollarSign, Star, MessageSquare, CheckCircle, XCircle, Navigation } from 'lucide-react';
import { mockUserBookings } from '../data/mockData';

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = mockUserBookings.filter(
    b => b.status === 'pending' || b.status === 'confirmed'
  );
  const pastBookings = mockUserBookings.filter(
    b => b.status === 'completed' || b.status === 'cancelled'
  );

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your service bookings and view history</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">{upcomingBookings.length}</div>
              <div className="text-gray-600">Upcoming</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">
                {mockUserBookings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">
                ${mockUserBookings.reduce((sum, b) => sum + b.price, 0)}
              </div>
              <div className="text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">4.8</div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'past'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Past ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {displayBookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">
              No {activeTab} bookings
            </h3>
            <p className="text-gray-600">
              {activeTab === 'upcoming'
                ? 'Book a service to get started'
                : 'Your completed bookings will appear here'}
            </p>
          </div>
        ) : (
          displayBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-gray-900">{booking.providerName}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{booking.service}</p>

                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${booking.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {booking.status === 'confirmed' && (
                    <>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </>
                  )}

                  {booking.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                        Cancel
                      </button>
                    </>
                  )}

                  {booking.status === 'completed' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>Leave Review</span>
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Book Again
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}