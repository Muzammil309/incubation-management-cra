import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://njdatlcgjhjajztcfqar.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Ticket {
  id: string;
  event_id: string;
  user_id: string;
  tier: string;
  price: number;
  qr_code?: string;
  check_in_status: boolean;
  purchase_date: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  capacity: number;
  attendees: number;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  request_date: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  speaker_id: string;
  title: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendees: number;
  room?: string;
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: string;
  session_id: string;
  name: string;
  type: string;
  url: string;
  upload_date: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  session_id: string;
  question: string;
  asked_by: string;
  answered: boolean;
  answer?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  session_id: string;
  attendee_name: string;
  rating: number;
  comment?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

// CRUD Operations for Tickets
export const ticketService = {
  async getAll() {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('purchase_date', { ascending: false });

    if (error) throw error;
    return data as Ticket[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Ticket;
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('purchase_date', { ascending: false });

    if (error) throw error;
    return data as Ticket[];
  },

  async create(ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticket])
      .select()
      .single();

    if (error) throw error;
    return data as Ticket;
  },

  async update(id: string, updates: Partial<Ticket>) {
    const { data, error } = await supabase
      .from('tickets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Ticket;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// CRUD Operations for Events
export const eventService = {
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data as Event[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Event;
  },

  async create(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) throw error;
    return data as Event;
  },

  async update(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Event;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// CRUD Operations for Connections
export const connectionService = {
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .eq('user_id', userId)
      .order('request_date', { ascending: false });

    if (error) throw error;
    return data as Connection[];
  },

  async create(connection: Omit<Connection, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('connections')
      .insert([connection])
      .select()
      .single();

    if (error) throw error;
    return data as Connection;
  },

  async update(id: string, updates: Partial<Connection>) {
    const { data, error } = await supabase
      .from('connections')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Connection;
  }
};

// CRUD Operations for Sessions
export const sessionService = {
  async getBySpeakerId(speakerId: string) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('speaker_id', speakerId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data as Session[];
  },

  async create(session: Omit<Session, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('sessions')
      .insert([session])
      .select()
      .single();

    if (error) throw error;
    return data as Session;
  },

  async update(id: string, updates: Partial<Session>) {
    const { data, error } = await supabase
      .from('sessions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Session;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};



// CRUD Operations for Materials
export const materialService = {
  async getBySessionId(sessionId: string) {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('session_id', sessionId)
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data as Material[];
  },

  async create(material: Omit<Material, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('materials')
      .insert([material])
      .select()
      .single();

    if (error) throw error;
    return data as Material;
  },

  async delete(id: string) {
    const { error} = await supabase
      .from('materials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// CRUD Operations for Questions
export const questionService = {
  async getBySessionId(sessionId: string) {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('session_id', sessionId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data as Question[];
  },

  async create(question: Omit<Question, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('questions')
      .insert([question])
      .select()
      .single();

    if (error) throw error;
    return data as Question;
  },

  async update(id: string, updates: Partial<Question>) {
    const { data, error } = await supabase
      .from('questions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Question;
  }
};

// CRUD Operations for Feedbacks
export const feedbackService = {
  async getBySessionId(sessionId: string) {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .eq('session_id', sessionId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data as Feedback[];
  },

  async create(feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([feedback])
      .select()
      .single();

    if (error) throw error;
    return data as Feedback;
  }
};

