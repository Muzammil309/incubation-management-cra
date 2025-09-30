import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  DashboardLayout,
  GradientStatCard,
  TabNavigation,
  DataCard,
  WowButton,
  WowBadge,
  WowInput
} from '../../components/wowdash';
import { AnalyticsDashboard } from '../../components/charts/AnalyticsCharts';

interface Event {
  id: string;
  name: string;
  date: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  attendees: number;
  capacity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'speaker' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
}

interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  tier: string;
  price: number;
  sold: number;
  available: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Startup Pitch Day 2024',
      date: '2024-02-15',
      status: 'published',
      attendees: 45,
      capacity: 100
    },
    {
      id: '2',
      name: 'Tech Innovation Summit',
      date: '2024-02-20',
      status: 'published',
      attendees: 78,
      capacity: 150
    },
    {
      id: '3',
      name: 'AI Workshop Series',
      date: '2024-02-25',
      status: 'draft',
      attendees: 0,
      capacity: 50
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'attendee',
      status: 'active',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah@example.com',
      role: 'speaker',
      status: 'active',
      joinedDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-01'
    }
  ]);

  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      eventId: '1',
      eventName: 'Startup Pitch Day 2024',
      tier: 'VIP',
      price: 150,
      sold: 20,
      available: 30
    },
    {
      id: '2',
      eventId: '1',
      eventName: 'Startup Pitch Day 2024',
      tier: 'General',
      price: 50,
      sold: 25,
      available: 50
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'events', label: 'Events', icon: 'mdi:calendar-multiple', badge: events.length },
    { id: 'users', label: 'Users', icon: 'mdi:account-group', badge: users.length },
    { id: 'tickets', label: 'Tickets', icon: 'mdi:ticket' },
    { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-bar' },
    { id: 'messages', label: 'Messages', icon: 'mdi:email' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  const handleCreateEvent = () => {
    alert('Create event functionality');
  };

  const handleEditEvent = (eventId: string) => {
    alert(`Edit event ${eventId}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 mb-4">
        <GradientStatCard
          title="Total Events"
          value={events.length}
          icon="mdi:calendar-multiple"
          iconBgColor="bg-cyan"
          gradientClass="bg-gradient-start-1"
          trend={{
            value: '+3',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Total Users"
          value={users.length}
          icon="mdi:account-group"
          iconBgColor="bg-purple"
          gradientClass="bg-gradient-start-2"
          trend={{
            value: '+12',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Tickets Sold"
          value={tickets.reduce((sum, t) => sum + t.sold, 0)}
          icon="mdi:ticket"
          iconBgColor="bg-success-main"
          gradientClass="bg-gradient-start-4"
          trend={{
            value: '+45',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Revenue"
          value="$12,450"
          icon="mdi:currency-usd"
          iconBgColor="bg-info"
          gradientClass="bg-gradient-start-3"
          trend={{
            value: '+$2,340',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Active Events"
          value={events.filter(e => e.status === 'published').length}
          icon="mdi:calendar-check"
          iconBgColor="bg-red"
          gradientClass="bg-gradient-start-5"
          trend={{
            value: '2',
            isPositive: true,
            label: 'Published'
          }}
        />
      </div>

      {/* Content */}
      <div className="row gy-4">
        <div className="col-lg-8">
          <DataCard title="Recent Events" subtitle="Latest event activities">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Attendees</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 5).map(event => (
                    <tr key={event.id}>
                      <td className="fw-medium">{event.name}</td>
                      <td>{event.date}</td>
                      <td>{event.attendees}/{event.capacity}</td>
                      <td>
                        <WowBadge
                          variant={
                            event.status === 'published' ? 'success' :
                            event.status === 'draft' ? 'warning' :
                            event.status === 'completed' ? 'info' : 'danger'
                          }
                        >
                          {event.status}
                        </WowBadge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <Icon icon="mdi:delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataCard>
        </div>

        <div className="col-lg-4">
          <DataCard title="Quick Actions">
            <div className="d-flex flex-column gap-3">
              <WowButton variant="primary" fullWidth onClick={handleCreateEvent}>
                <Icon icon="mdi:plus" className="mr-2" />
                Create Event
              </WowButton>
              <WowButton variant="info" fullWidth>
                <Icon icon="mdi:account-plus" className="mr-2" />
                Add User
              </WowButton>
              <WowButton variant="success" fullWidth>
                <Icon icon="mdi:email" className="mr-2" />
                Send Announcement
              </WowButton>
              <WowButton variant="warning" fullWidth>
                <Icon icon="mdi:chart-bar" className="mr-2" />
                View Analytics
              </WowButton>
            </div>
          </DataCard>
        </div>
      </div>
    </>
  );

  const renderEvents = () => (
    <DataCard
      title="Event Management"
      subtitle="Create and manage events"
      headerAction={
        <WowButton variant="primary" size="sm" onClick={handleCreateEvent}>
          <Icon icon="mdi:plus" className="mr-2" />
          Create Event
        </WowButton>
      }
    >
      <div className="row gy-4">
        {events.map(event => (
          <div className="col-md-6" key={event.id}>
            <div className="card border">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6 className="fw-bold mb-0">{event.name}</h6>
                  <WowBadge
                    variant={
                      event.status === 'published' ? 'success' :
                      event.status === 'draft' ? 'warning' :
                      event.status === 'completed' ? 'info' : 'danger'
                    }
                  >
                    {event.status}
                  </WowBadge>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Icon icon="mdi:calendar" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Icon icon="mdi:account-group" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>

                <div className="progress mb-3" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary-500"
                    style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>

                <div className="d-flex gap-2">
                  <WowButton variant="primary" size="sm" onClick={() => handleEditEvent(event.id)}>
                    Edit
                  </WowButton>
                  <WowButton variant="danger" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </WowButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DataCard>
  );

  const renderUsers = () => (
    <DataCard
      title="User Management"
      subtitle="Manage platform users"
      headerAction={
        <WowButton variant="primary" size="sm">
          <Icon icon="mdi:account-plus" className="mr-2" />
          Add User
        </WowButton>
      }
    >
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="fw-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <WowBadge
                    variant={
                      user.role === 'admin' ? 'danger' :
                      user.role === 'speaker' ? 'info' : 'success'
                    }
                  >
                    {user.role}
                  </WowBadge>
                </td>
                <td>
                  <WowBadge variant={user.status === 'active' ? 'success' : 'danger'}>
                    {user.status}
                  </WowBadge>
                </td>
                <td>{user.joinedDate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <Icon icon="mdi:delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataCard>
  );

  const renderTickets = () => (
    <DataCard title="Ticket Management" subtitle="Manage event tickets and pricing">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Tier</th>
              <th>Price</th>
              <th>Sold</th>
              <th>Available</th>
              <th>Revenue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="fw-medium">{ticket.eventName}</td>
                <td>
                  <WowBadge variant="info">{ticket.tier}</WowBadge>
                </td>
                <td>${ticket.price}</td>
                <td>{ticket.sold}</td>
                <td>{ticket.available}</td>
                <td className="fw-bold text-success-main">${ticket.sold * ticket.price}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      <Icon icon="mdi:pencil" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataCard>
  );

  const renderAnalytics = () => (
    <>
      <div className="row gy-4 mb-4">
        <div className="col-md-3">
          <GradientStatCard
            title="Total Events"
            value={events.length}
            icon="mdi:calendar-multiple"
            iconBgColor="bg-cyan"
            gradientClass="bg-gradient-start-1"
          />
        </div>
        <div className="col-md-3">
          <GradientStatCard
            title="Total Users"
            value={users.length}
            icon="mdi:account-group"
            iconBgColor="bg-info"
            gradientClass="bg-gradient-start-3"
          />
        </div>
        <div className="col-md-3">
          <GradientStatCard
            title="Tickets Sold"
            value={tickets.reduce((sum, t) => sum + t.sold, 0)}
            icon="mdi:ticket"
            iconBgColor="bg-success-main"
            gradientClass="bg-gradient-start-4"
          />
        </div>
        <div className="col-md-3">
          <GradientStatCard
            title="Total Revenue"
            value="$12,450"
            icon="mdi:currency-usd"
            iconBgColor="bg-red"
            gradientClass="bg-gradient-start-5"
          />
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="row">
        <div className="col-12">
          <DataCard title="Analytics Dashboard" subtitle="Detailed performance metrics">
            <AnalyticsDashboard />
          </DataCard>
        </div>
      </div>
    </>
  );

  const renderMessages = () => (
    <DataCard
      title="Announcements & Messages"
      subtitle="Send notifications to users"
      headerAction={
        <WowButton variant="primary" size="sm">
          <Icon icon="mdi:email-plus" className="mr-2" />
          New Announcement
        </WowButton>
      }
    >
      <div className="row gy-3">
        <div className="col-12">
          <WowInput label="Subject" placeholder="Enter announcement subject" />
        </div>
        <div className="col-12">
          <label className="form-label fw-bold">Message</label>
          <textarea className="form-control" rows={6} placeholder="Enter your message..." />
        </div>
        <div className="col-12">
          <label className="form-label fw-bold">Recipients</label>
          <select className="form-select">
            <option>All Users</option>
            <option>Attendees Only</option>
            <option>Speakers Only</option>
            <option>Admins Only</option>
          </select>
        </div>
        <div className="col-12">
          <WowButton variant="primary">
            <Icon icon="mdi:send" className="mr-2" />
            Send Announcement
          </WowButton>
        </div>
      </div>
    </DataCard>
  );

  const renderSettings = () => (
    <DataCard title="System Settings" subtitle="Configure platform settings">
      <div className="row gy-4">
        <div className="col-md-6">
          <WowInput label="Organization Name" value="Incubation Platform" />
        </div>
        <div className="col-md-6">
          <WowInput label="Contact Email" value="admin@incubation.com" type="email" />
        </div>
        <div className="col-md-6">
          <WowInput label="Default Event Capacity" value="100" type="number" />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Currency</label>
          <select className="form-select">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
            <label className="form-check-label" htmlFor="emailNotifications">
              Enable Email Notifications
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="autoApprove" />
            <label className="form-check-label" htmlFor="autoApprove">
              Auto-approve Event Registrations
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex gap-3">
            <WowButton variant="primary">
              Save Settings
            </WowButton>
            <WowButton variant="secondary">
              Reset to Default
            </WowButton>
          </div>
        </div>
      </div>
    </DataCard>
  );

  return (
    <DashboardLayout
      title="⚙️ Admin Dashboard"
      subtitle="Manage events, users, and platform settings"
    >
      {/* Tab Navigation */}
      <div className="col-12">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Content */}
      <div className="col-12">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

