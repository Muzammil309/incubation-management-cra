import React, { useState } from 'react';
import SoftCard from '../components/ui/SoftCard';
import SoftButton from '../components/ui/SoftButton';
import SoftBadge from '../components/ui/SoftBadge';
import SoftInput from '../components/ui/SoftInput';
import { 
  Plus, 
  Search, 
  Filter, 
  Users,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Eye,
  MoreHorizontal,
  Award,
  Clock
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  location: string;
  experience: number;
  rating: number;
  totalSessions: number;
  availability: 'Available' | 'Busy' | 'Unavailable';
  bio: string;
  avatar?: string;
  linkedIn?: string;
  email: string;
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'VP of Engineering',
    company: 'TechCorp Inc.',
    expertise: ['AI/ML', 'Product Development', 'Team Leadership'],
    location: 'San Francisco, CA',
    experience: 12,
    rating: 4.9,
    totalSessions: 156,
    availability: 'Available',
    bio: 'Experienced engineering leader with expertise in scaling tech teams and AI product development.',
    email: 'sarah.johnson@techcorp.com'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Serial Entrepreneur',
    company: 'Chen Ventures',
    expertise: ['Fundraising', 'Go-to-Market', 'Strategy'],
    location: 'New York, NY',
    experience: 15,
    rating: 4.8,
    totalSessions: 203,
    availability: 'Busy',
    bio: 'Founded 3 successful startups, now helping early-stage companies with fundraising and strategy.',
    email: 'michael@chenventures.com'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Chief Medical Officer',
    company: 'HealthTech Solutions',
    expertise: ['HealthTech', 'Regulatory', 'Clinical Trials'],
    location: 'Boston, MA',
    experience: 18,
    rating: 4.9,
    totalSessions: 89,
    availability: 'Available',
    bio: 'Medical doctor turned entrepreneur, specializing in healthcare technology and regulatory compliance.',
    email: 'emily.rodriguez@healthtech.com'
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Head of Marketing',
    company: 'Growth Labs',
    expertise: ['Digital Marketing', 'Growth Hacking', 'Brand Strategy'],
    location: 'Austin, TX',
    experience: 10,
    rating: 4.7,
    totalSessions: 134,
    availability: 'Available',
    bio: 'Growth marketing expert who has helped 50+ startups achieve product-market fit.',
    email: 'david@growthlabs.com'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'Investment Director',
    company: 'Venture Capital Partners',
    expertise: ['Venture Capital', 'Due Diligence', 'Financial Modeling'],
    location: 'Palo Alto, CA',
    experience: 14,
    rating: 4.8,
    totalSessions: 78,
    availability: 'Unavailable',
    bio: 'VC investor with $500M+ in deployed capital, focusing on early-stage tech companies.',
    email: 'lisa@vcpartners.com'
  }
];

const MentorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  const allExpertise = Array.from(new Set(mockMentors.flatMap(mentor => mentor.expertise)));

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);
    const matchesAvailability = selectedAvailability === 'All' || mentor.availability === selectedAvailability;
    
    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'success';
      case 'Busy': return 'warning';
      case 'Unavailable': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-700 mb-2">Mentor Network</h1>
          <p className="text-secondary-500">Connect startups with experienced mentors</p>
        </div>
        <SoftButton variant="primary" className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add New Mentor
        </SoftButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total Mentors</p>
              <p className="text-2xl font-bold text-dark-700">{mockMentors.length}</p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Available Now</p>
              <p className="text-2xl font-bold text-dark-700">
                {mockMentors.filter(m => m.availability === 'Available').length}
              </p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-info rounded-xl flex items-center justify-center mr-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total Sessions</p>
              <p className="text-2xl font-bold text-dark-700">
                {mockMentors.reduce((sum, m) => sum + m.totalSessions, 0)}
              </p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center mr-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Avg Rating</p>
              <p className="text-2xl font-bold text-dark-700">
                {(mockMentors.reduce((sum, m) => sum + m.rating, 0) / mockMentors.length).toFixed(1)}
              </p>
            </div>
          </div>
        </SoftCard>
      </div>

      {/* Filters and Search */}
      <SoftCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <SoftInput
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="md:w-64"
            />
            
            <select 
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-2 bg-white border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Expertise</option>
              {allExpertise.map(expertise => (
                <option key={expertise} value={expertise}>{expertise}</option>
              ))}
            </select>

            <select 
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-4 py-2 bg-white border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Availability</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <SoftButton variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </SoftButton>
        </div>
      </SoftCard>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <SoftCard key={mentor.id} className="hover:shadow-soft-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">
                    {mentor.name.split(' ').map(n => n.charAt(0)).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-700">{mentor.name}</h3>
                  <p className="text-sm text-secondary-500">{mentor.title}</p>
                  <p className="text-sm text-secondary-400">{mentor.company}</p>
                </div>
              </div>
              <button className="p-2 text-secondary-400 hover:text-dark-700">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
              {mentor.bio}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-warning-500 mr-1" />
                <span className="text-sm font-medium text-dark-700">{mentor.rating}</span>
                <span className="text-sm text-secondary-500 ml-1">
                  ({mentor.totalSessions} sessions)
                </span>
              </div>
              <SoftBadge variant={getAvailabilityColor(mentor.availability) as any}>
                {mentor.availability}
              </SoftBadge>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-secondary-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {mentor.location}
              </div>
              <div className="flex items-center text-sm text-secondary-500">
                <Award className="h-4 w-4 mr-2" />
                {mentor.experience} years experience
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-dark-700 mb-2">Expertise:</p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <SoftBadge key={index} variant="info" size="sm">
                    {skill}
                  </SoftBadge>
                ))}
                {mentor.expertise.length > 3 && (
                  <SoftBadge variant="secondary" size="sm">
                    +{mentor.expertise.length - 3} more
                  </SoftBadge>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <SoftButton variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </SoftButton>
              <SoftButton variant="primary" size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </SoftButton>
            </div>
          </SoftCard>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <SoftCard className="text-center py-12">
          <Users className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-700 mb-2">No mentors found</h3>
          <p className="text-secondary-500 mb-4">
            Try adjusting your search criteria or add a new mentor to expand the network.
          </p>
          <SoftButton variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Mentor
          </SoftButton>
        </SoftCard>
      )}
    </div>
  );
};

export default MentorsPage;
