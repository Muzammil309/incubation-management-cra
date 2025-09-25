import React from 'react';
import { Icon } from '@iconify/react';

const StartupsPage = () => {
    const startups = [
        {
            id: 1,
            name: "TechFlow AI",
            industry: "Artificial Intelligence",
            stage: "Series A",
            funding: "$500K",
            status: "Active",
            progress: 75,
            mentor: "John Smith",
            cohort: "Cohort 3"
        },
        {
            id: 2,
            name: "GreenTech Solutions",
            industry: "Clean Energy",
            stage: "Seed",
            funding: "$250K",
            status: "Active",
            progress: 60,
            mentor: "Sarah Johnson",
            cohort: "Cohort 3"
        },
        {
            id: 3,
            name: "HealthTech Pro",
            industry: "Healthcare",
            stage: "Pre-Seed",
            funding: "$100K",
            status: "Active",
            progress: 45,
            mentor: "Mike Davis",
            cohort: "Cohort 2"
        },
        {
            id: 4,
            name: "EduLearn Platform",
            industry: "Education",
            stage: "Seed",
            funding: "$300K",
            status: "Graduated",
            progress: 100,
            mentor: "Lisa Chen",
            cohort: "Cohort 1"
        }
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">🚀 Startup Management</h6>
                <button className="btn btn-primary-600 radius-8 px-20 py-11">
                    <Icon icon="ic:baseline-plus" className="text-xl" />
                    Add New Startup
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Startups</p>
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
                                    <p className="fw-medium text-primary-light mb-1">Active</p>
                                    <h6 className="mb-0">18</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:chart-line" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Graduated</p>
                                    <h6 className="mb-0">6</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:trophy" className="text-white text-2xl mb-0" />
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
                                    <Icon icon="mdi:check-circle" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Startups Table */}
            <div className="card">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">All Startups</h6>
                </div>
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Startup</th>
                                    <th scope="col">Industry</th>
                                    <th scope="col">Stage</th>
                                    <th scope="col">Funding</th>
                                    <th scope="col">Progress</th>
                                    <th scope="col">Mentor</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {startups.map((startup) => (
                                    <tr key={startup.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="w-40-px h-40-px rounded-circle bg-primary-50 d-flex justify-content-center align-items-center me-12 overflow-hidden">
                                                    <Icon icon="mdi:rocket-launch" className="text-primary-600" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <span className="text-md mb-0 fw-medium text-primary-light">{startup.name}</span>
                                                    <span className="text-sm text-secondary-light fw-medium d-block">{startup.cohort}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">{startup.industry}</span>
                                        </td>
                                        <td>
                                            <span className="badge text-sm fw-semibold text-primary-600 bg-primary-50 px-20 py-9 radius-4">{startup.stage}</span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">{startup.funding}</span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="w-100-px bg-primary-50 rounded-pill h-8-px">
                                                    <div 
                                                        className="bg-primary-600 h-100 rounded-pill" 
                                                        style={{width: `${startup.progress}%`}}
                                                    ></div>
                                                </div>
                                                <span className="text-secondary-light font-xs fw-semibold">{startup.progress}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">{startup.mentor}</span>
                                        </td>
                                        <td>
                                            <span className={`badge text-sm fw-semibold px-20 py-9 radius-4 ${
                                                startup.status === 'Active' ? 'text-success-600 bg-success-50' :
                                                startup.status === 'Graduated' ? 'text-primary-600 bg-primary-50' :
                                                'text-warning-600 bg-warning-50'
                                            }`}>
                                                {startup.status}
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
                                                <button className="bg-danger-focus text-danger-600 bg-hover-danger-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                    <Icon icon="lucide:trash-2" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupsPage;
