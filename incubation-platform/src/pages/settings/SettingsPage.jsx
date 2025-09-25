import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@incubation.com',
        phone: '+1 (555) 123-4567',
        role: 'Admin',
        organization: 'TechStart Incubator'
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">⚙️ Settings</h6>
                <button className="btn btn-primary-600 radius-8 px-20 py-11">
                    <Icon icon="mdi:content-save" className="text-xl" />
                    Save Changes
                </button>
            </div>

            <div className="row">
                {/* Settings Navigation */}
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                <button 
                                    className={`list-group-item list-group-item-action border-0 px-24 py-16 ${activeTab === 'profile' ? 'active bg-primary-50 text-primary-600' : ''}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <Icon icon="mdi:account" className="me-8" />
                                    Profile Settings
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action border-0 px-24 py-16 ${activeTab === 'security' ? 'active bg-primary-50 text-primary-600' : ''}`}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <Icon icon="mdi:shield-lock" className="me-8" />
                                    Security
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action border-0 px-24 py-16 ${activeTab === 'notifications' ? 'active bg-primary-50 text-primary-600' : ''}`}
                                    onClick={() => setActiveTab('notifications')}
                                >
                                    <Icon icon="mdi:bell" className="me-8" />
                                    Notifications
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action border-0 px-24 py-16 ${activeTab === 'platform' ? 'active bg-primary-50 text-primary-600' : ''}`}
                                    onClick={() => setActiveTab('platform')}
                                >
                                    <Icon icon="mdi:cog" className="me-8" />
                                    Platform Settings
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action border-0 px-24 py-16 ${activeTab === 'integrations' ? 'active bg-primary-50 text-primary-600' : ''}`}
                                    onClick={() => setActiveTab('integrations')}
                                >
                                    <Icon icon="mdi:puzzle" className="me-8" />
                                    Integrations
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="col-lg-9">
                    {activeTab === 'profile' && (
                        <div className="card">
                            <div className="card-header border-bottom bg-base py-16 px-24">
                                <h6 className="text-lg fw-semibold mb-0">Profile Information</h6>
                            </div>
                            <div className="card-body p-24">
                                <div className="row">
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">First Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control radius-8" 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">Last Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control radius-8" 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control radius-8" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className="form-control radius-8" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">Role</label>
                                        <select 
                                            className="form-select radius-8" 
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Program Manager">Program Manager</option>
                                            <option value="Mentor">Mentor</option>
                                            <option value="Investor">Investor</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-20">
                                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">Organization</label>
                                        <input 
                                            type="text" 
                                            className="form-control radius-8" 
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card">
                            <div className="card-header border-bottom bg-base py-16 px-24">
                                <h6 className="text-lg fw-semibold mb-0">Security Settings</h6>
                            </div>
                            <div className="card-body p-24">
                                <div className="mb-24">
                                    <h6 className="text-md mb-16">Change Password</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Current Password</label>
                                            <input type="password" className="form-control radius-8" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">New Password</label>
                                            <input type="password" className="form-control radius-8" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Confirm New Password</label>
                                            <input type="password" className="form-control radius-8" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-24">
                                    <h6 className="text-md mb-16">Two-Factor Authentication</h6>
                                    <div className="d-flex align-items-center justify-content-between p-16 bg-gray-50 rounded-8">
                                        <div>
                                            <h6 className="text-sm mb-4">Enable 2FA</h6>
                                            <span className="text-xs text-secondary-light">Add an extra layer of security to your account</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="twoFactorAuth" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h6 className="text-md mb-16">Login Sessions</h6>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8 mb-12">
                                        <div className="d-flex align-items-center gap-3">
                                            <Icon icon="mdi:laptop" className="text-primary-600 text-xl" />
                                            <div>
                                                <h6 className="text-sm mb-4">Windows - Chrome</h6>
                                                <span className="text-xs text-secondary-light">Current session • New York, US</span>
                                            </div>
                                        </div>
                                        <span className="badge text-xs fw-semibold text-success-600 bg-success-50 px-12 py-4 radius-4">Active</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8">
                                        <div className="d-flex align-items-center gap-3">
                                            <Icon icon="mdi:cellphone" className="text-secondary-light text-xl" />
                                            <div>
                                                <h6 className="text-sm mb-4">iPhone - Safari</h6>
                                                <span className="text-xs text-secondary-light">2 hours ago • New York, US</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-danger-600 radius-8 px-12 py-4 text-xs">Revoke</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="card">
                            <div className="card-header border-bottom bg-base py-16 px-24">
                                <h6 className="text-lg fw-semibold mb-0">Notification Preferences</h6>
                            </div>
                            <div className="card-body p-24">
                                <div className="mb-24">
                                    <h6 className="text-md mb-16">Email Notifications</h6>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8 mb-12">
                                        <div>
                                            <h6 className="text-sm mb-4">New Startup Applications</h6>
                                            <span className="text-xs text-secondary-light">Get notified when new startups apply to your program</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" defaultChecked />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8 mb-12">
                                        <div>
                                            <h6 className="text-sm mb-4">Investment Updates</h6>
                                            <span className="text-xs text-secondary-light">Receive updates on investment deals and funding rounds</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" defaultChecked />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8">
                                        <div>
                                            <h6 className="text-sm mb-4">Event Reminders</h6>
                                            <span className="text-xs text-secondary-light">Get reminded about upcoming events and deadlines</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h6 className="text-md mb-16">Push Notifications</h6>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8 mb-12">
                                        <div>
                                            <h6 className="text-sm mb-4">Mentor Messages</h6>
                                            <span className="text-xs text-secondary-light">Get notified when mentors send messages</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-16 border rounded-8">
                                        <div>
                                            <h6 className="text-sm mb-4">System Updates</h6>
                                            <span className="text-xs text-secondary-light">Receive notifications about platform updates</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'platform' && (
                        <div className="card">
                            <div className="card-header border-bottom bg-base py-16 px-24">
                                <h6 className="text-lg fw-semibold mb-0">Platform Configuration</h6>
                            </div>
                            <div className="card-body p-24">
                                <div className="mb-24">
                                    <h6 className="text-md mb-16">General Settings</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Platform Name</label>
                                            <input type="text" className="form-control radius-8" defaultValue="TechStart Incubator" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Time Zone</label>
                                            <select className="form-select radius-8">
                                                <option>UTC-5 (Eastern Time)</option>
                                                <option>UTC-8 (Pacific Time)</option>
                                                <option>UTC+0 (GMT)</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Currency</label>
                                            <select className="form-select radius-8">
                                                <option>USD ($)</option>
                                                <option>EUR (€)</option>
                                                <option>GBP (£)</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Date Format</label>
                                            <select className="form-select radius-8">
                                                <option>MM/DD/YYYY</option>
                                                <option>DD/MM/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h6 className="text-md mb-16">Data Management</h6>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-outline-primary-600 radius-8 px-20 py-11">
                                            <Icon icon="mdi:download" className="me-8" />
                                            Export Data
                                        </button>
                                        <button className="btn btn-outline-warning-600 radius-8 px-20 py-11">
                                            <Icon icon="mdi:backup-restore" className="me-8" />
                                            Backup Settings
                                        </button>
                                        <button className="btn btn-outline-danger-600 radius-8 px-20 py-11">
                                            <Icon icon="mdi:delete" className="me-8" />
                                            Clear Cache
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="card">
                            <div className="card-header border-bottom bg-base py-16 px-24">
                                <h6 className="text-lg fw-semibold mb-0">Third-Party Integrations</h6>
                            </div>
                            <div className="card-body p-24">
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center justify-content-between p-20 border rounded-8">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="w-40-px h-40-px bg-primary-50 rounded-circle d-flex justify-content-center align-items-center">
                                                    <Icon icon="mdi:slack" className="text-primary-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h6 className="text-sm mb-4">Slack</h6>
                                                    <span className="text-xs text-secondary-light">Team communication</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary-600 radius-8 px-16 py-8 text-sm">Connect</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center justify-content-between p-20 border rounded-8">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="w-40-px h-40-px bg-success-50 rounded-circle d-flex justify-content-center align-items-center">
                                                    <Icon icon="mdi:google-drive" className="text-success-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h6 className="text-sm mb-4">Google Drive</h6>
                                                    <span className="text-xs text-secondary-light">Document storage</span>
                                                </div>
                                            </div>
                                            <span className="badge text-xs fw-semibold text-success-600 bg-success-50 px-12 py-4 radius-4">Connected</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center justify-content-between p-20 border rounded-8">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="w-40-px h-40-px bg-info-50 rounded-circle d-flex justify-content-center align-items-center">
                                                    <Icon icon="mdi:calendar" className="text-info-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h6 className="text-sm mb-4">Google Calendar</h6>
                                                    <span className="text-xs text-secondary-light">Event scheduling</span>
                                                </div>
                                            </div>
                                            <span className="badge text-xs fw-semibold text-success-600 bg-success-50 px-12 py-4 radius-4">Connected</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center justify-content-between p-20 border rounded-8">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="w-40-px h-40-px bg-warning-50 rounded-circle d-flex justify-content-center align-items-center">
                                                    <Icon icon="mdi:email" className="text-warning-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h6 className="text-sm mb-4">Mailchimp</h6>
                                                    <span className="text-xs text-secondary-light">Email marketing</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary-600 radius-8 px-16 py-8 text-sm">Connect</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
