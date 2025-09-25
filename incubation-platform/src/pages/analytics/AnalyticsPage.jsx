import React from 'react';
import { Icon } from '@iconify/react';

const AnalyticsPage = () => {
    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">📊 Analytics & Insights</h6>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm w-auto bg-base border text-secondary-light">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                    </select>
                    <button className="btn btn-primary-600 radius-8 px-20 py-11">
                        <Icon icon="mdi:download" className="text-xl" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Revenue</p>
                                    <h6 className="mb-0">$2.4M</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:currency-usd" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                    <Icon icon="bxs:up-arrow" className="text-xs" /> +15%
                                </span>
                                vs last quarter
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-2 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Success Rate</p>
                                    <h6 className="mb-0">78%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:chart-line" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                    <Icon icon="bxs:up-arrow" className="text-xs" /> +5%
                                </span>
                                Graduation rate
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-3 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Avg Time to Fund</p>
                                    <h6 className="mb-0">4.2 months</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:clock" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                    <Icon icon="bxs:down-arrow" className="text-xs" /> -0.8
                                </span>
                                months faster
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-4 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">ROI</p>
                                    <h6 className="mb-0">340%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:trending-up" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                    <Icon icon="bxs:up-arrow" className="text-xs" /> +25%
                                </span>
                                Return on investment
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row gy-4">
                {/* Startup Performance Chart */}
                <div className="col-xxl-8 col-xl-12">
                    <div className="card h-100">
                        <div className="card-header border-bottom bg-base py-16 px-24">
                            <h6 className="text-lg fw-semibold mb-0">Startup Performance Over Time</h6>
                        </div>
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center gap-2 mb-20">
                                <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                                <span className="text-secondary-light text-sm fw-semibold">New Startups</span>
                                <span className="w-12-px h-12-px rounded-circle bg-warning ms-20"></span>
                                <span className="text-secondary-light text-sm fw-semibold">Graduated</span>
                                <span className="w-12-px h-12-px rounded-circle bg-success-main ms-20"></span>
                                <span className="text-secondary-light text-sm fw-semibold">Funded</span>
                            </div>
                            
                            {/* Placeholder for chart */}
                            <div className="bg-gray-50 rounded-8 p-40 text-center">
                                <Icon icon="mdi:chart-line" className="text-6xl text-gray-400 mb-16" />
                                <h6 className="text-gray-600 mb-8">Performance Chart</h6>
                                <p className="text-gray-500 text-sm">Chart visualization would be implemented here using a charting library like Chart.js or Recharts</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industry Distribution */}
                <div className="col-xxl-4 col-xl-12">
                    <div className="card h-100">
                        <div className="card-header border-bottom bg-base py-16 px-24">
                            <h6 className="text-lg fw-semibold mb-0">Industry Distribution</h6>
                        </div>
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                                    <span className="text-secondary-light text-sm fw-medium">AI & Tech</span>
                                </div>
                                <span className="text-primary-light text-sm fw-semibold">35%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-warning"></span>
                                    <span className="text-secondary-light text-sm fw-medium">Healthcare</span>
                                </div>
                                <span className="text-primary-light text-sm fw-semibold">25%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-success-main"></span>
                                    <span className="text-secondary-light text-sm fw-medium">Clean Energy</span>
                                </div>
                                <span className="text-primary-light text-sm fw-semibold">20%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-info"></span>
                                    <span className="text-secondary-light text-sm fw-medium">Education</span>
                                </div>
                                <span className="text-primary-light text-sm fw-semibold">15%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="w-12-px h-12-px rounded-circle bg-purple"></span>
                                    <span className="text-secondary-light text-sm fw-medium">Other</span>
                                </div>
                                <span className="text-primary-light text-sm fw-semibold">5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Funding Stages */}
                <div className="col-xxl-6 col-xl-12">
                    <div className="card h-100">
                        <div className="card-header border-bottom bg-base py-16 px-24">
                            <h6 className="text-lg fw-semibold mb-0">Funding Stages</h6>
                        </div>
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center justify-content-between mb-20 pb-20 border-bottom border-gray-100">
                                <div>
                                    <h6 className="text-md mb-4">Pre-Seed</h6>
                                    <span className="text-sm text-secondary-light">8 startups</span>
                                </div>
                                <div className="text-end">
                                    <h6 className="text-md mb-4 text-primary-600">$800K</h6>
                                    <span className="text-sm text-secondary-light">Total funding</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-20 pb-20 border-bottom border-gray-100">
                                <div>
                                    <h6 className="text-md mb-4">Seed</h6>
                                    <span className="text-sm text-secondary-light">10 startups</span>
                                </div>
                                <div className="text-end">
                                    <h6 className="text-md mb-4 text-warning-600">$2.5M</h6>
                                    <span className="text-sm text-secondary-light">Total funding</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-md mb-4">Series A</h6>
                                    <span className="text-sm text-secondary-light">6 startups</span>
                                </div>
                                <div className="text-end">
                                    <h6 className="text-md mb-4 text-success-600">$8.2M</h6>
                                    <span className="text-sm text-secondary-light">Total funding</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="col-xxl-6 col-xl-12">
                    <div className="card h-100">
                        <div className="card-header border-bottom bg-base py-16 px-24">
                            <h6 className="text-lg fw-semibold mb-0">Top Performing Startups</h6>
                        </div>
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-32-px h-32-px bg-primary-50 rounded-circle d-flex justify-content-center align-items-center">
                                        <span className="text-primary-600 fw-bold">1</span>
                                    </div>
                                    <div>
                                        <h6 className="text-md mb-0">TechFlow AI</h6>
                                        <span className="text-sm text-secondary-light">AI & Machine Learning</span>
                                    </div>
                                </div>
                                <span className="text-success-main fw-semibold">95%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-16">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-32-px h-32-px bg-warning-50 rounded-circle d-flex justify-content-center align-items-center">
                                        <span className="text-warning-600 fw-bold">2</span>
                                    </div>
                                    <div>
                                        <h6 className="text-md mb-0">EduLearn Platform</h6>
                                        <span className="text-sm text-secondary-light">Education Technology</span>
                                    </div>
                                </div>
                                <span className="text-success-main fw-semibold">92%</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-32-px h-32-px bg-info-50 rounded-circle d-flex justify-content-center align-items-center">
                                        <span className="text-info-600 fw-bold">3</span>
                                    </div>
                                    <div>
                                        <h6 className="text-md mb-0">GreenTech Solutions</h6>
                                        <span className="text-sm text-secondary-light">Clean Energy</span>
                                    </div>
                                </div>
                                <span className="text-success-main fw-semibold">88%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
