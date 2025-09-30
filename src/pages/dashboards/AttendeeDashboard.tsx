import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowButton, WowCard, WowBadge, WowInput } from '../../components/wowdash';

interface Ticket {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketType: string;
  qrCode: string;
  checkInStatus: 'pending' | 'checked-in';
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  category: string;
  registered: boolean;
  capacity: number;
  attendees: number;
}

interface Connection {
  id: string;
  name: string;
  role: string;
  company: string;
  status: 'pending' | 'connected' | 'rejected';
  avatar: string;
}

const AttendeeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      eventName: 'Startup Pitch Day 2024',
      eventDate: '2024-02-15',
      eventTime: '2:00 PM',
      location: 'Main Auditorium',
      ticketType: 'VIP',
      qrCode: 'QR123456',
      checkInStatus: 'pending'
    },
    {
      id: '2',
      eventName: 'Tech Innovation Summit',
      eventDate: '2024-02-20',
      eventTime: '10:00 AM',
      location: 'Conference Hall A',
      ticketType: 'General',
      qrCode: 'QR789012',
      checkInStatus: 'checked-in'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      date: '2024-02-25',
      time: '3:00 PM',
      speaker: 'Dr. Sarah Johnson',
      location: 'Tech Lab 1',
      category: 'Workshop',
      registered: false,
      capacity: 50,
      attendees: 32
    },
    {
      id: '2',
      title: 'Networking Mixer',
      date: '2024-02-28',
      time: '6:00 PM',
      speaker: 'Multiple Speakers',
      location: 'Rooftop Lounge',
      category: 'Networking',
      registered: true,
      capacity: 100,
      attendees: 78
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'John Smith',
      role: 'Founder',
      company: 'TechStart Inc',
      status: 'connected',
      avatar: '👨‍💼'
    },
    {
      id: '2',
      name: 'Emily Chen',
      role: 'Investor',
      company: 'Venture Capital Partners',
      status: 'pending',
      avatar: '👩‍💼'
    }
  ]);

  const stats = [
    {
      title: 'My Tickets',
      value: tickets.length.toString(),
      icon: 'mdi:ticket',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+2', isPositive: true, label: 'This month' }
    },
    {
      title: 'Events Attended',
      value: tickets.filter(t => t.checkInStatus === 'checked-in').length.toString(),
      icon: 'mdi:calendar-check',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '+1', isPositive: true, label: 'This week' }
    },
    {
      title: 'Connections',
      value: connections.filter(c => c.status === 'connected').length.toString(),
      icon: 'mdi:account-group',
      iconBgColor: 'bg-info-500',
      gradientClass: 'bg-gradient-start-3',
      trend: { value: '+5', isPositive: true, label: 'This month' }
    },
    {
      title: 'Upcoming Events',
      value: events.filter(e => e.registered).length.toString(),
      icon: 'mdi:calendar-clock',
      iconBgColor: 'bg-warning-500',
      gradientClass: 'bg-gradient-start-5',
      trend: { value: '2', isPositive: true, label: 'Registered' }
    }
  ];

  const handleRegisterEvent = (eventId: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, registered: !e.registered } : e
    ));
  };

  const handleDownloadQR = (ticketId: string) => {
    alert(`Downloading QR code for ticket ${ticketId}`);
  };

  const handleSendConnectionRequest = (userId: string) => {
    setConnections(connections.map(c =>
      c.id === userId ? { ...c, status: 'pending' } : c
    ));
  };

  const renderOverview = () => (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="row gy-4">
        <div className="col-lg-8">
          <WowCard title="Upcoming Events" subtitle="Events you're registered for">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.filter(t => t.checkInStatus === 'pending').map(ticket => (
                    <tr key={ticket.id}>
                      <td className="fw-medium">{ticket.eventName}</td>
                      <td>{ticket.eventDate} at {ticket.eventTime}</td>
                      <td>{ticket.location}</td>
                      <td>
                        <WowBadge variant="warning">Pending</WowBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WowCard>
        </div>

        <div className="col-lg-4">
          <WowCard title="Quick Actions">
            <div className="d-flex flex-column gap-3">
              <WowButton variant="primary" fullWidth>
                <Icon icon="mdi:ticket-plus" className="mr-2" />
                Browse Events
              </WowButton>
              <WowButton variant="info" fullWidth>
                <Icon icon="mdi:qrcode-scan" className="mr-2" />
                Scan QR Code
              </WowButton>
              <WowButton variant="success" fullWidth>
                <Icon icon="mdi:account-plus" className="mr-2" />
                Find Connections
              </WowButton>
            </div>
          </WowCard>
        </div>
      </div>
    </>
  );

  const renderMyTickets = () => (
    <WowCard title="My Tickets" subtitle="View and manage your event tickets">
      <div className="row gy-4">
        {tickets.map(ticket => (
          <div className="col-md-6" key={ticket.id}>
            <div className="card border">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-bold mb-1">{ticket.eventName}</h6>
                    <p className="text-sm text-neutral-600 mb-0">{ticket.ticketType} Ticket</p>
                  </div>
                  <WowBadge variant={ticket.checkInStatus === 'checked-in' ? 'success' : 'warning'}>
                    {ticket.checkInStatus === 'checked-in' ? 'Checked In' : 'Pending'}
                  </WowBadge>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Icon icon="mdi:calendar" className="text-neutral-600" />
                    <span className="text-sm">{ticket.eventDate} at {ticket.eventTime}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="mdi:map-marker" className="text-neutral-600" />
                    <span className="text-sm">{ticket.location}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <WowButton variant="primary" size="sm" onClick={() => handleDownloadQR(ticket.id)}>
                    <Icon icon="mdi:qrcode" className="mr-1" />
                    QR Code
                  </WowButton>
                  <WowButton variant="secondary" size="sm">
                    <Icon icon="mdi:share" className="mr-1" />
                    Share
                  </WowButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WowCard>
  );

  const renderSchedule = () => (
    <WowCard title="Event Schedule" subtitle="View and manage your event calendar">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date & Time</th>
              <th>Speaker</th>
              <th>Location</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.filter(e => e.registered).map(event => (
              <tr key={event.id}>
                <td className="fw-medium">{event.title}</td>
                <td>{event.date} at {event.time}</td>
                <td>{event.speaker}</td>
                <td>{event.location}</td>
                <td>
                  <WowBadge variant="info">{event.category}</WowBadge>
                </td>
                <td>
                  <WowButton variant="secondary" size="sm">
                    <Icon icon="mdi:calendar-plus" />
                  </WowButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WowCard>
  );

  const renderRecommendations = () => (
    <WowCard title="Recommended Events" subtitle="Events you might be interested in">
      <div className="row gy-4">
        {events.filter(e => !e.registered).map(event => (
          <div className="col-md-6" key={event.id}>
            <div className="card border h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6 className="fw-bold mb-0">{event.title}</h6>
                  <WowBadge variant="info">{event.category}</WowBadge>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Icon icon="mdi:calendar" className="text-neutral-600" />
                    <span className="text-sm">{event.date} at {event.time}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Icon icon="mdi:account" className="text-neutral-600" />
                    <span className="text-sm">{event.speaker}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="mdi:map-marker" className="text-neutral-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary-500" 
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 mb-0">
                    {event.attendees}/{event.capacity} attendees
                  </p>
                </div>
                <WowButton 
                  variant="primary" 
                  fullWidth 
                  onClick={() => handleRegisterEvent(event.id)}
                >
                  Register Now
                </WowButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WowCard>
  );

  const renderNetworking = () => (
    <WowCard title="Networking" subtitle="Connect with other attendees">
      <div className="row gy-4">
        {connections.map(connection => (
          <div className="col-md-6" key={connection.id}>
            <div className="card border">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="text-4xl">{connection.avatar}</div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{connection.name}</h6>
                    <p className="text-sm text-neutral-600 mb-0">{connection.role} at {connection.company}</p>
                  </div>
                  <WowBadge variant={connection.status === 'connected' ? 'success' : 'warning'}>
                    {connection.status}
                  </WowBadge>
                </div>
                {connection.status !== 'connected' && (
                  <WowButton 
                    variant="primary" 
                    size="sm" 
                    fullWidth
                    onClick={() => handleSendConnectionRequest(connection.id)}
                  >
                    <Icon icon="mdi:account-plus" className="mr-1" />
                    Connect
                  </WowButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </WowCard>
  );

  const renderSettings = () => (
    <WowCard title="Settings" subtitle="Manage your preferences">
      <div className="row gy-4">
        <div className="col-md-6">
          <WowInput label="Full Name" value="John Doe" />
        </div>
        <div className="col-md-6">
          <WowInput label="Email" value="john.doe@example.com" type="email" />
        </div>
        <div className="col-md-6">
          <WowInput label="Phone" value="+1 234 567 8900" />
        </div>
        <div className="col-md-6">
          <WowInput label="Company" value="Tech Innovations Inc" />
        </div>
        <div className="col-12">
          <div className="d-flex gap-3">
            <WowButton variant="primary">Save Changes</WowButton>
            <WowButton variant="secondary">Cancel</WowButton>
          </div>
        </div>
      </div>
    </WowCard>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'tickets', label: 'My Tickets', icon: 'mdi:ticket' },
    { id: 'schedule', label: 'Schedule', icon: 'mdi:calendar' },
    { id: 'recommendations', label: 'Recommendations', icon: 'mdi:star' },
    { id: 'networking', label: 'Networking', icon: 'mdi:account-group' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">👤 Attendee Dashboard</h6>
      </div>

      {/* Tabs */}
      <div className="card mb-24">
        <div className="card-body p-0">
          <ul className="nav nav-tabs border-bottom" role="tablist">
            {tabs.map(tab => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon icon={tab.icon} className="mr-2" />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tickets' && renderMyTickets()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'networking' && renderNetworking()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </>
  );
};

export default AttendeeDashboard;

