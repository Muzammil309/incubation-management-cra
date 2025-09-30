import React, { useState } from 'react';
import SoftBox from '../../components/ui/SoftBox';
import SoftButton from '../../components/ui/SoftButton';
import SoftTypography from '../../components/ui/SoftTypography';
import SoftCard from '../../components/ui/SoftCard';
import SoftBadge from '../../components/ui/SoftBadge';
import { Icon } from '@iconify/react';

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'video' | 'link';
  size: string;
  uploadedAt: string;
  sessionId: string;
}

interface Question {
  id: string;
  question: string;
  askedBy: string;
  sessionId: string;
  answered: boolean;
  answer?: string;
}

interface Feedback {
  id: string;
  sessionId: string;
  rating: number;
  comment: string;
  attendeeName: string;
  date: string;
}

const SpeakerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'Introduction to AI & Machine Learning',
      date: '2024-02-25',
      time: '3:00 PM',
      duration: '90 mins',
      location: 'Tech Lab 1',
      attendees: 45,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Deep Learning Fundamentals',
      date: '2024-02-10',
      time: '2:00 PM',
      duration: '120 mins',
      location: 'Main Auditorium',
      attendees: 78,
      status: 'completed'
    }
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'AI Introduction Slides.pptx',
      type: 'pptx',
      size: '5.2 MB',
      uploadedAt: '2024-02-20',
      sessionId: '1'
    },
    {
      id: '2',
      name: 'Deep Learning Resources.pdf',
      type: 'pdf',
      size: '2.8 MB',
      uploadedAt: '2024-02-08',
      sessionId: '2'
    }
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What are the key differences between supervised and unsupervised learning?',
      askedBy: 'John Smith',
      sessionId: '2',
      answered: true,
      answer: 'Supervised learning uses labeled data while unsupervised learning finds patterns in unlabeled data.'
    },
    {
      id: '2',
      question: 'Can you recommend resources for learning TensorFlow?',
      askedBy: 'Emily Chen',
      sessionId: '2',
      answered: false
    }
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      sessionId: '2',
      rating: 5,
      comment: 'Excellent session! Very informative and well-structured.',
      attendeeName: 'Sarah Johnson',
      date: '2024-02-10'
    },
    {
      id: '2',
      sessionId: '2',
      rating: 4,
      comment: 'Great content, would love more hands-on examples.',
      attendeeName: 'Michael Brown',
      date: '2024-02-10'
    }
  ]);

  const stats = [
    { title: 'Total Sessions', value: sessions.length, icon: 'mdi:presentation', color: 'primary' },
    { title: 'Total Attendees', value: sessions.reduce((sum, s) => sum + s.attendees, 0), icon: 'mdi:account-group', color: 'info' },
    { title: 'Avg Rating', value: '4.8', icon: 'mdi:star', color: 'success' },
    { title: 'Pending Q&A', value: questions.filter(q => !q.answered).length, icon: 'mdi:help-circle', color: 'warning' }
  ];

  const handleAnswerQuestion = (questionId: string, answer: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answered: true, answer } : q
    ));
  };

  const handleUploadMaterial = () => {
    alert('Upload material functionality');
  };

  const handleDeleteMaterial = (materialId: string) => {
    setMaterials(materials.filter(m => m.id !== materialId));
  };

  const renderOverview = () => (
    <SoftBox>
      {/* Stats Cards */}
      <SoftBox display="flex" className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <SoftCard variant="gradient" gradientType={stat.color as any}>
              <SoftBox textAlign="center">
                <Icon icon={stat.icon} className="text-5xl mb-3" />
                <SoftTypography variant="h3" color="white" fontWeight="bold">
                  {stat.value}
                </SoftTypography>
                <SoftTypography variant="body2" color="white">
                  {stat.title}
                </SoftTypography>
              </SoftBox>
            </SoftCard>
          </div>
        ))}
      </SoftBox>

      {/* Upcoming Sessions */}
      <SoftCard className="mb-4">
        <SoftBox p={3}>
          <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
            Upcoming Sessions
          </SoftTypography>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Attendees</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.filter(s => s.status === 'upcoming').map(session => (
                  <tr key={session.id}>
                    <td>
                      <SoftTypography variant="body2" fontWeight="medium">
                        {session.title}
                      </SoftTypography>
                    </td>
                    <td>{session.date} at {session.time}</td>
                    <td>{session.location}</td>
                    <td>{session.attendees}</td>
                    <td>
                      <SoftBadge variant="success" size="sm">Upcoming</SoftBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SoftBox>
      </SoftCard>

      {/* Recent Feedback */}
      <SoftCard>
        <SoftBox p={3}>
          <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
            Recent Feedback
          </SoftTypography>
          {feedbacks.slice(0, 3).map(feedback => (
            <SoftBox key={feedback.id} className="mb-3 pb-3 border-bottom">
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-2">
                <SoftTypography variant="body2" fontWeight="medium">
                  {feedback.attendeeName}
                </SoftTypography>
                <SoftBox display="flex" alignItems="center">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      icon={i < feedback.rating ? 'mdi:star' : 'mdi:star-outline'} 
                      className="text-warning-main"
                    />
                  ))}
                </SoftBox>
              </SoftBox>
              <SoftTypography variant="caption" color="secondary">
                {feedback.comment}
              </SoftTypography>
            </SoftBox>
          ))}
        </SoftBox>
      </SoftCard>
    </SoftBox>
  );

  const renderMySessions = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
          <SoftTypography variant="h5" fontWeight="bold">
            My Sessions
          </SoftTypography>
          <SoftButton variant="gradient" color="primary">
            <Icon icon="mdi:plus" className="mr-2" />
            Add Session
          </SoftButton>
        </SoftBox>
        
        <div className="row gy-4">
          {sessions.map(session => (
            <div className="col-md-6" key={session.id}>
              <SoftCard variant="default">
                <SoftBox p={3}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" className="mb-3">
                    <SoftTypography variant="h6" fontWeight="bold">
                      {session.title}
                    </SoftTypography>
                    <SoftBadge 
                      variant={session.status === 'upcoming' ? 'success' : session.status === 'completed' ? 'info' : 'error'}
                      size="sm"
                    >
                      {session.status}
                    </SoftBadge>
                  </SoftBox>
                  
                  <SoftBox className="mb-3">
                    <SoftBox display="flex" alignItems="center" className="mb-2">
                      <Icon icon="mdi:calendar" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {session.date} at {session.time}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center" className="mb-2">
                      <Icon icon="mdi:clock" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {session.duration}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center" className="mb-2">
                      <Icon icon="mdi:map-marker" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {session.location}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center">
                      <Icon icon="mdi:account-group" className="mr-2 text-neutral-600" />
                      <SoftTypography variant="caption">
                        {session.attendees} attendees
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  
                  <SoftBox display="flex" className="gap-2">
                    <SoftButton variant="outline" color="primary" size="sm">
                      Edit
                    </SoftButton>
                    <SoftButton variant="outline" color="info" size="sm">
                      View Details
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

  const renderMaterials = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
          <SoftTypography variant="h5" fontWeight="bold">
            Session Materials
          </SoftTypography>
          <SoftButton variant="gradient" color="primary" onClick={handleUploadMaterial}>
            <Icon icon="mdi:upload" className="mr-2" />
            Upload Material
          </SoftButton>
        </SoftBox>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(material => (
                <tr key={material.id}>
                  <td>
                    <SoftBox display="flex" alignItems="center">
                      <Icon 
                        icon={
                          material.type === 'pdf' ? 'mdi:file-pdf' :
                          material.type === 'pptx' ? 'mdi:file-powerpoint' :
                          material.type === 'video' ? 'mdi:video' :
                          'mdi:link'
                        } 
                        className="text-2xl mr-2"
                      />
                      <SoftTypography variant="body2" fontWeight="medium">
                        {material.name}
                      </SoftTypography>
                    </SoftBox>
                  </td>
                  <td>
                    <SoftBadge variant="info" size="sm">{material.type.toUpperCase()}</SoftBadge>
                  </td>
                  <td>{material.size}</td>
                  <td>{material.uploadedAt}</td>
                  <td>
                    <SoftBox display="flex" className="gap-2">
                      <button className="btn btn-sm btn-outline-primary">
                        <Icon icon="mdi:download" />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteMaterial(material.id)}
                      >
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

  const renderEngagement = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
          Q&A and Engagement
        </SoftTypography>

        {questions.map(question => (
          <SoftBox key={question.id} className="mb-4 pb-4 border-bottom">
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" className="mb-2">
              <SoftBox>
                <SoftTypography variant="body2" fontWeight="bold" className="mb-1">
                  {question.question}
                </SoftTypography>
                <SoftTypography variant="caption" color="secondary">
                  Asked by {question.askedBy}
                </SoftTypography>
              </SoftBox>
              <SoftBadge variant={question.answered ? 'success' : 'warning'} size="sm">
                {question.answered ? 'Answered' : 'Pending'}
              </SoftBadge>
            </SoftBox>

            {question.answered ? (
              <SoftBox className="mt-3 p-3 bg-light rounded">
                <SoftTypography variant="caption" fontWeight="medium" className="mb-1">
                  Your Answer:
                </SoftTypography>
                <SoftTypography variant="caption">
                  {question.answer}
                </SoftTypography>
              </SoftBox>
            ) : (
              <SoftBox className="mt-3">
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  placeholder="Type your answer..."
                />
                <SoftButton
                  variant="gradient"
                  color="primary"
                  size="sm"
                  onClick={() => handleAnswerQuestion(question.id, 'Sample answer')}
                >
                  Submit Answer
                </SoftButton>
              </SoftBox>
            )}
          </SoftBox>
        ))}
      </SoftBox>
    </SoftCard>
  );

  const renderFeedback = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
          Session Feedback
        </SoftTypography>

        <div className="row gy-4">
          {feedbacks.map(feedback => (
            <div className="col-md-6" key={feedback.id}>
              <SoftCard variant="default">
                <SoftBox p={3}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
                    <SoftTypography variant="body2" fontWeight="bold">
                      {feedback.attendeeName}
                    </SoftTypography>
                    <SoftBox display="flex" alignItems="center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon={i < feedback.rating ? 'mdi:star' : 'mdi:star-outline'}
                          className="text-warning-main"
                        />
                      ))}
                    </SoftBox>
                  </SoftBox>
                  <SoftTypography variant="caption" color="secondary" className="mb-2">
                    {feedback.comment}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    {feedback.date}
                  </SoftTypography>
                </SoftBox>
              </SoftCard>
            </div>
          ))}
        </div>
      </SoftBox>
    </SoftCard>
  );

  const renderSettings = () => (
    <SoftCard>
      <SoftBox p={3}>
        <SoftTypography variant="h5" fontWeight="bold" className="mb-4">
          Speaker Profile Settings
        </SoftTypography>

        <div className="row gy-4">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue="Dr. Sarah Johnson" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" defaultValue="sarah.johnson@example.com" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" defaultValue="+1 234 567 8900" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Expertise</label>
            <input type="text" className="form-control" defaultValue="AI & Machine Learning" />
          </div>
          <div className="col-12">
            <label className="form-label">Bio</label>
            <textarea className="form-control" rows={4} defaultValue="Expert in AI and Machine Learning with 10+ years of experience..." />
          </div>
          <div className="col-12">
            <SoftBox display="flex" className="gap-3">
              <SoftButton variant="gradient" color="primary">
                Save Changes
              </SoftButton>
              <SoftButton variant="outline" color="secondary">
                Cancel
              </SoftButton>
            </SoftBox>
          </div>
        </div>
      </SoftBox>
    </SoftCard>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'sessions', label: 'My Sessions', icon: 'mdi:presentation' },
    { id: 'materials', label: 'Materials', icon: 'mdi:file-document' },
    { id: 'engagement', label: 'Engagement', icon: 'mdi:chat' },
    { id: 'feedback', label: 'Feedback', icon: 'mdi:star' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  return (
    <SoftBox>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" className="mb-4">
        <SoftTypography variant="h4" fontWeight="bold">
          🎤 Speaker Dashboard
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
        {activeTab === 'sessions' && renderMySessions()}
        {activeTab === 'materials' && renderMaterials()}
        {activeTab === 'engagement' && renderEngagement()}
        {activeTab === 'feedback' && renderFeedback()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </SoftBox>
  );
};

export default SpeakerDashboard;

