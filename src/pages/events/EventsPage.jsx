import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingEvents = [
        {
            id: 1,
            title: "Pitch Day - Cohort 3",
            date: "2024-01-15",
            time: "2:00 PM",
            type: "Pitch Session",
            location: "Main Auditorium",
            attendees: 45,
            status: "Confirmed",
            priority: "High"
        },
        {
            id: 2,
            title: "Mentor Networking Event",
            date: "2024-01-18",
            time: "6:00 PM",
            type: "Networking",
            location: "Conference Room A",
            attendees: 28,
            status: "Confirmed",
            priority: "Medium"
        },
        {
            id: 3,
            title: "Demo Day Preparation",
            date: "2024-01-22",
            time: "10:00 AM",
            type: "Workshop",
            location: "Training Room",
            attendees: 15,
            status: "Planning",
            priority: "Low"
        }
    ];

    const pastEvents = [
        {
            id: 4,
            title: "Startup Bootcamp",
            date: "2024-01-05",
            time: "9:00 AM",
            type: "Workshop",
            location: "Main Hall",
            attendees: 32,
            status: "Completed",
            feedback: 4.8
        },
        {
            id: 5,
            title: "Investor Meetup",
            date: "2024-01-02",
            time: "3:00 PM",
            type: "Networking",
            location: "VIP Lounge",
            attendees: 18,
            status: "Completed",
            feedback: 4.6
        }
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">📅 Event Management</h6>
                <button className="btn btn-primary-600 radius-8 px-20 py-11">
                    <Icon icon="ic:baseline-plus" className="text-xl" />
                    Create Event
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row row-cols-xxxl-4 row-cols-lg-2 row-cols-sm-2 row-cols-1 gy-4 mb-24">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Events</p>
                                    <h6 className="mb-0">24</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:calendar-multiple" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">This Month</p>
                                    <h6 className="mb-0">8</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:calendar-clock" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Avg Attendance</p>
                                    <h6 className="mb-0">85%</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:account-group" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">Avg Rating</p>
                                    <h6 className="mb-0">4.7 ⭐</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:star" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Tabs */}
            <div className="card">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Events</h6>
                        <div className="d-flex gap-2">
                            <button 
                                className={`btn ${activeTab === 'upcoming' ? 'btn-primary-600' : 'btn-outline-primary-600'} radius-8 px-16 py-8`}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                Upcoming
                            </button>
                            <button 
                                className={`btn ${activeTab === 'past' ? 'btn-primary-600' : 'btn-outline-primary-600'} radius-8 px-16 py-8`}
                                onClick={() => setActiveTab('past')}
                            >
                                Past Events
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-24">
                    {activeTab === 'upcoming' ? (
                        <div className="row gy-4">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="col-lg-4 col-md-6">
                                    <div className="card border h-100">
                                        <div className="card-body p-20">
                                            <div className="d-flex align-items-center justify-content-between mb-16">
                                                <span className={`badge text-sm fw-semibold px-12 py-4 radius-4 ${
                                                    event.priority === 'High' ? 'text-danger-600 bg-danger-50' :
                                                    event.priority === 'Medium' ? 'text-warning-600 bg-warning-50' :
                                                    'text-success-600 bg-success-50'
                                                }`}>
                                                    {event.priority} Priority
                                                </span>
                                                <span className="text-sm text-secondary-light">{event.type}</span>
                                            </div>
                                            
                                            <h6 className="text-md mb-12">{event.title}</h6>
                                            
                                            <div className="d-flex align-items-center gap-2 mb-8">
                                                <Icon icon="mdi:calendar" className="text-secondary-light" />
                                                <span className="text-sm text-secondary-light">{event.date}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center gap-2 mb-8">
                                                <Icon icon="mdi:clock" className="text-secondary-light" />
                                                <span className="text-sm text-secondary-light">{event.time}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center gap-2 mb-8">
                                                <Icon icon="mdi:map-marker" className="text-secondary-light" />
                                                <span className="text-sm text-secondary-light">{event.location}</span>
                                            </div>
                                            
                                            <div className="d-flex align-items-center gap-2 mb-16">
                                                <Icon icon="mdi:account-group" className="text-secondary-light" />
                                                <span className="text-sm text-secondary-light">{event.attendees} attendees</span>
                                            </div>
                                            
                                            <div className="d-flex gap-8">
                                                <button className="btn btn-outline-primary-600 radius-8 px-12 py-6 flex-fill">
                                                    <Icon icon="mdi:eye" className="text-sm" />
                                                    View
                                                </button>
                                                <button className="btn btn-primary-600 radius-8 px-12 py-6 flex-fill">
                                                    <Icon icon="mdi:pencil" className="text-sm" />
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Event</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Attendees</th>
                                        <th scope="col">Feedback</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pastEvents.map((event) => (
                                        <tr key={event.id}>
                                            <td>
                                                <div>
                                                    <span className="text-md mb-0 fw-medium text-primary-light">{event.title}</span>
                                                    <span className="text-sm text-secondary-light fw-medium d-block">{event.location}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{event.date}</span>
                                            </td>
                                            <td>
                                                <span className="badge text-sm fw-semibold text-info-600 bg-info-50 px-20 py-9 radius-4">{event.type}</span>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-medium text-secondary-light">{event.attendees}</span>
                                            </td>
                                            <td>
                                                <span className="text-warning-main fw-semibold">{event.feedback} ⭐</span>
                                            </td>
                                            <td>
                                                <span className="badge text-sm fw-semibold text-success-600 bg-success-50 px-20 py-9 radius-4">{event.status}</span>
                                            </td>
                                            <td className="text-center">
                                                <button className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle">
                                                    <Icon icon="lucide:eye" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
