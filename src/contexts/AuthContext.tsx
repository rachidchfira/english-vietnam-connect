
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/hooks/useSession';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, passportNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isTeacher: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    setUser(session?.user ?? null);
    
    if (session?.user) {
      // Check user roles
      const checkRoles = async () => {
        const { data: userRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        if (userRoles) {
          setIsAdmin(userRoles.some(role => role.role === 'admin'));
          setIsTeacher(userRoles.some(role => role.role === 'teacher'));
        }
      };

      checkRoles();
    } else {
      setIsAdmin(false);
      setIsTeacher(false);
    }
  }, [session]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string, passportNumber: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          passport_number: passportNumber
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, isAdmin, isTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
