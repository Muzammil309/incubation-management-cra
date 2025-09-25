import { useQuery } from '@tanstack/react-query';
import { db } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface UserProfile {
  id: string;
  email?: string;
  role?: 'admin' | 'program_manager' | 'investor' | 'mentor' | 'founder' | 'support';
  organization_id?: string;
  [key: string]: any;
}

export const useCurrentProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    enabled: !!user?.id,
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user?.id) return null;
      const { data, error } = await db.getUser(user.id);
      if (error) throw error;
      return data as unknown as UserProfile;
    },
  });
};

