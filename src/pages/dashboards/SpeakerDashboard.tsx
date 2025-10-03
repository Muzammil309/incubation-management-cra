import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  DashboardLayout,
  GradientStatCard,
  TabNavigation,
  DataCard,
  WowButton,
  WowBadge,
  WowInput
} from '../../components/wowdash';
import FileUpload from '../../components/upload/FileUpload';
import FileList from '../../components/upload/FileList';
import Loading from '../../components/ui/Loading';
import { useToast } from '../../hooks/useToast';
import { materialService } from '../../lib/supabaseClient';

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
  const [materialsFromDB, setMaterialsFromDB] = useState<any[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const { showSuccess, showError, ToastContainer } = useToast();

  const [sessions] = useState<Session[]>([
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

  const [feedbacks] = useState<Feedback[]>([
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

  // Fetch materials from Supabase
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoadingMaterials(true);
        // Fetch materials for the first session (or all sessions)
        const sessionId = sessions[0]?.id || 'default-session';
        const data = await materialService.getBySessionId(sessionId);
        setMaterialsFromDB(data);
      } catch (error: any) {
        console.error('Failed to fetch materials:', error);
        showError('Failed to load materials');
      } finally {
        setLoadingMaterials(false);
      }
    };
    fetchMaterials();
  }, [sessions, showError]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'sessions', label: 'My Sessions', icon: 'mdi:presentation', badge: sessions.length },
    { id: 'materials', label: 'Materials', icon: 'mdi:file-document', badge: materialsFromDB.length },
    { id: 'engagement', label: 'Q&A', icon: 'mdi:chat', badge: questions.filter(q => !q.answered).length },
    { id: 'feedback', label: 'Feedback', icon: 'mdi:star' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  const handleAnswerQuestion = (questionId: string, answer: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answered: true, answer } : q
    ));
  };

  // Removed unused handlers - functionality moved to components

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 mb-4">
        <GradientStatCard
          title="Total Sessions"
          value={sessions.length}
          icon="mdi:presentation"
          iconBgColor="bg-cyan"
          gradientClass="bg-gradient-start-1"
          trend={{
            value: `${sessions.filter(s => s.status === 'upcoming').length}`,
            isPositive: true,
            label: 'Upcoming'
          }}
        />
        <GradientStatCard
          title="Total Attendees"
          value={sessions.reduce((sum, s) => sum + s.attendees, 0)}
          icon="mdi:account-group"
          iconBgColor="bg-purple"
          gradientClass="bg-gradient-start-2"
          trend={{
            value: '+15%',
            isPositive: true,
            label: 'This month'
          }}
        />
        <GradientStatCard
          title="Avg Rating"
          value="4.8"
          icon="mdi:star"
          iconBgColor="bg-success-main"
          gradientClass="bg-gradient-start-4"
          trend={{
            value: '+0.3',
            isPositive: true,
            label: 'From last month'
          }}
        />
        <GradientStatCard
          title="Pending Q&A"
          value={questions.filter(q => !q.answered).length}
          icon="mdi:help-circle"
          iconBgColor="bg-red"
          gradientClass="bg-gradient-start-5"
          trend={{
            value: '2',
            isPositive: false,
            label: 'Need response'
          }}
        />
        <GradientStatCard
          title="Materials"
          value={materialsFromDB.length}
          icon="mdi:file-document"
          iconBgColor="bg-info"
          gradientClass="bg-gradient-start-3"
          trend={{
            value: '+3',
            isPositive: true,
            label: 'This week'
          }}
        />
      </div>

      {/* Content */}
      <div className="row gy-4">
        <div className="col-lg-8">
          <DataCard title="Upcoming Sessions" subtitle="Your scheduled presentations">
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
                      <td className="fw-medium">{session.title}</td>
                      <td>{session.date} at {session.time}</td>
                      <td>{session.location}</td>
                      <td>{session.attendees}</td>
                      <td>
                        <WowBadge variant="success">Upcoming</WowBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataCard>
        </div>

        <div className="col-lg-4">
          <DataCard title="Recent Feedback" subtitle="Latest session reviews">
            {feedbacks.slice(0, 3).map(feedback => (
              <div key={feedback.id} className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="fw-medium">{feedback.attendeeName}</div>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < feedback.rating ? 'mdi:star' : 'mdi:star-outline'}
                        className="text-warning-main"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-0">{feedback.comment}</p>
              </div>
            ))}
          </DataCard>
        </div>
      </div>
    </>
  );

  const renderMySessions = () => (
    <DataCard
      title="My Sessions"
      subtitle="Manage your presentations"
      headerAction={
        <WowButton variant="primary" size="sm">
          <Icon icon="mdi:plus" className="mr-2" />
          Add Session
        </WowButton>
      }
    >
      <div className="row gy-4">
        {sessions.map(session => (
          <div className="col-md-6" key={session.id}>
            <div className="card border">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6 className="fw-bold mb-0">{session.title}</h6>
                  <WowBadge
                    variant={session.status === 'upcoming' ? 'success' : session.status === 'completed' ? 'info' : 'danger'}
                  >
                    {session.status}
                  </WowBadge>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Icon icon="mdi:calendar" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{session.date} at {session.time}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Icon icon="mdi:clock" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{session.duration}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Icon icon="mdi:map-marker" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{session.location}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Icon icon="mdi:account-group" className="mr-2 text-neutral-600" />
                    <span className="text-sm">{session.attendees} attendees</span>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <WowButton variant="primary" size="sm">
                    Edit
                  </WowButton>
                  <WowButton variant="info" size="sm">
                    View Details
                  </WowButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DataCard>
  );

  const renderMaterials = () => (
    <>
      <ToastContainer />

      {/* Upload Section */}
      <div className="row gy-4">
        <div className="col-12">
          <DataCard title="Upload Materials" subtitle="Share resources with attendees">
            <FileUpload
              sessionId={sessions[0]?.id || 'default-session'}
              onUploadComplete={(file) => {
                showSuccess('File uploaded successfully!');
                fetchMaterials();
              }}
              maxSizeMB={10}
            />
          </DataCard>
        </div>

        {/* Files List Section */}
        <div className="col-12">
          <DataCard title="Uploaded Materials" subtitle="Manage your session resources">
            {loadingMaterials ? (
              <Loading message="Loading materials..." />
            ) : (
              <FileList
                files={materialsFromDB.map(m => ({
                  id: m.id,
                  name: m.file_name,
                  type: m.file_type,
                  url: m.file_url,
                  upload_date: m.created_at
                }))}
                onFileDeleted={(fileId) => {
                  showSuccess('File deleted successfully!');
                  fetchMaterials();
                }}
              />
            )}
          </DataCard>
        </div>
      </div>
    </>
  );

  const renderEngagement = () => (
    <DataCard title="Q&A and Engagement" subtitle="Answer attendee questions">
      {questions.map(question => (
        <div key={question.id} className="mb-4 pb-4 border-bottom">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div className="fw-bold mb-1">{question.question}</div>
              <div className="text-sm text-neutral-600">Asked by {question.askedBy}</div>
            </div>
            <WowBadge variant={question.answered ? 'success' : 'warning'}>
              {question.answered ? 'Answered' : 'Pending'}
            </WowBadge>
          </div>

          {question.answered ? (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="text-sm fw-medium mb-1">Your Answer:</div>
              <div className="text-sm">{question.answer}</div>
            </div>
          ) : (
            <div className="mt-3">
              <textarea
                className="form-control mb-2"
                rows={3}
                placeholder="Type your answer..."
              />
              <WowButton
                variant="primary"
                size="sm"
                onClick={() => handleAnswerQuestion(question.id, 'Sample answer')}
              >
                Submit Answer
              </WowButton>
            </div>
          )}
        </div>
      ))}
    </DataCard>
  );

  const renderFeedback = () => (
    <DataCard title="Session Feedback" subtitle="Reviews from attendees">
      <div className="row gy-4">
        {feedbacks.map(feedback => (
          <div className="col-md-6" key={feedback.id}>
            <div className="card border">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="fw-bold">{feedback.attendeeName}</div>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < feedback.rating ? 'mdi:star' : 'mdi:star-outline'}
                        className="text-warning-main"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{feedback.comment}</p>
                <p className="text-xs text-neutral-500 mb-0">{feedback.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DataCard>
  );

  const renderSettings = () => (
    <DataCard title="Speaker Profile Settings" subtitle="Manage your profile information">
      <div className="row gy-4">
        <div className="col-md-6">
          <WowInput label="Full Name" value="Dr. Sarah Johnson" />
        </div>
        <div className="col-md-6">
          <WowInput label="Email" value="sarah.johnson@example.com" type="email" />
        </div>
        <div className="col-md-6">
          <WowInput label="Phone" value="+1 234 567 8900" />
        </div>
        <div className="col-md-6">
          <WowInput label="Expertise" value="AI & Machine Learning" />
        </div>
        <div className="col-12">
          <label className="form-label">Bio</label>
          <textarea className="form-control" rows={4} defaultValue="Expert in AI and Machine Learning with 10+ years of experience..." />
        </div>
        <div className="col-12">
          <div className="d-flex gap-3">
            <WowButton variant="primary">
              Save Changes
            </WowButton>
            <WowButton variant="secondary">
              Cancel
            </WowButton>
          </div>
        </div>
      </div>
    </DataCard>
  );

  return (
    <DashboardLayout
      title="🎤 Speaker Dashboard"
      subtitle="Manage your sessions and engage with attendees"
    >
      {/* Tab Navigation */}
      <div className="col-12">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Content */}
      <div className="col-12">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'sessions' && renderMySessions()}
        {activeTab === 'materials' && renderMaterials()}
        {activeTab === 'engagement' && renderEngagement()}
        {activeTab === 'feedback' && renderFeedback()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </DashboardLayout>
  );
};

export default SpeakerDashboard;

