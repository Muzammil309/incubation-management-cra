import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton, WowBadge, WowTable } from '../../components/wowdash';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'equipment' | 'facilities'>('rooms');

  const stats = [
    {
      title: 'Total Resources',
      value: '48',
      icon: 'mdi:package-variant',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+5', isPositive: true, label: 'New this month' },
    },
    {
      title: 'Meeting Rooms',
      value: '12',
      icon: 'mdi:door',
      iconBgColor: 'bg-info-500',
      gradientClass: 'bg-gradient-start-3',
      trend: { value: '8', isPositive: true, label: 'Available now' },
    },
    {
      title: 'Equipment',
      value: '28',
      icon: 'mdi:laptop',
      iconBgColor: 'bg-purple',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '22', isPositive: true, label: 'In good condition' },
    },
    {
      title: 'Facilities',
      value: '8',
      icon: 'mdi:office-building',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '100%', isPositive: true, label: 'Operational' },
    },
  ];

  const meetingRooms = [
    {
      id: 'MR-001',
      name: 'Innovation Hub',
      capacity: 20,
      floor: '3rd Floor',
      amenities: 'Projector, Whiteboard, Video Conferencing',
      status: 'available',
      nextBooking: '2:00 PM',
    },
    {
      id: 'MR-002',
      name: 'Collaboration Space',
      capacity: 10,
      floor: '2nd Floor',
      amenities: 'TV Screen, Whiteboard',
      status: 'occupied',
      nextBooking: '4:00 PM',
    },
    {
      id: 'MR-003',
      name: 'Executive Boardroom',
      capacity: 15,
      floor: '4th Floor',
      amenities: 'Projector, Video Conferencing, Coffee Machine',
      status: 'available',
      nextBooking: 'Tomorrow 9:00 AM',
    },
  ];

  const equipment = [
    {
      id: 'EQ-001',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      quantity: 5,
      available: 3,
      condition: 'Excellent',
      lastMaintenance: '2024-01-10',
    },
    {
      id: 'EQ-002',
      name: 'Projector - Epson',
      category: 'Presentation',
      quantity: 3,
      available: 2,
      condition: 'Good',
      lastMaintenance: '2024-01-05',
    },
    {
      id: 'EQ-003',
      name: '3D Printer',
      category: 'Manufacturing',
      quantity: 2,
      available: 1,
      condition: 'Good',
      lastMaintenance: '2023-12-20',
    },
  ];

  const facilities = [
    {
      id: 'FAC-001',
      name: 'Co-Working Space',
      type: 'Workspace',
      capacity: 50,
      occupancy: 35,
      status: 'operational',
      hours: '24/7',
    },
    {
      id: 'FAC-002',
      name: 'Cafeteria',
      type: 'Dining',
      capacity: 40,
      occupancy: 15,
      status: 'operational',
      hours: '8:00 AM - 6:00 PM',
    },
    {
      id: 'FAC-003',
      name: 'Gym & Wellness',
      type: 'Recreation',
      capacity: 20,
      occupancy: 8,
      status: 'operational',
      hours: '6:00 AM - 10:00 PM',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
      available: 'success',
      occupied: 'warning',
      operational: 'success',
      maintenance: 'danger',
    };
    return <WowBadge variant={variants[status] || 'secondary'}>{status.toUpperCase()}</WowBadge>;
  };

  const roomColumns = [
    { key: 'id', label: 'Room ID' },
    { key: 'name', label: 'Room Name' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'floor', label: 'Location' },
    { key: 'amenities', label: 'Amenities' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    { key: 'nextBooking', label: 'Next Booking' },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-primary-500 hover:text-primary-700">
            <Icon icon="mdi:calendar" className="text-xl" />
          </button>
          <button className="text-info-500 hover:text-info-700">
            <Icon icon="mdi:pencil" className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const equipmentColumns = [
    { key: 'id', label: 'Equipment ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { 
      key: 'available', 
      label: 'Availability',
      render: (value: number, row: any) => `${value}/${row.quantity}`,
    },
    { key: 'condition', label: 'Condition' },
    { key: 'lastMaintenance', label: 'Last Maintenance' },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-success-500 hover:text-success-700">
            <Icon icon="mdi:check-circle" className="text-xl" />
          </button>
          <button className="text-warning-500 hover:text-warning-700">
            <Icon icon="mdi:wrench" className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const facilityColumns = [
    { key: 'id', label: 'Facility ID' },
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { 
      key: 'occupancy', 
      label: 'Occupancy',
      render: (value: number, row: any) => (
        <div className="flex items-center gap-2">
          <span>{value}/{row.capacity}</span>
          <div className="w-20 bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full" 
              style={{ width: `${(value / row.capacity) * 100}%` }}
            />
          </div>
        </div>
      ),
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    { key: 'hours', label: 'Operating Hours' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rooms':
        return <WowTable columns={roomColumns} data={meetingRooms} hoverable striped />;
      case 'equipment':
        return <WowTable columns={equipmentColumns} data={equipment} hoverable striped />;
      case 'facilities':
        return <WowTable columns={facilityColumns} data={facilities} hoverable striped />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 fw-bold text-neutral-900">Resources & Assets</h4>
              <p className="text-neutral-600 mb-0">Manage meeting rooms, equipment, and facilities</p>
            </div>
            <WowButton variant="primary">
              <Icon icon="mdi:plus" className="mr-2" />
              Add Resource
            </WowButton>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <WowCard>
            <div className="d-flex gap-2 flex-wrap">
              <WowButton 
                variant={activeTab === 'rooms' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('rooms')}
              >
                <Icon icon="mdi:door" className="mr-2" />
                Meeting Rooms
              </WowButton>
              <WowButton 
                variant={activeTab === 'equipment' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('equipment')}
              >
                <Icon icon="mdi:laptop" className="mr-2" />
                Equipment
              </WowButton>
              <WowButton 
                variant={activeTab === 'facilities' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('facilities')}
              >
                <Icon icon="mdi:office-building" className="mr-2" />
                Facilities
              </WowButton>
            </div>
          </WowCard>
        </div>
      </div>

      {/* Content */}
      <div className="row">
        <div className="col-12">
          <WowCard title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`}>
            {renderContent()}
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

