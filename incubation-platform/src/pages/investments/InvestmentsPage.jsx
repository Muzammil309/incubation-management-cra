import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const InvestmentsPage = () => {
    const [activeTab, setActiveTab] = useState('pipeline');

    const pipelineDeals = [
        {
            id: 1,
            startup: "TechFlow AI",
            industry: "Artificial Intelligence",
            stage: "Series A",
            amount: "$500K",
            valuation: "$5M",
            investor: "Venture Capital Partners",
            status: "Due Diligence",
            progress: 75,
            lastUpdate: "2 days ago"
        },
        {
            id: 2,
            startup: "GreenTech Solutions",
            industry: "Clean Energy",
            stage: "Seed",
            amount: "$250K",
            valuation: "$2M",
            investor: "Green Ventures",
            status: "Term Sheet",
            progress: 60,
            lastUpdate: "1 week ago"
        },
        {
            id: 3,
            startup: "HealthTech Pro",
            industry: "Healthcare",
            stage: "Pre-Seed",
            amount: "$100K",
            valuation: "$1M",
            investor: "Angel Investor Group",
            status: "Initial Review",
            progress: 25,
            lastUpdate: "3 days ago"
        }
    ];

    const completedDeals = [
        {
            id: 4,
            startup: "EduLearn Platform",
            industry: "Education",
            stage: "Seed",
            amount: "$300K",
            valuation: "$3M",
            investor: "EdTech Ventures",
            status: "Funded",
            completedDate: "2024-01-10",
            roi: "340%"
        },
        {
            id: 5,
            startup: "FinTech Innovate",
            industry: "Financial Technology",
            stage: "Series A",
            amount: "$750K",
            valuation: "$8M",
            investor: "Financial Partners",
            status: "Funded",
            completedDate: "2023-12-15",
            roi: "280%"
        }
    ];

    const investors = [
        {
            id: 1,
            name: "Venture Capital Partners",
            type: "VC Fund",
            portfolio: 12,
            totalInvested: "$5.2M",
            avgTicket: "$433K",
            focus: "AI & Tech",
            status: "Active"
        },
        {
            id: 2,
            name: "Green Ventures",
            type: "Impact Fund",
            portfolio: 8,
            totalInvested: "$2.8M",
            avgTicket: "$350K",
            focus: "Clean Energy",
            status: "Active"
        },
        {
            id: 3,
            name: "Angel Investor Group",
            type: "Angel Network",
            portfolio: 15,
            totalInvested: "$1.5M",
            avgTicket: "$100K",
            focus: "Early Stage",
            status: "Active"
        }
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">💰 Investment Management</h6>
                <button className="btn btn-primary-600 radius-8 px-20 py-11">
                    <Icon icon="ic:baseline-plus" className="text-xl" />
                    Add Investment
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Raised</p>
                                    <h6 className="mb-0">$12.4M</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:currency-usd" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Active Deals</p>
                                    <h6 className="mb-0">8</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:handshake" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Success Rate</p>
                                    <h6 className="mb-0">78%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:chart-line" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Avg ROI</p>
                                    <h6 className="mb-0">310%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:trending-up" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Tabs */}
            <div className="card">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Investment Portfolio</h6>
                        <div className="d-flex gap-2">
                            <button 
                                className={`btn ${activeTab === 'pipeline' ? 'btn-primary-600' : 'btn-outline-primary-600'} radius-8 px-16 py-8`}
                                onClick={() => setActiveTab('pipeline')}
                            >
                                Pipeline
                            </button>
                            <button 
                                className={`btn ${activeTab === 'completed' ? 'btn-primary-600' : 'btn-outline-primary-600'} radius-8 px-16 py-8`}
                                onClick={() => setActiveTab('completed')}
                            >
                                Completed
                            </button>
                            <button 
                                className={`btn ${activeTab === 'investors' ? 'btn-primary-600' : 'btn-outline-primary-600'} radius-8 px-16 py-8`}
                                onClick={() => setActiveTab('investors')}
                            >
                                Investors
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-24">
                    {activeTab === 'pipeline' && (
                        <div className="table-responsive">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Startup</th>
                                        <th scope="col">Stage</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Valuation</th>
                                        <th scope="col">Investor</th>
                                        <th scope="col">Progress</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pipelineDeals.map((deal) => (
                                        <tr key={deal.id}>
                                            <td>
                                                <div>
                                                    <span className="text-md mb-0 fw-medium text-primary-light">{deal.startup}</span>
                                                    <span className="text-sm text-secondary-light fw-medium d-block">{deal.industry}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge text-sm fw-semibold text-primary-600 bg-primary-50 px-20 py-9 radius-4">{deal.stage}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.amount}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.valuation}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.investor}</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="w-100-px bg-primary-50 rounded-pill h-8-px">
                                                        <div 
                                                            className="bg-primary-600 h-100 rounded-pill" 
                                                            style={{width: `${deal.progress}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className="text-secondary-light font-xs fw-semibold">{deal.progress}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge text-sm fw-semibold px-20 py-9 radius-4 ${
                                                    deal.status === 'Due Diligence' ? 'text-warning-600 bg-warning-50' :
                                                    deal.status === 'Term Sheet' ? 'text-info-600 bg-info-50' :
                                                    'text-primary-600 bg-primary-50'
                                                }`}>
                                                    {deal.status}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center gap-10 justify-content-center">
                                                    <button className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                        <Icon icon="lucide:eye" />
                                                    </button>
                                                    <button className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                        <Icon icon="lucide:edit" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'completed' && (
                        <div className="table-responsive">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Startup</th>
                                        <th scope="col">Stage</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Investor</th>
                                        <th scope="col">Completed</th>
                                        <th scope="col">ROI</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedDeals.map((deal) => (
                                        <tr key={deal.id}>
                                            <td>
                                                <div>
                                                    <span className="text-md mb-0 fw-medium text-primary-light">{deal.startup}</span>
                                                    <span className="text-sm text-secondary-light fw-medium d-block">{deal.industry}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge text-sm fw-semibold text-primary-600 bg-primary-50 px-20 py-9 radius-4">{deal.stage}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.amount}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.investor}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{deal.completedDate}</span>
                                            </td>
                                            <td>
                                                <span className="text-success-main fw-semibold">{deal.roi}</span>
                                            </td>
                                            <td>
                                                <span className="badge text-sm fw-semibold text-success-600 bg-success-50 px-20 py-9 radius-4">{deal.status}</span>
                                            </td>
                                            <td className="text-center">
                                                <button className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                    <Icon icon="lucide:eye" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'investors' && (
                        <div className="row gy-4">
                            {investors.map((investor) => (
                                <div key={investor.id} className="col-lg-4 col-md-6">
                                    <div className="card border h-100">
                                        <div className="card-body p-20">
                                            <div className="text-center mb-16">
                                                <div className="w-60-px h-60-px bg-primary-50 rounded-circle d-flex justify-content-center align-items-center mx-auto mb-12">
                                                    <Icon icon="mdi:account-tie" className="text-primary-600 text-2xl" />
                                                </div>
                                                <h6 className="text-md mb-4">{investor.name}</h6>
                                                <span className="text-sm text-secondary-light">{investor.type}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center justify-content-between mb-8">
                                                <span className="text-secondary-light text-sm">Portfolio</span>
                                                <span className="text-primary-light text-sm fw-semibold">{investor.portfolio} companies</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center justify-content-between mb-8">
                                                <span className="text-secondary-light text-sm">Total Invested</span>
                                                <span className="text-primary-light text-sm fw-semibold">{investor.totalInvested}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center justify-content-between mb-8">
                                                <span className="text-secondary-light text-sm">Avg Ticket</span>
                                                <span className="text-primary-light text-sm fw-semibold">{investor.avgTicket}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center justify-content-between mb-16">
                                                <span className="text-secondary-light text-sm">Focus</span>
                                                <span className="text-primary-light text-sm fw-semibold">{investor.focus}</span>
                                            </div>
                                            
                                            <div className="d-flex gap-8">
                                                <button className="btn btn-outline-primary-600 radius-8 px-12 py-6 flex-fill">
                                                    <Icon icon="mdi:message" className="text-sm" />
                                                    Contact
                                                </button>
                                                <button className="btn btn-primary-600 radius-8 px-12 py-6 flex-fill">
                                                    <Icon icon="mdi:eye" className="text-sm" />
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentsPage;
