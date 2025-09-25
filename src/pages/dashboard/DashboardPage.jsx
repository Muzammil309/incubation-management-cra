import React from 'react';
import { Icon } from '@iconify/react';

const DashboardPage = () => {
    return (
        <div className="dashboard-main-wrapper">
            {/* Welcome Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">🚀 Incubation Management Dashboard</h6>
                <ul className="d-flex align-items-center gap-2">
                    <li className="fw-medium">
                        <a href="#" className="d-flex align-items-center gap-1 hover-text-primary">
                            <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
                            Dashboard
                        </a>
                    </li>
                    <li>-</li>
                    <li className="fw-medium">Overview</li>
                </ul>
            </div>

            {/* KPI Cards */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Active Startups</p>
                                    <h6 className="mb-0">24</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:rocket-launch" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-2 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Mentors</p>
                                    <h6 className="mb-0">18</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:account-supervisor" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-3 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Funding</p>
                                    <h6 className="mb-0">$2.4M</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:currency-usd" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-4 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Success Rate</p>
                                    <h6 className="mb-0">78%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:chart-line" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="row gy-4 mt-1">
                {/* Startup Growth Chart */}
                <div className="col-xxl-6 col-xl-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <h6 className="text-lg mb-0">Startup Growth</h6>
                                <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                                    <span className="text-secondary-light text-sm fw-semibold">New Startups: 
                                        <span className="text-primary-light fw-bold"> 8</span>
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="w-12-px h-12-px rounded-circle bg-yellow"></span>
                                    <span className="text-secondary-light text-sm fw-semibold">In Progress: 
                                        <span className="text-primary-light fw-bold"> 16</span>
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-success-main"></span>
                                    <span className="text-secondary-light text-sm fw-semibold">Graduated: 
                                        <span className="text-primary-light fw-bold"> 12</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment Overview */}
                <div className="col-xxl-6 col-xl-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <h6 className="text-lg mb-0">Investment Overview</h6>
                                <a href="#" className="text-primary-600 hover-text-primary d-flex align-items-center gap-1">
                                    View All
                                    <Icon icon="solar:alt-arrow-right-linear" className="icon" />
                                </a>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-gray-100">
                                    <div className="d-flex align-items-center">
                                        <div className="w-40-px h-40-px rounded-circle bg-primary-50 d-flex justify-content-center align-items-center me-12 overflow-hidden">
                                            <Icon icon="mdi:rocket-launch" className="text-primary-600" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="text-md mb-0">TechFlow AI</h6>
                                            <span className="text-sm text-secondary-light fw-medium">Series A</span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className="text-md mb-0 text-success-main">$500K</h6>
                                        <span className="text-sm text-secondary-light fw-medium">Funded</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-gray-100">
                                    <div className="d-flex align-items-center">
                                        <div className="w-40-px h-40-px rounded-circle bg-success-50 d-flex justify-content-center align-items-center me-12 overflow-hidden">
                                            <Icon icon="mdi:leaf" className="text-success-600" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="text-md mb-0">GreenTech Solutions</h6>
                                            <span className="text-sm text-secondary-light fw-medium">Seed</span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className="text-md mb-0 text-warning-main">$250K</h6>
                                        <span className="text-sm text-secondary-light fw-medium">In Review</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="w-40-px h-40-px rounded-circle bg-info-50 d-flex justify-content-center align-items-center me-12 overflow-hidden">
                                            <Icon icon="mdi:heart-pulse" className="text-info-600" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="text-md mb-0">HealthTech Pro</h6>
                                            <span className="text-sm text-secondary-light fw-medium">Pre-Seed</span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className="text-md mb-0 text-primary-600">$100K</h6>
                                        <span className="text-sm text-secondary-light fw-medium">Approved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentor Activity */}
                <div className="col-xxl-4 col-xl-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <h6 className="text-lg mb-0">Mentor Activity</h6>
                                <a href="#" className="text-primary-600 hover-text-primary d-flex align-items-center gap-1">
                                    View All
                                    <Icon icon="solar:alt-arrow-right-linear" className="icon" />
                                </a>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className="text-secondary-light fw-medium">Active Sessions</span>
                                    <span className="text-primary-light fw-bold">24</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className="text-secondary-light fw-medium">Completed This Week</span>
                                    <span className="text-primary-light fw-bold">18</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className="text-secondary-light fw-medium">Average Rating</span>
                                    <span className="text-warning-main fw-bold">4.8 ⭐</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="text-secondary-light fw-medium">Response Time</span>
                                    <span className="text-success-main fw-bold">2.3 hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="col-xxl-8 col-xl-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <h6 className="text-lg mb-0">Upcoming Events</h6>
                                <a href="#" className="text-primary-600 hover-text-primary d-flex align-items-center gap-1">
                                    View All
                                    <Icon icon="solar:alt-arrow-right-linear" className="icon" />
                                </a>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-gray-100">
                                    <div className="w-50-px h-50-px bg-primary-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                        <Icon icon="solar:calendar-outline" className="text-primary-600 text-xl" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="text-md mb-1">Pitch Day - Cohort 3</h6>
                                        <span className="text-sm text-secondary-light">Tomorrow, 2:00 PM</span>
                                    </div>
                                    <span className="badge text-sm fw-semibold text-primary-600 bg-primary-50 px-20 py-9 radius-4">High Priority</span>
                                </div>
                                <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-gray-100">
                                    <div className="w-50-px h-50-px bg-warning-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                        <Icon icon="solar:users-group-two-rounded-outline" className="text-warning-600 text-xl" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="text-md mb-1">Mentor Networking</h6>
                                        <span className="text-sm text-secondary-light">Friday, 6:00 PM</span>
                                    </div>
                                    <span className="badge text-sm fw-semibold text-warning-600 bg-warning-50 px-20 py-9 radius-4">Medium</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-50-px h-50-px bg-success-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                        <Icon icon="solar:presentation-graph-outline" className="text-success-600 text-xl" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="text-md mb-1">Demo Day Preparation</h6>
                                        <span className="text-sm text-secondary-light">Next Monday, 10:00 AM</span>
                                    </div>
                                    <span className="badge text-sm fw-semibold text-success-600 bg-success-50 px-20 py-9 radius-4">Low</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
