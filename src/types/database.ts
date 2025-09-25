export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          domain: string | null
          description: string | null
          settings: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          domain?: string | null
          description?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          domain?: string | null
          description?: string | null
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          organization_id: string
          email: string
          first_name: string
          last_name: string
          role: 'admin' | 'program_manager' | 'mentor' | 'investor' | 'founder' | 'support'
          avatar_url: string | null
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          email: string
          first_name: string
          last_name: string
          role: 'admin' | 'program_manager' | 'mentor' | 'investor' | 'founder' | 'support'
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: 'admin' | 'program_manager' | 'mentor' | 'investor' | 'founder' | 'support'
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      startups: {
        Row: {
          id: string
          organization_id: string
          cohort_id: string | null
          name: string
          description: string | null
          industry: string | null
          stage: string | null
          founded_date: string | null
          headquarters_location: string | null
          website_url: string | null
          logo_url: string | null
          employee_count: number | null
          status: 'active' | 'graduated' | 'withdrawn' | 'suspended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          cohort_id?: string | null
          name: string
          description?: string | null
          industry?: string | null
          stage?: string | null
          founded_date?: string | null
          headquarters_location?: string | null
          website_url?: string | null
          logo_url?: string | null
          employee_count?: number | null
          status?: 'active' | 'graduated' | 'withdrawn' | 'suspended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          cohort_id?: string | null
          name?: string
          description?: string | null
          industry?: string | null
          stage?: string | null
          founded_date?: string | null
          headquarters_location?: string | null
          website_url?: string | null
          logo_url?: string | null
          employee_count?: number | null
          status?: 'active' | 'graduated' | 'withdrawn' | 'suspended'
          created_at?: string
          updated_at?: string
        }
      }
      startup_members: {
        Row: {
          id: string
          startup_id: string
          user_id: string | null
          name: string
          email: string
          role: string
          is_founder: boolean
          equity_percentage: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          user_id?: string | null
          name: string
          email: string
          role: string
          is_founder?: boolean
          equity_percentage?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          user_id?: string | null
          name?: string
          email?: string
          role?: string
          is_founder?: boolean
          equity_percentage?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      cohorts: {
        Row: {
          id: string
          organization_id: string
          program_id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          status: 'planning' | 'active' | 'completed'
          max_startups: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          program_id: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          status?: 'planning' | 'active' | 'completed'
          max_startups?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          program_id?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          status?: 'planning' | 'active' | 'completed'
          max_startups?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      mentors: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          bio: string | null
          expertise_areas: string[]
          industries: string[]
          years_experience: number | null
          hourly_rate: number | null
          rating: number | null
          total_sessions: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          bio?: string | null
          expertise_areas?: string[]
          industries?: string[]
          years_experience?: number | null
          hourly_rate?: number | null
          rating?: number | null
          total_sessions?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          bio?: string | null
          expertise_areas?: string[]
          industries?: string[]
          years_experience?: number | null
          hourly_rate?: number | null
          rating?: number | null
          total_sessions?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      mentor_sessions: {
        Row: {
          id: string
          mentor_id: string
          startup_id: string
          title: string
          description: string | null
          scheduled_at: string
          duration_minutes: number
          status: 'scheduled' | 'completed' | 'cancelled'
          rating: number | null
          feedback: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentor_id: string
          startup_id: string
          title: string
          description?: string | null
          scheduled_at: string
          duration_minutes: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          rating?: number | null
          feedback?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentor_id?: string
          startup_id?: string
          title?: string
          description?: string | null
          scheduled_at?: string
          duration_minutes?: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          rating?: number | null
          feedback?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      startup_kpis: {
        Row: {
          id: string
          startup_id: string
          kpi_definition_id: string
          value: number
          reporting_period: string
          notes: string | null
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          kpi_definition_id: string
          value: number
          reporting_period: string
          notes?: string | null
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          kpi_definition_id?: string
          value?: number
          reporting_period?: string
          notes?: string | null
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      kpi_definitions: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          data_type: 'number' | 'currency' | 'percentage'
          unit: string | null
          category: 'financial' | 'product' | 'business' | 'operational'
          is_required: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          data_type: 'number' | 'currency' | 'percentage'
          unit?: string | null
          category: 'financial' | 'product' | 'business' | 'operational'
          is_required?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          data_type?: 'number' | 'currency' | 'percentage'
          unit?: string | null
          category?: 'financial' | 'product' | 'business' | 'operational'
          is_required?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
