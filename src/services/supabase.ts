import { createClient } from '@supabase/supabase-js';
// import { Database } from '../types/database';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is properly configured
export const isSupabaseConfigured =
  process.env.REACT_APP_SUPABASE_URL &&
  process.env.REACT_APP_SUPABASE_ANON_KEY &&
  process.env.REACT_APP_SUPABASE_URL !== 'https://placeholder.supabase.co';

// Create Supabase client (will use placeholder values if not configured)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signInWithProvider: async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
  },

  updatePassword: async (password: string) => {
    return await supabase.auth.updateUser({ password });
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  getSession: () => {
    return supabase.auth.getSession();
  },
};

// Database helpers
export const db = {
  // Organizations
  getOrganizations: () => {
    return supabase.from('organizations').select('*');
  },

  getOrganization: (id: string) => {
    return supabase.from('organizations').select('*').eq('id', id).single();
  },

  createOrganization: (data: any) => {
    return supabase.from('organizations').insert(data).select().single();
  },

  updateOrganization: (id: string, updates: any) => {
    return supabase.from('organizations').update(updates).eq('id', id).select().single();
  },

  // Users
  getUsers: (organizationId: string) => {
    return supabase
      .from('users')
      .select('*')
      .eq('organization_id', organizationId);
  },

  getUser: (id: string) => {
    return supabase.from('users').select('*').eq('id', id).single();
  },

  updateUser: (id: string, updates: any) => {
    return supabase.from('users').update(updates).eq('id', id).select().single();
  },

  inviteUser: (email: string, organizationId: string, role: string) => {
    return supabase.from('user_invitations').insert({
      email,
      organization_id: organizationId,
      role,
      invited_at: new Date().toISOString(),
      status: 'pending'
    }).select().single();
  },

  // Startups
  getStartups: (organizationId: string) => {
    return supabase
      .from('startups')
      .select(`
        *,
        startup_members(*),
        cohorts(*)
      `)
      .eq('organization_id', organizationId);
  },

  getStartup: (id: string) => {
    return supabase
      .from('startups')
      .select(`
        *,
        startup_members(*),
        cohorts(*),
        startup_kpis(*)
      `)
      .eq('id', id)
      .single();
  },

  createStartup: (data: any) => {
    return supabase.from('startups').insert(data).select().single();
  },

  updateStartup: (id: string, updates: any) => {
    return supabase.from('startups').update(updates).eq('id', id).select().single();
  },

  deleteStartup: (id: string) => {
    return supabase.from('startups').delete().eq('id', id);
  },

  // Cohorts
  getCohorts: (organizationId: string) => {
    return supabase
      .from('cohorts')
      .select(`
        *,
        startups(count)
      `)
      .eq('organization_id', organizationId);
  },

  getCohort: (id: string) => {
    return supabase
      .from('cohorts')
      .select(`
        *,
        startups(*)
      `)
      .eq('id', id)
      .single();
  },

  createCohort: (data: any) => {
    return supabase.from('cohorts').insert(data).select().single();
  },

  updateCohort: (id: string, updates: any) => {
    return supabase.from('cohorts').update(updates).eq('id', id).select().single();
  },

  // KPIs
  getStartupKPIs: (startupId: string) => {
    return supabase
      .from('startup_kpis')
      .select(`
        *,
        kpi_definitions(*)
      `)
      .eq('startup_id', startupId)
      .order('reporting_period', { ascending: false });
  },

  // Mentors
  getMentors: (organizationId: string) => {
    return supabase
      .from('mentors')
      .select(`
        *,
        users(*)
      `)
      .eq('organization_id', organizationId)
      .eq('is_available', true);
  },

  createMentor: (data: any) => {
    return supabase.from('mentors').insert(data).select().single();
  },

  updateMentor: (id: string, updates: any) => {
    return supabase.from('mentors').update(updates).eq('id', id).select().single();
  },

  // Sessions
  getMentorSessions: (mentorId: string) => {
    return supabase
      .from('mentor_sessions')
      .select(`
        *,
        startups(*),
        mentors(*)
      `)
      .eq('mentor_id', mentorId)
      .order('scheduled_at', { ascending: false });
  },

  createMentorSession: (data: any) => {
    return supabase.from('mentor_sessions').insert(data).select().single();
  },

  updateMentorSession: (id: string, updates: any) => {
    return supabase.from('mentor_sessions').update(updates).eq('id', id).select().single();
  },

  // Investments
  getInvestments: (organizationId: string) => {
    return supabase
      .from('investments')
      .select(`
        *,
        startups(*),
        users(*)
      `)
      .eq('organization_id', organizationId)
      .order('investment_date', { ascending: false });
  },

  createInvestment: (data: any) => {
    return supabase.from('investments').insert(data).select().single();
  },

  updateInvestment: (id: string, updates: any) => {
    return supabase.from('investments').update(updates).eq('id', id).select().single();
  },

  // Events
  getEvents: (organizationId: string) => {
    return supabase
      .from('events')
      .select('*')
      .eq('organization_id', organizationId)
      .order('event_date', { ascending: true });
  },

  createEvent: (data: any) => {
    return supabase.from('events').insert(data).select().single();
  },

  updateEvent: (id: string, updates: any) => {
    return supabase.from('events').update(updates).eq('id', id).select().single();
  },

  // Real-time subscriptions
  subscribeToTable: (table: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
  },
};

export default supabase;
