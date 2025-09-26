import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth, supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, metadata?: any) => Promise<any>;
  signInWithProvider: (provider: 'google' | 'github' | 'linkedin_oidc') => Promise<any>;
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle sign in
        if (event === 'SIGNED_IN' && session?.user) {
          const u = session.user;

          // Update user's last login
          await supabase
            .from('users')
            .update({ last_login_at: new Date().toISOString() } as any)
            .eq('id', u.id);

          // Auto-provision profile and default organization if missing
          try {
            const { data: existing } = await supabase
              .from('users')
              .select('id, organization_id')
              .eq('id', u.id)
              .maybeSingle();

            if (!existing) {
              await supabase.from('users').insert({
                id: u.id,
                email: u.email,
                full_name: (u.user_metadata as any)?.full_name || '',
                role: 'founder',
              } as any);
            }

            let orgId = existing?.organization_id as string | null | undefined;
            if (!orgId) {
              const orgName = `${((u.user_metadata as any)?.full_name || (u.email?.split('@')[0] ?? 'My'))}'s Organization`;
              const { data: org } = await supabase
                .from('organizations')
                .insert({ name: orgName } as any)
                .select('id')
                .single();

              if (org?.id) {
                orgId = org.id as string;
                await supabase
                  .from('users')
                  .update({ organization_id: orgId } as any)
                  .eq('id', u.id);
              }
            }
          } catch (e) {
            // Non-fatal: provisioning can be retried later
            console.warn('Auto-provisioning profile/org failed', e);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await auth.signIn(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const result = await auth.signUp(email, password, metadata);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    setLoading(true);
    try {
      const result = await auth.signInWithProvider(provider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const result = await auth.signOut();
      return result;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    return await auth.resetPassword(email);
  };

  const updatePassword = async (password: string) => {
    return await auth.updatePassword(password);
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
