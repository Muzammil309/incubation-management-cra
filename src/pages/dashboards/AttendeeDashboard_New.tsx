import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { 
  DashboardLayout, 
  GradientStatCard, 
  TabNavigation, 
  DataCard,
  WowButton,
  WowBadge 
} from '../../components/wowdash';

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

  const [connections] = useState<Connection[]>([
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
      role: 'CTO',
      company: 'InnovateLabs',
      status: 'pending',
      avatar: '👩‍💻'
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'tickets', label: 'My Tickets', icon: 'mdi:ticket', badge: tickets.length },
    { id: 'schedule', label: 'Schedule', icon: 'mdi:calendar' },
    { id: 'recommendations', label: 'Recommendations', icon: 'mdi:lightbulb' },
    { id: 'networking', label: 'Networking', icon: 'mdi:account-group', badge: connections.filter(c => c.status === 'pending').length },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  const handleRegisterEvent = (eventId: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, registered: true } : e
    ));
  };

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 mb-4">
        <GradientStatCard
          title="My Tickets"
          value={tickets.length}
          icon="mdi:ticket"
          iconBgColor="bg-cyan"
          gradientClass="bg-gradient-start-1"
          trend={{
            value: '+2',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Events Attended"
          value={tickets.filter(t => t.checkInStatus === 'checked-in').length}
          icon="mdi:check-circle"
          iconBgColor="bg-purple"
          gradientClass="bg-gradient-start-2"
          trend={{
            value: '+1',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Connections"
          value={connections.filter(c => c.status === 'connected').length}
          icon="mdi:account-group"
          iconBgColor="bg-info"
          gradientClass="bg-gradient-start-3"
          trend={{
            value: '+3',
            isPositive: true,
            label: 'This week'
          }}
        />
        <GradientStatCard
          title="Upcoming Events"
          value={events.filter(e => e.registered).length}
          icon="mdi:calendar-clock"
          iconBgColor="bg-success-main"
          gradientClass="bg-gradient-start-4"
          trend={{
            value: '+1',
            isPositive: true,
            label: 'This week'
          }}
        />
        <GradientStatCard
          title="Pending Invites"
          value={connections.filter(c => c.status === 'pending').length}
          icon="mdi:email"
          iconBgColor="bg-red"
          gradientClass="bg-gradient-start-5"
          trend={{
            value: '2',
            isPositive: false,
            label: 'Awaiting response'
          }}
        />
      </div>

      {/* Upcoming Events */}
      <div className="row gy-4">
        <div className="col-lg-8">
          <DataCard
            title="Upcoming Events"
            subtitle="Events you're registered for"
            headerAction={
              <WowButton variant="secondary" size="sm">
                <Icon icon="mdi:calendar-plus" className="me-2" />
                Browse Events
              </WowButton>
            }
          >
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.filter(e => e.registered).map(event => (
                    <tr key={event.id}>
                      <td>
                        <div>
                          <div className="fw-semibold text-neutral-900">{event.title}</div>
                          <div className="text-sm text-neutral-600">{event.speaker}</div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div>{event.date}</div>
                          <div className="text-neutral-600">{event.time}</div>
                        </div>
                      </td>
                      <td className="text-sm">{event.location}</td>
                      <td>
                        <WowBadge variant="success">Registered</WowBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataCard>
        </div>

        <div className="col-lg-4">
          <DataCard
            title="Recent Connections"
            subtitle="Your network"
          >
            <div className="d-flex flex-column gap-3">
              {connections.slice(0, 5).map(connection => (
                <div key={connection.id} className="d-flex align-items-center justify-content-between p-3 bg-neutral-50 rounded-lg">
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-3xl">{connection.avatar}</div>
                    <div>
                      <div className="fw-semibold text-neutral-900">{connection.name}</div>
                      <div className="text-sm text-neutral-600">{connection.role} at {connection.company}</div>
                    </div>
                  </div>
                  <WowBadge variant={connection.status === 'connected' ? 'success' : 'warning'}>
                    {connection.status}
                  </WowBadge>
                </div>
              ))}
            </div>
          </DataCard>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'tickets':
        return <div className="text-center py-5">Tickets content coming soon...</div>;
      case 'schedule':
        return <div className="text-center py-5">Schedule content coming soon...</div>;
      case 'recommendations':
        return <div className="text-center py-5">Recommendations content coming soon...</div>;
      case 'networking':
        return <div className="text-center py-5">Networking content coming soon...</div>;
      case 'settings':
        return <div className="text-center py-5">Settings content coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout
      title="Attendee Dashboard"
      subtitle="Welcome back! Here's what's happening with your events."
    >
      <div className="col-12">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>
      <div className="col-12">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default AttendeeDashboard;

