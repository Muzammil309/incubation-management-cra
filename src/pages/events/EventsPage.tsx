import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'networking' | 'pitch' | 'mentoring';
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}

const EventsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Product Strategy Workshop',
      description: 'Learn how to build a winning product strategy from industry experts.',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'workshop',
      attendees: 24,
      maxAttendees: 30,
      status: 'upcoming',
      image: '/api/placeholder/400/200'
    },
    {
      id: '2',
      title: 'Startup Pitch Competition',
      description: 'Present your startup idea to a panel of investors and win funding.',
      date: '2024-01-18',
      time: '2:00 PM',
      location: 'Main Auditorium',
      type: 'pitch',
      attendees: 45,
      maxAttendees: 50,
      status: 'upcoming',
      image: '/api/placeholder/400/200'
    },
    {
      id: '3',
      title: 'Networking Mixer',
      description: 'Connect with fellow entrepreneurs, mentors, and investors.',
      date: '2024-01-20',
      time: '6:00 PM',
      location: 'Rooftop Terrace',
      type: 'networking',
      attendees: 67,
      maxAttendees: 80,
      status: 'upcoming',
      image: '/api/placeholder/400/200'
    },
    {
      id: '4',
      title: 'One-on-One Mentoring Sessions',
      description: 'Individual mentoring sessions with industry experts.',
      date: '2024-01-22',
      time: '9:00 AM',
      location: 'Meeting Rooms 1-5',
      type: 'mentoring',
      attendees: 15,
      maxAttendees: 20,
      status: 'upcoming',
      image: '/api/placeholder/400/200'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-primary-100 text-primary-800';
      case 'networking': return 'bg-info-100 text-info-800';
      case 'pitch': return 'bg-success-100 text-success-800';
      case 'mentoring': return 'bg-warning-100 text-warning-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.type === selectedFilter);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Management</h1>
          <p className="text-gray-600">Organize and manage incubation program events</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-1">+3 this month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600 mt-1">+15% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-info-500 to-info-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-blue-600 mt-1">Next 30 days</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg. Attendance</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-green-600 mt-1">+5% improvement</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          <div className="flex space-x-2">
            {['all', 'workshop', 'networking', 'pitch', 'mentoring'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-soft-xl border border-gray-100 overflow-hidden hover:shadow-soft-2xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-r from-primary-400 to-info-400 relative">
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.attendees}/{event.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking</option>
                  <option value="pitch">Pitch</option>
                  <option value="mentoring">Mentoring</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
