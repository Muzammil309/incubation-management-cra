import React, { useState } from 'react';
import SoftBox from '../../components/ui/SoftBox';
import SoftButton from '../../components/ui/SoftButton';
import SoftTypography from '../../components/ui/SoftTypography';
import SoftCard from '../../components/ui/SoftCard';
import SoftBadge from '../../components/ui/SoftBadge';
import { Icon } from '@iconify/react';
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

  const stats = [
    { title: 'Total Events', value: events.length, icon: 'mdi:calendar-multiple', color: 'primary', trend: '+3' },
    { title: 'Total Users', value: users.length, icon: 'mdi:account-group', color: 'info', trend: '+12' },
    { title: 'Tickets Sold', value: tickets.reduce((sum, t) => sum + t.sold, 0), icon: 'mdi:ticket', color: 'success', trend: '+45' },
    { title: 'Revenue', value: '$12,450', icon: 'mdi:currency-usd', color: 'warning', trend: '+$2,340' }
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
    <SoftBox>
      {/* Stats Cards */}
      <SoftBox className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <SoftCard variant="gradient" gradientType={stat.color as any}>
              <SoftBox p={3} textAlign="center">
                <Icon icon={stat.icon} className="text-5xl mb-3" />
                <SoftTypography variant="h3" color="white" fontWeight="bold">
                  {stat.value}
                </SoftTypography>
                <SoftTypography variant="body2" color="white" className="mb-2">
                  {stat.title}
                </SoftTypography>
                <SoftTypography variant="caption" color="white">
                  {stat.trend} this month
                </SoftTypography>
              </SoftBox>
            </SoftCard>
          </div>
        ))}
      </SoftBox>

      {/* Recent Events */}
      <div className="row gy-4">
        <div className="col-lg-8">
          <SoftCard>
            <SoftBox p={3}>
              <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
                Recent Events
              </SoftTypography>
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
                        <td>
                          <SoftTypography variant="body2" fontWeight="medium">
                            {event.name}
                          </SoftTypography>
                        </td>
                        <td>{event.date}</td>
                        <td>{event.attendees}/{event.capacity}</td>
                        <td>
                          <SoftBadge 
                            variant={
                              event.status === 'published' ? 'success' :
                              event.status === 'draft' ? 'warning' :
                              event.status === 'completed' ? 'info' : 'error'
                            }
                            size="sm"
                          >
                            {event.status}
                          </SoftBadge>
                        </td>
                        <td>
                          <SoftBox display="flex" className="gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <Icon icon="mdi:pencil" />
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <Icon icon="mdi:delete" />
                            </button>
                          </SoftBox>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SoftBox>
          </SoftCard>
        </div>

        <div className="col-lg-4">
          <SoftCard>
            <SoftBox p={3}>
              <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
                Quick Actions
              </SoftTypography>
              <SoftBox display="flex" className="flex-column gap-3">
                <SoftButton variant="gradient" color="primary" fullWidth onClick={handleCreateEvent}>
                  <Icon icon="mdi:plus" className="mr-2" />
                  Create Event
                </SoftButton>
                <SoftButton variant="gradient" color="info" fullWidth>
                  <Icon icon="mdi:account-plus" className="mr-2" />
                  Add User
                </SoftButton>
                <SoftButton variant="gradient" color="success" fullWidth>
                  <Icon icon="mdi:email" className="mr-2" />
                  Send Announcement
                </SoftButton>
                <SoftButton variant="gradient" color="warning" fullWidth>
                  <Icon icon="mdi:chart-bar" className="mr-2" />
                  View Analytics
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftCard>
        </div>
      </div>
    </SoftBox>
  );

  const renderEvents = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
          <SoftTypography variant="h5" fontWeight="bold">
            Event Management
          </SoftTypography>
          <SoftButton variant="gradient" color="primary" onClick={handleCreateEvent}>
            <Icon icon="mdi:plus" className="mr-2" />
            Create Event
          </SoftButton>
        </SoftBox>
        
        <div className="row gy-4">
          {events.map(event => (
            <div className="col-md-6" key={event.id}>
              <SoftCard variant="default">
                <SoftBox p={3}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" className="mb-3">
                    <SoftTypography variant="h6" fontWeight="bold">
                      {event.name}
                    </SoftTypography>
                    <SoftBadge 
                      variant={
                        event.status === 'published' ? 'success' :
                        event.status === 'draft' ? 'warning' :
                        event.status === 'completed' ? 'info' : 'error'
                      }
                      size="sm"
                    >
                      {event.status}
                    </SoftBadge>
                  </SoftBox>
                  
                  <SoftBox className="mb-3">
                    <SoftBox display="flex" alignItems="center" className="mb-2">
                      <Icon icon="mdi:calendar" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {event.date}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center">
                      <Icon icon="mdi:account-group" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {event.attendees}/{event.capacity} attendees
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  
                  <div className="progress mb-3" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary-500" 
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                    />
                  </div>
                  
                  <SoftBox display="flex" className="gap-2">
                    <SoftButton variant="outline" color="primary" size="sm" onClick={() => handleEditEvent(event.id)}>
                      Edit
                    </SoftButton>
                    <SoftButton variant="outline" color="error" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                      Delete
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftCard>
            </div>
          ))}
        </div>
      </SoftBox>
    </SoftCard>
  );

  const renderUsers = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
          <SoftTypography variant="h5" fontWeight="bold">
            User Management
          </SoftTypography>
          <SoftButton variant="gradient" color="primary">
            <Icon icon="mdi:account-plus" className="mr-2" />
            Add User
          </SoftButton>
        </SoftBox>

        <div className="table-responsive">
          <table className="table table-hover">
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
                  <td>
                    <SoftTypography variant="body2" fontWeight="medium">
                      {user.name}
                    </SoftTypography>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <SoftBadge
                      variant={
                        user.role === 'admin' ? 'error' :
                        user.role === 'speaker' ? 'info' : 'success'
                      }
                      size="sm"
                    >
                      {user.role}
                    </SoftBadge>
                  </td>
                  <td>
                    <SoftBadge variant={user.status === 'active' ? 'success' : 'error'} size="sm">
                      {user.status}
                    </SoftBadge>
                  </td>
                  <td>{user.joinedDate}</td>
                  <td>
                    <SoftBox display="flex" className="gap-2">
                      <button className="btn btn-sm btn-outline-primary">
                        <Icon icon="mdi:pencil" />
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <Icon icon="mdi:delete" />
                      </button>
                    </SoftBox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftBox>
    </SoftCard>
  );

  const renderTickets = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
          Ticket Management
        </SoftTypography>

        <div className="table-responsive">
          <table className="table table-hover">
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
                  <td>
                    <SoftTypography variant="body2" fontWeight="medium">
                      {ticket.eventName}
                    </SoftTypography>
                  </td>
                  <td>
                    <SoftBadge variant="info" size="sm">{ticket.tier}</SoftBadge>
                  </td>
                  <td>${ticket.price}</td>
                  <td>{ticket.sold}</td>
                  <td>{ticket.available}</td>
                  <td className="fw-bold text-success-main">${ticket.sold * ticket.price}</td>
                  <td>
                    <SoftBox display="flex" className="gap-2">
                      <button className="btn btn-sm btn-outline-primary">
                        <Icon icon="mdi:pencil" />
                      </button>
                    </SoftBox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftBox>
    </SoftCard>
  );

  const renderAnalytics = () => (
    <SoftBox>
      <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
        Analytics Dashboard
      </SoftTypography>

      <div className="row gy-4 mb-4">
        <div className="col-md-3">
          <SoftCard variant="gradient" gradientType="primary">
            <SoftBox p={3} textAlign="center">
              <SoftTypography variant="h4" color="white" fontWeight="bold">
                {events.length}
              </SoftTypography>
              <SoftTypography variant="body2" color="white">
                Total Events
              </SoftTypography>
            </SoftBox>
          </SoftCard>
        </div>
        <div className="col-md-3">
          <SoftCard variant="gradient" gradientType="info">
            <SoftBox p={3} textAlign="center">
              <SoftTypography variant="h4" color="white" fontWeight="bold">
                {users.length}
              </SoftTypography>
              <SoftTypography variant="body2" color="white">
                Total Users
              </SoftTypography>
            </SoftBox>
          </SoftCard>
        </div>
        <div className="col-md-3">
          <SoftCard variant="gradient" gradientType="success">
            <SoftBox p={3} textAlign="center">
              <SoftTypography variant="h4" color="white" fontWeight="bold">
                {tickets.reduce((sum, t) => sum + t.sold, 0)}
              </SoftTypography>
              <SoftTypography variant="body2" color="white">
                Tickets Sold
              </SoftTypography>
            </SoftBox>
          </SoftCard>
        </div>
        <div className="col-md-3">
          <SoftCard variant="gradient" gradientType="warning">
            <SoftBox p={3} textAlign="center">
              <SoftTypography variant="h4" color="white" fontWeight="bold">
                $12,450
              </SoftTypography>
              <SoftTypography variant="body2" color="white">
                Total Revenue
              </SoftTypography>
            </SoftBox>
          </SoftCard>
        </div>
      </div>

      {/* Analytics Charts */}
      <AnalyticsDashboard />
    </SoftBox>
  );

  const renderMessages = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
          <SoftTypography variant="h5" fontWeight="bold">
            Announcements & Messages
          </SoftTypography>
          <SoftButton variant="gradient" color="primary">
            <Icon icon="mdi:email-plus" className="mr-2" />
            New Announcement
          </SoftButton>
        </SoftBox>

        <div className="row gy-3">
          <div className="col-12">
            <label className="form-label fw-bold">Subject</label>
            <input type="text" className="form-control" placeholder="Enter announcement subject" />
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
            <SoftButton variant="gradient" color="primary">
              <Icon icon="mdi:send" className="mr-2" />
              Send Announcement
            </SoftButton>
          </div>
        </div>
      </SoftBox>
    </SoftCard>
  );

  const renderSettings = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
          System Settings
        </SoftTypography>

        <div className="row gy-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Organization Name</label>
            <input type="text" className="form-control" defaultValue="Incubation Platform" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Contact Email</label>
            <input type="email" className="form-control" defaultValue="admin@incubation.com" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Default Event Capacity</label>
            <input type="number" className="form-control" defaultValue="100" />
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
            <SoftBox display="flex" className="gap-3">
              <SoftButton variant="gradient" color="primary">
                Save Settings
              </SoftButton>
              <SoftButton variant="outline" color="secondary">
                Reset to Default
              </SoftButton>
            </SoftBox>
          </div>
        </div>
      </SoftBox>
    </SoftCard>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'events', label: 'Events', icon: 'mdi:calendar-multiple' },
    { id: 'users', label: 'Users', icon: 'mdi:account-group' },
    { id: 'tickets', label: 'Tickets', icon: 'mdi:ticket' },
    { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-bar' },
    { id: 'messages', label: 'Messages', icon: 'mdi:email' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  return (
    <SoftBox>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
        <SoftTypography variant="h4" fontWeight="bold">
          ⚙️ Admin Dashboard
        </SoftTypography>
      </SoftBox>

      {/* Tabs */}
      <SoftCard className="mb-4">
        <SoftBox p={0}>
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
        </SoftBox>
      </SoftCard>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </SoftBox>
  );
};

export default AdminDashboard;

