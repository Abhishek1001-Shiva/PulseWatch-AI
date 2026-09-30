'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';

export const DEMO_USERS: Record<UserRole, User> = {
  'patient': {
    id: 'pat-001',
    name: 'Alex Mercer',
    email: 'patient@pulsewatch.ai',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 019-2834',
    bloodGroup: 'O+ Positive',
    emergencyContact: '+1 (555) 991-0022 (Emma Mercer - Spouse)',
    allergies: ['Penicillin', 'Sulfa Drugs', 'Latex'],
    chronicConditions: ['Stage-1 Hypertension', 'Seasonal Allergies']
  },
  'doctor': {
    id: 'doc-001',
    name: 'Dr. Sarah Jenkins, MD, FACC',
    email: 'doctor@pulsewatch.ai',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 334-9021',
    hospitalName: 'Apollo Apex Multispecialty Hospital',
    specialty: 'Interventional Cardiology & Emergency Triage',
    licenseNumber: 'MD-NY-2021-8934'
  },
  'pharmacy': {
    id: 'pharm-001',
    name: 'MediLife Apex 24/7 Pharmacy',
    email: 'pharmacy@pulsewatch.ai',
    role: 'pharmacy',
    avatar: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 778-9011',
    pharmacyName: 'MediLife Apex Health Hub #14',
    licenseNumber: 'PHARM-LIC-88902'
  },
  'super-admin': {
    id: 'adm-001',
    name: 'Commander Robert Sterling',
    email: 'admin@pulsewatch.ai',
    role: 'super-admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 900-HQ99',
    hospitalName: 'National Healthcare Command Center'
  }
};

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (email: string, role?: UserRole) => void;
  switchRole: (newRole: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USERS['patient']);
  const [role, setRole] = useState<UserRole>('patient');

  useEffect(() => {
    const savedRole = localStorage.getItem('pulsewatch_user_role') as UserRole | null;
    if (savedRole && DEMO_USERS[savedRole]) {
      setRole(savedRole);
      setUser(DEMO_USERS[savedRole]);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    const selectedUser = DEMO_USERS[newRole];
    setUser(selectedUser);
    setRole(newRole);
    localStorage.setItem('pulsewatch_user_role', newRole);
  };

  const login = (email: string, intendedRole?: UserRole) => {
    let targetRole: UserRole = intendedRole || 'patient';
    if (email.includes('admin')) targetRole = 'super-admin';
    else if (email.includes('doctor')) targetRole = 'doctor';
    else if (email.includes('pharmacy')) targetRole = 'pharmacy';
    else if (email.includes('patient')) targetRole = 'patient';

    switchRole(targetRole);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pulsewatch_user_role');
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user ? user.role : role,
      login,
      switchRole,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: DEMO_USERS['patient'],
      role: 'patient' as UserRole,
      login: () => {},
      switchRole: () => {},
      logout: () => {},
      isAuthenticated: true
    };
  }
  return context;
}
