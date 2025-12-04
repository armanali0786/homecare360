import { useState } from 'react';
import { Calendar, DollarSign, Star, TrendingUp, CheckCircle, Clock, User } from 'lucide-react';
import { mockProviderJobs } from '../data/mockData';

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingJobs = mockProviderJobs.filter(
    j => j.status === 'pending' || j.status === 'confirmed'
  );
  const pastJobs = mockProviderJobs.filter(
    j => j.status === 'completed' || j.status === 'cancelled'
  );

  const displayJobs = activeTab === 'upcoming' ? upcomingJobs : pastJobs;

  const totalEarnings = mockProviderJobs
    .filter(j => j.status === 'completed')
    .reduce((sum, j) => sum + j.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Provider Dashboard</h1>
        <p className="text-gray-600">Manage your jobs and track your performance</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">{upcomingJobs.length}</div>
              <div className="text-gray-600">Upcoming Jobs</div>
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
                {mockProviderJobs.filter(j => j.status === 'completed').length}
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
              <div className="text-2xl text-gray-900">${totalEarnings}</div>
              <div className="text-gray-600">Total Earnings</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">4.9</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">This Month</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Jobs Completed</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-gray-900">12</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Revenue</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-gray-900">$3,240</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New Clients</span>
              <span className="text-2xl text-gray-900">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left">
              Update Availability
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
              Edit Profile
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
              View Analytics
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
              Withdraw Earnings
            </button>
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
          Upcoming ({upcomingJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'past'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Past ({pastJobs.length})
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {displayJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">
              No {activeTab} jobs
            </h3>
            <p className="text-gray-600">
              {activeTab === 'upcoming'
                ? 'New job requests will appear here'
                : 'Your completed jobs will appear here'}
            </p>
          </div>
        ) : (
          displayJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-gray-900">{job.service}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        job.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : job.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>

                  {job.customerName && (
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <User className="w-4 h-4" />
                      <span>Customer: {job.customerName}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${job.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Accept
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Decline
                      </button>
                    </>
                  )}

                  {job.status === 'confirmed' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Contact Customer
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Mark Complete
                      </button>
                    </>
                  )}

                  {job.status === 'completed' && (
                    <>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        View Receipt
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Request Review
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
