import React from 'react';
import { Icon } from '@iconify/react';

const MentorsPage = () => {
    const mentors = [
        {
            id: 1,
            name: "John Smith",
            expertise: "AI & Machine Learning",
            experience: "15 years",
            rating: 4.9,
            sessions: 24,
            startups: 5,
            status: "Active",
            avatar: "assets/images/users/user1.png"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            expertise: "Clean Energy & Sustainability",
            experience: "12 years",
            rating: 4.8,
            sessions: 18,
            startups: 3,
            status: "Active",
            avatar: "assets/images/users/user2.png"
        },
        {
            id: 3,
            name: "Mike Davis",
            expertise: "Healthcare Technology",
            experience: "10 years",
            rating: 4.7,
            sessions: 15,
            startups: 4,
            status: "Active",
            avatar: "assets/images/users/user3.png"
        },
        {
            id: 4,
            name: "Lisa Chen",
            expertise: "EdTech & Learning",
            experience: "8 years",
            rating: 4.9,
            sessions: 22,
            startups: 6,
            status: "Busy",
            avatar: "assets/images/users/user4.png"
        }
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">👨‍🏫 Mentor Management</h6>
                <button className="btn btn-primary-600 radius-8 px-20 py-11">
                    <Icon icon="ic:baseline-plus" className="text-xl" />
                    Add New Mentor
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Mentors</p>
                                    <h6 className="mb-0">18</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:account-supervisor" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Active Sessions</p>
                                    <h6 className="mb-0">24</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:video" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Avg Rating</p>
                                    <h6 className="mb-0">4.8 ⭐</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:star" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Response Time</p>
                                    <h6 className="mb-0">2.3 hrs</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:clock-fast" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentors Grid */}
            <div className="row gy-4">
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="col-xxl-3 col-lg-4 col-sm-6">
                        <div className="card h-100">
                            <div className="card-body p-24">
                                <div className="text-center">
                                    <div className="w-80-px h-80-px rounded-circle bg-primary-50 d-flex justify-content-center align-items-center mx-auto mb-16">
                                        <Icon icon="mdi:account-supervisor" className="text-primary-600 text-4xl" />
                                    </div>
                                    <h6 className="text-lg mb-4">{mentor.name}</h6>
                                    <span className="text-sm text-secondary-light fw-medium">{mentor.expertise}</span>
                                </div>
                                
                                <div className="mt-20">
                                    <div className="d-flex align-items-center justify-content-between mb-12">
                                        <span className="text-secondary-light text-sm">Experience</span>
                                        <span className="text-primary-light text-sm fw-semibold">{mentor.experience}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-12">
                                        <span className="text-secondary-light text-sm">Rating</span>
                                        <span className="text-warning-main text-sm fw-semibold">{mentor.rating} ⭐</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-12">
                                        <span className="text-secondary-light text-sm">Sessions</span>
                                        <span className="text-primary-light text-sm fw-semibold">{mentor.sessions}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-16">
                                        <span className="text-secondary-light text-sm">Startups</span>
                                        <span className="text-primary-light text-sm fw-semibold">{mentor.startups}</span>
                                    </div>
                                    
                                    <div className="d-flex align-items-center justify-content-between mb-20">
                                        <span className="text-secondary-light text-sm">Status</span>
                                        <span className={`badge text-sm fw-semibold px-12 py-4 radius-4 ${
                                            mentor.status === 'Active' ? 'text-success-600 bg-success-50' : 
                                            'text-warning-600 bg-warning-50'
                                        }`}>
                                            {mentor.status}
                                        </span>
                                    </div>
                                    
                                    <div className="d-flex gap-8">
                                        <button className="btn btn-outline-primary-600 radius-8 px-16 py-8 flex-fill">
                                            <Icon icon="mdi:message" className="text-md" />
                                            Message
                                        </button>
                                        <button className="btn btn-primary-600 radius-8 px-16 py-8 flex-fill">
                                            <Icon icon="mdi:eye" className="text-md" />
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="card mt-24">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Recent Mentor Activity</h6>
                </div>
                <div className="card-body p-24">
                    <div className="d-flex align-items-center gap-3 mb-20 pb-20 border-bottom border-gray-100">
                        <div className="w-40-px h-40-px bg-success-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <Icon icon="mdi:check" className="text-success-600" />
                        </div>
                        <div className="flex-grow-1">
                            <h6 className="text-md mb-4">Session Completed</h6>
                            <span className="text-sm text-secondary-light">John Smith completed a mentoring session with TechFlow AI</span>
                        </div>
                        <span className="text-sm text-secondary-light">2 hours ago</span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 mb-20 pb-20 border-bottom border-gray-100">
                        <div className="w-40-px h-40-px bg-primary-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <Icon icon="mdi:calendar" className="text-primary-600" />
                        </div>
                        <div className="flex-grow-1">
                            <h6 className="text-md mb-4">Session Scheduled</h6>
                            <span className="text-sm text-secondary-light">Sarah Johnson scheduled a session with GreenTech Solutions</span>
                        </div>
                        <span className="text-sm text-secondary-light">4 hours ago</span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3">
                        <div className="w-40-px h-40-px bg-warning-50 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <Icon icon="mdi:star" className="text-warning-600" />
                        </div>
                        <div className="flex-grow-1">
                            <h6 className="text-md mb-4">New Review</h6>
                            <span className="text-sm text-secondary-light">Mike Davis received a 5-star review from HealthTech Pro</span>
                        </div>
                        <span className="text-sm text-secondary-light">6 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorsPage;
