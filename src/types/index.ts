export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'super-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  hospitalName?: string;
  specialty?: string;
  licenseNumber?: string;
  pharmacyName?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

export type EmergencySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type EmergencyCategory = 
  | 'CARDIAC_ARREST' 
  | 'ACCIDENT_TRAUMA' 
  | 'STROKE_NEURO' 
  | 'RESPIRATORY_DISTRESS' 
  | 'SEVERE_BLEEDING' 
  | 'ALLERGIC_ANAPHYLAXIS'
  | 'MATERNAL_EMERGENCY'
  | 'GENERAL_SOS';

export interface EmergencyRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone: string;
  bloodGroup: string;
  category: EmergencyCategory;
  severity: EmergencySeverity;
  status: 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'TRANSPORTING' | 'RESOLVED' | 'CANCELLED';
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  assignedHospital: {
    id: string;
    name: string;
    distanceKm: number;
    etaMinutes: number;
    phone: string;
  };
  assignedAmbulance?: {
    id: string;
    vehicleNumber: string;
    driverName: string;
    driverPhone: string;
    paramedicName: string;
    currentLat: number;
    currentLng: number;
    speedKmH: number;
  };
  assignedDrone?: {
    id: string;
    droneCode: string;
    payloadType: 'BLOOD_O_NEG' | 'DEFIBRILLATOR_AED' | 'EPINEPHRINE_PEN' | 'ANTIVENOM';
    batteryLevel: number;
    etaMinutes: number;
    currentLat: number;
    currentLng: number;
  };
  aiTriageSummary: string;
  vitalsSnapshot?: VitalSigns;
}

export interface VitalSigns {
  heartRate: number; // bpm
  spO2: number; // %
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  respiratoryRate: number; // breaths/min
  temperature: number; // °F or °C
  stressLevel: number; // 0-100
  bloodGlucose: number; // mg/dL
  ecgStatus: 'NORMAL' | 'ARRHYTHMIA' | 'TACHYCARDIA' | 'BRADYCARDIA' | 'ST_ELEVATION';
  timestamp: string;
}

export interface DigitalTwinOrgan {
  name: 'Heart' | 'Lungs' | 'Brain' | 'Kidneys' | 'Liver';
  healthScore: number; // 0-100
  status: 'OPTIMAL' | 'STABLE' | 'WARNING' | 'CRITICAL';
  metrics: { [key: string]: string | number };
  aiAlerts: string[];
}

export interface PrescriptionItem {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  isControlledSubstance?: boolean;
  maxDosageLimit?: string;
  riskWarning?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalName: string;
  date: string;
  diagnosis: string;
  items: PrescriptionItem[];
  blockchainHash: string;
  qrCodeData: string;
  status: 'ISSUED' | 'DISPENSED' | 'PARTIALLY_DISPENSED' | 'EXPIRED';
  pharmacyDispensed?: {
    pharmacyName: string;
    dispensedAt: string;
    pharmacistName: string;
  };
  aiDrugInteractionWarnings: string[];
}

export interface Hospital {
  id: string;
  name: string;
  type: 'GOVERNMENT' | 'PRIVATE';
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  emergency24x7: boolean;
  petCare: boolean;
  hasDroneDelivery: boolean;
  totalBeds: number;
  availableBeds: number;
  icuTotal: number;
  icuAvailable: number;
  activeAmbulances: number;
  avgWaitTimeMinutes: number;
  crowdLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  specialties: string[];
  phone: string;
  image: string;
}

export interface SocialListeningSignal {
  id: string;
  source: 'TWITTER' | 'REDDIT' | 'GOOGLE_REVIEWS' | 'HOSPITAL_FEEDBACK' | 'INTERNAL_AUDIT';
  hospitalName: string;
  author: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT_SAFETY';
  content: string;
  timestamp: string;
  safetyCategory: 'MEDICATION_ERROR' | 'LONG_WAIT_TIMES' | 'HYGIENE' | 'STAFF_BEHAVIOR' | 'EQUIPMENT_FAILURE' | 'PRAISE';
  aiConfidence: number;
  actionTaken?: string;
}

export interface MedicalImageScan {
  id: string;
  patientId: string;
  patientName: string;
  scanType: 'CHEST_XRAY' | 'BRAIN_MRI' | 'LUNG_CT' | 'CARDIAC_ECHO';
  scanDate: string;
  imageUrl: string;
  aiFindings: {
    condition: string;
    confidence: number;
    severity: 'NORMAL' | 'MILD' | 'MODERATE' | 'SEVERE';
    description: string;
    heatmapCoordinates?: { x: number; y: number; radius: number }[];
  }[];
  doctorVerified: boolean;
}

export interface ConsultationHistoryRecord {
  id: string;
  date: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  treatmentPlan: string;
  prescriptionId?: string;
  followUpDate?: string;
  aiSuggestedDiagnosis: string;
  telemedicineRecordingUrl?: string;
}

export interface PharmacyHistoryRecord {
  id: string;
  date: string;
  prescriptionId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  medicines: {
    name: string;
    quantity: number;
    dosage: string;
    controlled: boolean;
  }[];
  totalAmount: number;
  status: 'COMPLETED' | 'REJECTED_DOSAGE_LIMIT' | 'DELIVERED_BY_DRONE';
  blockchainTxHash: string;
  patientFeedbackScore: number;
}
