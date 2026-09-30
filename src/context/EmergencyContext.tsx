'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmergencyRequest, EmergencyCategory, EmergencySeverity } from '@/types';
import { MOCK_ACTIVE_EMERGENCY } from '@/lib/mockData';
import { playAudioBeep, speakText } from '@/lib/utils';

interface EmergencyContextType {
  activeEmergency: EmergencyRequest | null;
  isSosTriggerOpen: boolean;
  openSosModal: () => void;
  closeSosModal: () => void;
  triggerEmergency: (category?: EmergencyCategory, customAddress?: string) => void;
  cancelEmergency: () => void;
  updateEmergencyStatus: (status: EmergencyRequest['status']) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [activeEmergency, setActiveEmergency] = useState<EmergencyRequest | null>(null);
  const [isSosTriggerOpen, setIsSosTriggerOpen] = useState(false);

  useEffect(() => {
    if (!activeEmergency || activeEmergency.status === 'RESOLVED' || activeEmergency.status === 'CANCELLED') return;

    const interval = setInterval(() => {
      setActiveEmergency(prev => {
        if (!prev) return null;
        const currentEta = prev.assignedHospital.etaMinutes;
        const newEta = Math.max(1, currentEta > 1 ? currentEta - 1 : 1);
        
        return {
          ...prev,
          assignedHospital: {
            ...prev.assignedHospital,
            etaMinutes: newEta
          },
          assignedAmbulance: prev.assignedAmbulance ? {
            ...prev.assignedAmbulance,
            speedKmH: Math.floor(55 + Math.random() * 20)
          } : undefined,
          assignedDrone: prev.assignedDrone ? {
            ...prev.assignedDrone,
            etaMinutes: Math.max(1, prev.assignedDrone.etaMinutes - 1),
            batteryLevel: Math.max(70, prev.assignedDrone.batteryLevel - 1)
          } : undefined
        };
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [activeEmergency]);

  const openSosModal = () => setIsSosTriggerOpen(true);
  const closeSosModal = () => setIsSosTriggerOpen(false);

  const triggerEmergency = (
    category: EmergencyCategory = 'CARDIAC_ARREST',
    customAddress: string = 'Avenue 4, Central Park Residences, Flat 402'
  ) => {
    playAudioBeep('sos');
    speakText('Emergency SOS activated. Contacting nearest advanced trauma center and dispatching rapid response.');
    
    const newEmergency: EmergencyRequest = {
      ...MOCK_ACTIVE_EMERGENCY,
      id: `SOS-${Date.now().toString().slice(-6)}`,
      category,
      severity: category === 'CARDIAC_ARREST' || category === 'SEVERE_BLEEDING' ? 'CRITICAL' : 'HIGH',
      status: 'DISPATCHED',
      address: customAddress,
      timestamp: new Date().toISOString()
    };

    setActiveEmergency(newEmergency);
    setIsSosTriggerOpen(false);
  };

  const cancelEmergency = () => {
    playAudioBeep('click');
    speakText('Emergency request cancelled.');
    setActiveEmergency(null);
  };

  const updateEmergencyStatus = (status: EmergencyRequest['status']) => {
    if (activeEmergency) {
      setActiveEmergency({
        ...activeEmergency,
        status
      });
    }
  };

  return (
    <EmergencyContext.Provider value={{
      activeEmergency,
      isSosTriggerOpen,
      openSosModal,
      closeSosModal,
      triggerEmergency,
      cancelEmergency,
      updateEmergencyStatus
    }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) {
    return {
      activeEmergency: null,
      isSosTriggerOpen: false,
      openSosModal: () => {},
      closeSosModal: () => {},
      triggerEmergency: () => {},
      cancelEmergency: () => {},
      updateEmergencyStatus: () => {}
    };
  }
  return context;
}
