import React from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton, WowBadge, WowTable } from '../../components/wowdash';

const DocumentsPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Documents',
      value: '248',
      icon: 'mdi:file-document-multiple',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+18', isPositive: true, label: 'This month' },
    },
    {
      title: 'Pending Signatures',
      value: '12',
      icon: 'mdi:file-sign',
      iconBgColor: 'bg-warning-500',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '5', isPositive: true, label: 'Urgent' },
    },
    {
      title: 'Compliance Rate',
      value: '96%',
      icon: 'mdi:shield-check',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '+2%', isPositive: true, label: 'This quarter' },
    },
    {
      title: 'Expiring Soon',
      value: '8',
      icon: 'mdi:clock-alert',
      iconBgColor: 'bg-danger-500',
      gradientClass: 'bg-gradient-start-5',
      trend: { value: '3', isPositive: false, label: 'Within 30 days' },
    },
  ];

  const documents = [
    {
      id: 'DOC-001',
      name: 'Incubation Agreement - TechVision AI',
      type: 'Contract',
      startup: 'TechVision AI',
      uploadDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
      size: '2.4 MB',
    },
    {
      id: 'DOC-002',
      name: 'NDA - GreenEnergy Solutions',
      type: 'Legal',
      startup: 'GreenEnergy Solutions',
      uploadDate: '2024-01-10',
      expiryDate: '2024-07-10',
      status: 'pending-signature',
      size: '1.2 MB',
    },
    {
      id: 'DOC-003',
      name: 'IP Assignment Agreement',
      type: 'Legal',
      startup: 'HealthTrack Pro',
      uploadDate: '2024-01-08',
      expiryDate: 'N/A',
      status: 'active',
      size: '3.1 MB',
    },
    {
      id: 'DOC-004',
      name: 'Compliance Certificate Q4 2023',
      type: 'Compliance',
      startup: 'FinanceFlow',
      uploadDate: '2023-12-28',
      expiryDate: '2024-03-31',
      status: 'expiring-soon',
      size: '856 KB',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      active: 'success',
      'pending-signature': 'warning',
      'expiring-soon': 'danger',
      expired: 'danger',
      draft: 'info',
    };
    return <WowBadge variant={variants[status]}>{status.replace('-', ' ').toUpperCase()}</WowBadge>;
  };

  const columns = [
    { key: 'id', label: 'Document ID' },
    { key: 'name', label: 'Document Name' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => <WowBadge variant="secondary">{value}</WowBadge>,
    },
    { key: 'startup', label: 'Startup' },
    { key: 'uploadDate', label: 'Upload Date' },
    { key: 'expiryDate', label: 'Expiry Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-primary-500 hover:text-primary-700">
            <Icon icon="mdi:download" className="text-xl" />
          </button>
          <button className="text-info-500 hover:text-info-700">
            <Icon icon="mdi:eye" className="text-xl" />
          </button>
          <button className="text-success-500 hover:text-success-700">
            <Icon icon="mdi:file-sign" className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 fw-bold text-neutral-900">Documents & Compliance</h4>
              <p className="text-neutral-600 mb-0">Manage legal documents, contracts, and compliance requirements</p>
            </div>
            <WowButton variant="primary">
              <Icon icon="mdi:upload" className="mr-2" />
              Upload Document
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

      {/* Documents Table */}
      <div className="row">
        <div className="col-12">
          <WowCard title="All Documents" subtitle="Manage all legal documents and contracts">
            <WowTable columns={columns} data={documents} hoverable striped />
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;

